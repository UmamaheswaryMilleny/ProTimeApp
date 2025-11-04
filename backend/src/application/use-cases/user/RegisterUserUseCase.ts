import { IRegisterUserUseCase } from '../../interfaces/usecase/IRegisterUserUseCase';
import { IUserRepository } from '../../interfaces/repository/IUserRepository';
import { IPasswordService } from '../../interfaces/services/IPasswordService';
import { IOtpService } from '../../interfaces/services/IOtpService';
import { IEmailService } from '../../interfaces/services/IEmailService';
import { ICacheService } from '../../interfaces/services/ICacheService';
import { IDomainEventPublisher } from '../../interfaces/repository/IDomainEventPublisher';
import { RegisterUserDTO } from '../../dtos/user/UserDTO';
import { UserId } from '../../../domain/value-objects/UserId';
import { Email } from '../../../domain/value-objects/Email';
import { OTP } from '../../../domain/value-objects/OTP';
import { OtpPurpose, Provider } from '../../../domain/enums/UserEnums';
import { UserAlreadyExistError } from '../../../domain/errors/UserAlreadyExistError';
import { Password } from '../../../domain/value-objects/Password';
import { EmailUser, GoogleUser } from '../../../domain/entities/User';
import { ILogger } from '../../interfaces/ILogger';
import { ResponseMessages } from '../../constants/ResponseMessages';
import { RegisterResponseDTO } from '../../dtos/user/UserDTO';
import { TimeConstants } from '../../constants/TimeConstants';

export class RegisterUseCase implements IRegisterUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordService: IPasswordService,
    private otpService: IOtpService,
    private emailService: IEmailService,
    private cacheService: ICacheService,
    private domainEventPublish: IDomainEventPublisher,
    private logger: ILogger
  ) {}

  async execute(dto: RegisterUserDTO): Promise<RegisterResponseDTO> {
    const emailVO = Email.create(dto.email);

    const existingUser = await this.userRepository.findByEmail(emailVO);
    if (existingUser) {
      this.logger.warn(`User with email ${dto.email} already exists`);
      throw new UserAlreadyExistError();
    }

    if (dto.provider === Provider.GOOGLE) {
      const userId = UserId.create();
      const googleUser = GoogleUser.create(
        userId,
        dto.name,
        emailVO,
        dto.googleId!
      );
      await this.userRepository.save(googleUser);
      await this.domainEventPublish.publishEvents(googleUser.events);
      googleUser.clearEvents();
      this.logger.info(`Google user ${dto.email} registered successfully`);
      return {
        message: ResponseMessages.RegistrationSuccessGoogle,
        isOtpRequired: false,
      };
    }
    const hashPassword = await this.passwordService.hashPassword(dto.password);
    const passwordVO = Password.fromHash(hashPassword);
    const userId = UserId.create();

    const user = EmailUser.create(userId, dto.name, emailVO, passwordVO);

    const otpCode = await this.otpService.generateOtp(
      dto.email,
      OtpPurpose.REGISTER
    );
    const expiresAt = new Date(Date.now() + TimeConstants.OTP_EXPIRY_MS);
    const otpVO = OTP.create(otpCode, expiresAt, OtpPurpose.REGISTER);
    user.generateOTP(otpVO);

    console.log(otpVO.value);
    await this.cacheService.set(
      `otp:register:${emailVO.value}`,
      otpVO.value,
      300
    );
    this.logger.info(
      `OTP sent successfully  ${dto.email} and otp is ${otpCode}`
    );
    await this.cacheService.set(
      `user:temp:${dto.email}`,
      JSON.stringify({
        id: user.id.value,
        name: user.name,
        email: user.email.value,
        provider: Provider.LOCAL,
        passwordHash: passwordVO.hash,
        isVerified: false,
      }),
      TimeConstants.OTP_EXPIRY_SECONDS
    );

    await this.emailService.sendOtp(dto.email, otpCode);
    this.logger.info(`Registration initiated for ${dto.email}`);
    await this.domainEventPublish.publishEvents(user.events);
    user.clearEvents();
    return {
      message: ResponseMessages.RegistrationSuccessEmail,
      isOtpRequired: true,
    };
  }
}
