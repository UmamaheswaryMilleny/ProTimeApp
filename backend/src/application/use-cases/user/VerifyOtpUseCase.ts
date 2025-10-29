import { IVerifyOTPUserUseCase } from '../../interfaces/user/IVerifyOTPUserUseCase';
import { ICacheService } from '../../interfaces/services/ICacheService';
import { IUserRepository } from '../../interfaces/user/IUserRepository';
import { ITokenService } from '../../interfaces/services/ITokenService';
import { Email } from '../../../domain/value-objects/Email';
import { VerifyOtpRequestDTO,VerifyOtpResponseDTO } from '../../dtos/user/UserDTO';
import { InvalidOTPError } from '../../../domain/errors/InvalidOTPError';
import { Password } from '../../../domain/value-objects/Password';
import { EmailUser } from '../../../domain/entities/User';
import { OtpExpiredError } from '../../../domain/errors/OtpExpiredError';
import { toUserPublicDTO } from '../../mappers/UserMapper';

export class VerifyOTPUserUseCase implements IVerifyOTPUserUseCase {
  constructor(
    // private userRepository: IUserRepository,
    // private cacheService: ICacheService,
    // private tokenService: ITokenService
    private readonly userRepository: IUserRepository,
    private readonly cacheService: ICacheService,
    private readonly tokenService: ITokenService
  ) {}

  async execute(dto: VerifyOtpRequestDTO): Promise<VerifyOtpResponseDTO> {
    const { email, otp } = dto;
 const emailVO = Email.create(email);
    const storedOtp = await this.cacheService.get(`otp:${emailVO.value}`);
    if (!storedOtp) {
      throw new InvalidOTPError();
    }
    if (storedOtp !== otp.toString()) {
      throw new OtpExpiredError();
    }

    const userDataJson = await this.cacheService.get(`user:temp:${emailVO.value}`);
    if (!userDataJson) throw new Error('User data not found in cache');

    const userData = JSON.parse(userDataJson);

    const user = EmailUser.create(
      userData.id,
      userData.name,
      Email.create(userData.email),
    Password.fromHash(userData.password),

    );
    const savedUser = await this.userRepository.createUser(user);
    const payload = {
      userId: savedUser.id,
      email: savedUser.email.value,
      role: savedUser.role,
    };
    const accessToken = this.tokenService.generateAccessToken(payload);
    const refreshToken = this.tokenService.generateRefreshToken(payload);

    await this.cacheService.delete(`otp:register${email}`);
    await this.cacheService.delete(`user:temp:${email}`);

    return { email:savedUser.email.value, accessToken, refreshToken };
  }
}
