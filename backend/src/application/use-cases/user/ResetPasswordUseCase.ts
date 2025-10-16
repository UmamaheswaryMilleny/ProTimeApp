import { IResetPasswordUseCase } from '../../../domain/use-cases/user/IResetPasswordUseCase';
import { IUserRepositories } from '../../../domain/repositories/IUserRepositories';
import { ResetPasswordDTO } from '../../dtos/user/ResetPasswordDTO';
import { PasswordMismatchError } from '../../../domain/errors/PasswordMismatchError';
import { IPasswordServices } from '../../../domain/services/IPasswordService';
import { ResetPasswordResponseDTO } from '../../dtos/user/ResetPasswordResponseDTO';
import { ICacheServices } from '../../../domain/services/ICacheService';

import { InvalidOTPError } from '../../../domain/errors/InvalidOTPError';
import { OtpExpiredError } from '../../../domain/errors/OtpExpiredError';
import { UserNotExistError } from '../../../domain/errors/UserNotExistError';

export class ResetPasswordUseCase implements IResetPasswordUseCase {
  constructor(
    private userRepository: IUserRepositories,
    private ICacheServices: ICacheServices,
    private passwordService: IPasswordServices
  ) {}

  async execute(dto: ResetPasswordDTO): Promise<ResetPasswordResponseDTO> {
    const { email, otp, password, confirmPassword } = dto;

    const storedOtp = await this.ICacheServices.get(`forgotPassword:${email}`);
    if (!storedOtp) {
      throw new InvalidOTPError();
    }
    if (storedOtp !== otp) {
      throw new OtpExpiredError();
    }

    if (password !== confirmPassword) {
      throw new PasswordMismatchError();
    }
    const existingUser = await this.userRepository.findByEmail(email);
    if (!existingUser) {
      throw new UserNotExistError(email);
    }
    const hashedPassword = await this.passwordService.hashPassword(password);

    await this.userRepository.updatePassword(existingUser.id, hashedPassword);

    return { message: 'Password has reset Successfully' };
  }
}
