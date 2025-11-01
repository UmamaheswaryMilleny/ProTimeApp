import { IForgotPasswordUseCase } from '../../interfaces/usecase/IForgotPasswordUseCase';
import { IUserRepository } from '../../interfaces/usecase/IUserRepository';
import { ICacheService } from '../../interfaces/services/ICacheService';
import { IEmailService } from '../../interfaces/services/IEmailService';
import { ForgotPasswordDTO } from '../../dtos/user/ForgotPasswordDTO';
import { UserDoesNotExistError } from '../../../domain/errors/UserDoesNotExistError';
import { ForgotPasswordResponseDTO } from '../../dtos/user/ForgotPasswordResponseDTO';
import { OTP } from '../../../domain/value-objects/OTP';
import { Email } from '../../../domain/value-objects/Email';

export class ForgotPasswordUseCase implements IForgotPasswordUseCase {
  constructor(
    private userRepository: IUserRepository,
    private emailService: IEmailService,
    private cacheService: ICacheService
  ) {}

  async execute(dto: ForgotPasswordDTO): Promise<ForgotPasswordResponseDTO> {
    const { email } = dto;
    const emailVO = Email.create(email);
    const existingUser = await this.userRepository.findByEmail(emailVO);

    if (!existingUser) {
      throw new UserDoesNotExistError();
    }
    const otpValue = Math.floor(100000 + Math.random() * 900000);
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
    const otp = OTP.create(otpValue.toString(), expiresAt);

    await this.cacheService.set(
      `forgotPassword:${emailVO.value}`,
      otp.value,
      300
    );
    await this.emailService.sendOtp(emailVO, otp);
    return { message: 'OTP has send to you email' };
  }
}
