import { ILoginUserUseCase } from '../../../domain/use-cases/user/ILoginUserUseCase';
import { IUserRepositories } from '../../../domain/repositories/IUserRepositories';
import { ITokenServices } from '../../../domain/services/ITokenService';
import { VerifyOtpResponseDTO } from '../../dtos/user/VerifyOtpResponseDTO';
import { LoginUserDTO } from '../../dtos/user/LoginUserDTO';
import { InvalidCredentialsError } from '../../../domain/errors/InvalidCredentialsError';
import { UserNotExistError } from '../../../domain/errors/UserNotExistError';
import { IPasswordServices } from '../../../domain/services/IPasswordService';

export class LoginUserUseCase implements ILoginUserUseCase {
  constructor(
    private userRespository: IUserRepositories,
    private passwordSerice: IPasswordServices,
    private tokenService: ITokenServices
  ) {}

  async execute(dto: LoginUserDTO): Promise<VerifyOtpResponseDTO> {
    const { email, password } = dto;

    const user = await this.userRespository.findByEmail(email);
    if (!user) {
      throw new UserNotExistError(email);
    }

    const isValid = await this.passwordSerice.comparePassword(
      password,
      user.password.value
    );
    if (!isValid) {
      throw new InvalidCredentialsError(email);
    }

    const payload = {
      userId: user.id,
      email: user.email.value,
      role: user.userRole,
    };
    const accessToken = this.tokenService.generateAccessToken(payload);
    const refreshToken = this.tokenService.generateRefreshToken(payload);

    return { user, accessToken, refreshToken };
  }
}
