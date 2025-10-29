import { IResetPasswordUseCase } from '../../interfaces/user/IResetPasswordUseCase';
import { IUserRepository } from '../../interfaces/user/IUserRepository';
import { ResetPasswordDTO } from '../../dtos/user/ResetPasswordDTO';
import { PasswordMismatchError } from '../../../domain/errors/PasswordMismatchError';
import { IPasswordService } from '../../interfaces/services/IPasswordService';
import { ResetPasswordResponseDTO } from '../../dtos/user/ResetPasswordResponseDTO';
import { ICacheService } from '../../interfaces/services/ICacheService';
import { Email } from '../../../domain/value-objects/Email';
import { InvalidOTPError } from '../../../domain/errors/InvalidOTPError';
import { UserDoesNotExistError } from '../../../domain/errors/UserDoesNotExistError';
import { Password } from '../../../domain/value-objects/Password';

export class ResetPasswordUseCase implements IResetPasswordUseCase {
  constructor(
    private userRepository: IUserRepository,
    private ICacheServices: ICacheService,
    private passwordService: IPasswordService
  ) {}

  async execute(dto: ResetPasswordDTO): Promise<ResetPasswordResponseDTO> {
    const { email, otp, password, confirmPassword } = dto;
const emailVO=Email.create(email)

    const storedOtp = await this.ICacheServices.get(`forgotPassword:${emailVO.value}`);
    if (!storedOtp) {
      throw new InvalidOTPError();
    }
    if (storedOtp !== otp) {
      throw new InvalidOTPError();
    }

    if (password !== confirmPassword) {
      throw new PasswordMismatchError();
    }
    const existingUser = await this.userRepository.findByEmail(emailVO);
    if (!existingUser) {
      throw new UserDoesNotExistError();
    }
    const hashedPassword = await this.passwordService.hashPassword(password);
    const passwordVO=Password.fromHash(hashedPassword)

    await this.userRepository.updatePassword(existingUser.id, passwordVO);

    return { message: 'Password has reset Successfully' };
  }
}
