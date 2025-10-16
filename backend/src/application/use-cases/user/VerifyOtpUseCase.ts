import { IVerifyOTPUserUseCase } from '../../../domain/use-cases/user/IVerifyOTPUseCase';
import { ICacheServices } from '../../../domain/services/ICacheService';
import { IUserRepositories } from '../../../domain/repositories/IUserRepositories';
import { ITokenServices } from '../../../domain/services/ITokenService';
import { Email } from '../../../domain/value-objects/Email';
import { Password } from '../../../domain/value-objects/Password';
import { VerifyOtpDTO } from '../../dtos/user/VerifyOtpDTO';
import { InvalidOTPError } from '../../../domain/errors/InvalidOTPError';
import { UserRole } from '../../../domain/enums/UserRole';
import { User } from '../../../domain/entities/User';
import { OtpExpiredError } from '../../../domain/errors/OtpExpiredError';
import { VerifyOtpResponseDTO } from '../../dtos/user/VerifyOtpResponseDTO';

export class VerifyOTPUserUseCase implements IVerifyOTPUserUseCase {
  constructor(
    private userRepository: IUserRepositories,
    private cacheService: ICacheServices,
    private tokenService: ITokenServices
  ) {}

  async execute(dto: VerifyOtpDTO): Promise<VerifyOtpResponseDTO> {
    const { email, otp } = dto;

    const storedOtp = await this.cacheService.get(`otp:${email}`);
    if (!storedOtp) {
      throw new InvalidOTPError();
    }
    if (storedOtp !== otp.Value) {
      throw new OtpExpiredError();
    }

    const userDataJson = await this.cacheService.get(`user:${email}`);
    if (!userDataJson) throw new Error('User data not found in cache');

    const userData = JSON.parse(userDataJson);

    const user = User.createNew(
      userData.id,
      userData.name,
      new Email(userData.email),
      new Password(userData.password),
      UserRole.USER
    );
    const savedUser = await this.userRepository.createUser(user);
    const payload = {
      userId: savedUser.id,
      email: savedUser.email.value,
      role: savedUser.userRole,
    };
    const accessToken = this.tokenService.generateAccessToken(payload);
    const refreshToken = this.tokenService.generateRefreshToken(payload);

    await this.cacheService.delete(`otp:${email}`);
    await this.cacheService.delete(`user:${email}`);

    return { user: savedUser, accessToken, refreshToken };
  }
}
