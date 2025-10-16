import { IRegisterUserUseCase } from '../../../domain/use-cases/user/IRegisterUserUseCase';
import { IEmailSerivice } from '../../../domain/services/IEmailService';
import { ICacheServices } from '../../../domain/services/ICacheService';
import { IUserRepositories } from '../../../domain/repositories/IUserRepositories';
import { RegisterUserDTO } from '../../dtos/user/RegisterUserDTO';
import { IPasswordServices } from '../../../domain/services/IPasswordService';

import { UserAlreadyExistError } from '../../../domain/errors/UserAlreadyExistError';
import { PasswordMismatchError } from '../../../domain/errors/PasswordMismatchError';

export class RegisterUserUseCase implements IRegisterUserUseCase {
  constructor(
    private userRepository: IUserRepositories,
    private emailSerivice: IEmailSerivice,
    private cacheService: ICacheServices,
    private passwordSerice: IPasswordServices
  ) {}

  async execute(
    dto: RegisterUserDTO
  ): Promise<{ success: boolean; message: string }> {
    const { name, email, password, confirmPassword } = dto;
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new UserAlreadyExistError(email);
    }
    if (password !== confirmPassword) {
      throw new PasswordMismatchError();
    }
    const hashedPassword = await this.passwordSerice.hashPassword(password);
    const otp = Math.floor(100000 + Math.random() * 900000);

    await this.cacheService.set(`otp:${email}`, otp.toString(), 300);

    const userData = JSON.stringify({
      name,
      email: email,
      password: hashedPassword,
    });

    await this.cacheService.set(`user:${email}`, userData, 300);

    await this.emailSerivice.sendOtp(email, otp.toString());
    return { success: true, message: 'otp send to email' };
  }
}
