import { ILoginUserUseCase } from '../../interfaces/user/ILoginUserUseCase';
import { IUserRepository } from '../../interfaces/user/IUserRepository';
import { ITokenService } from '../../interfaces/services/ITokenService';
import { VerifyOtpResponseDTO } from '../../dtos/user/VerifyOtpResponseDTO';
import { LoginUserDTO } from '../../dtos/user/LoginUserDTO';
import { InvalidCredentialsError } from '../../../domain/errors/InvalidCredentialsError';
import { UserDoesNotExistError } from '../../../domain/errors/UserDoesNotExistError';
import { IPasswordService } from '../../interfaces/services/IPasswordService';
import { Email } from '../../../domain/value-objects/Email';
import { Password } from '../../../domain/value-objects/Password';

export class LoginUserUseCase implements ILoginUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordService: IPasswordService,
    private tokenService: ITokenService
  ) {}

  async execute(dto: LoginUserDTO): Promise<VerifyOtpResponseDTO> {
    const { email, password } = dto;
    const emailVO =Email.create(email);
    const passwordVO = Password.fromHash(password);
    const user = await this.userRepository.findByEmail(emailVO);
    if (!user) {
      throw new UserDoesNotExistError();
    }
  if (!('password' in user)) {
    throw new InvalidCredentialsError(); 
  }
    const isValid = await this.passwordService.comparePassword(
      passwordVO.hash,
      user.password.hash
    );
    if (!isValid) {
      throw new InvalidCredentialsError();
    }

    const payload = {
      userId: user.id,
      email: user.email.value,
      role: user.userRole,
    };
    const accessToken = this.tokenService.generateAccessToken(payload);
    const refreshToken = this.tokenService.generateRefreshToken(payload);

    return { email:user.email.value, accessToken, refreshToken };
  }
}
