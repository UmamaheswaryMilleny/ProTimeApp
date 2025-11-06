// src/application/use-cases/user/ForgotPasswordUseCase.ts
import { IForgotPasswordUseCase } from "../../interfaces/usecase/IForgotPasswordUseCase";
import { IUserRepository } from "../../interfaces/repository/IUserRepository";
import { IOtpService } from "../../interfaces/services/IOtpService";
import { IEmailService } from "../../interfaces/services/IEmailService";
import { ICacheService } from "../../interfaces/services/ICacheService";
import { ILogger } from "../../interfaces/ILogger";
import { IDomainEventPublisher } from "../../interfaces/repository/IDomainEventPublisher";
import { ForgotPasswordRequestDTO, ForgotPasswordResponseDTO } from "../../dtos/user/UserDTO";
import { Email } from "../../../domain/value-objects/Email";
import { UserDoesNotExistError } from "../../../domain/errors/UserDoesNotExistError";
import { OTP } from "../../../domain/value-objects/OTP";
import { OtpPurpose } from "../../../domain/enums/UserEnums";
import { TimeConstants } from "../../constants/TimeConstants";
import { UserPasswordResetRequestedEvent } from "../../../domain/events/UserPasswordResetRequestedEvent";
import { ResponseMessages } from "../../constants/ResponseMessages";

export class ForgotPasswordUseCase implements IForgotPasswordUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly otpService: IOtpService,
    private readonly emailService: IEmailService,
    private readonly cacheService: ICacheService,
    private readonly domainEventPublisher: IDomainEventPublisher,
    private readonly logger: ILogger
  ) {}

  async execute(dto: ForgotPasswordRequestDTO): Promise<ForgotPasswordResponseDTO> {
    const emailVO = Email.create(dto.email);
    const user = await this.userRepository.findByEmail(emailVO);

    if (!user) {
      this.logger.warn(`Forgot password: user not found for ${dto.email}`);
      throw new UserDoesNotExistError();
    }

    const otpCode = await this.otpService.generateOtp(dto.email, OtpPurpose.RESET);
    const expiresAt = new Date(Date.now() + TimeConstants.OTP_EXPIRY_MS);
    const otpVO = OTP.create(otpCode, expiresAt, OtpPurpose.RESET);

    await this.cacheService.set(`otp:reset:${emailVO.value}`, otpVO.value, TimeConstants.OTP_EXPIRY_SECONDS);

    await this.emailService.sendOtp(emailVO.value, otpVO.value);
    user.addEvent(new UserPasswordResetRequestedEvent(user.id.value, user.email.value, otpVO.value, otpVO.expiresAt.toISOString()));

    await this.domainEventPublisher.publishEvents(user.events);
    user.clearEvents();

    this.logger.info(`Password reset OTP sent to ${dto.email}`);
    return { message: ResponseMessages.OtpHasBeenSent };
  }
}











// import { IForgotPasswordUseCase } from '../../interfaces/usecase/IForgotPasswordUseCase';
// import { IUserRepository } from '../../interfaces/repository/IUserRepository';
// import { ICacheService } from '../../interfaces/services/ICacheService';
// import { IEmailService } from '../../interfaces/services/IEmailService';
// import { ForgotPasswordResponseDTO } from '../../dtos/user/UserDTO';
// import { UserDoesNotExistError } from '../../../domain/errors/UserDoesNotExistError';
// import { ForgotPasswordRequestDTO } from '../../dtos/user/UserDTO';
// import { OTP } from '../../../domain/value-objects/OTP';
// import { Email } from '../../../domain/value-objects/Email';

// export class ForgotPasswordUseCase implements IForgotPasswordUseCase {
//   constructor(
//     private userRepository: IUserRepository,
//     private emailService: IEmailService,
//     private cacheService: ICacheService
//   ) {}

//   // async execute(dto: ForgotPasswordDTO): Promise<ForgotPasswordResponseDTO> {
//     const { email } = dto;
//     const emailVO = Email.create(email);
//     const existingUser = await this.userRepository.findByEmail(emailVO);

//     if (!existingUser) {
//       throw new UserDoesNotExistError();
//     }
//     const otpValue = Math.floor(100000 + Math.random() * 900000);
//     const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
//     const otp = OTP.create(otpValue.toString(), expiresAt);

//     await this.cacheService.set(
//       `forgotPassword:${emailVO.value}`,
//       otp.value,
//       300
//     );
//     await this.emailService.sendOtp(emailVO, otp);
//     return { message: 'OTP has send to you email' };
//   }
// }
