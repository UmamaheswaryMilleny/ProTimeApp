import { ILoginUserUseCase } from "../../interfaces/usecase/ILoginUserUseCase";
import { IUserRepository } from "../../interfaces/repository/IUserRepository";
import { IPasswordService } from "../../interfaces/services/IPasswordService";
import { ITokenService } from "../../interfaces/services/ITokenService";
import { ILogger } from "../../interfaces/ILogger";
import { Email } from "../../../domain/value-objects/Email";
import { InvalidCredentialsError } from "../../../domain/errors/InvalidCredentialsError";
import { ResponseMessages } from "../../constants/ResponseMessages";
import { LoginUserDTO, LoginResponseDTO, UserPublicDTO } from "../../dtos/user/UserDTO";
import { EmailUser } from "../../../domain/entities/User";

export class LoginUserUseCase implements ILoginUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordService: IPasswordService,
    private readonly tokenService: ITokenService,
    private readonly logger: ILogger
  ) {}

  async execute(dto: LoginUserDTO): Promise<LoginResponseDTO> {
    const emailVO = Email.create(dto.email);
    const user = await this.userRepository.findByEmail(emailVO);

    if (!user) {
      this.logger.warn(`Login failed: user not found for ${dto.email}`);
      throw new InvalidCredentialsError();
    }

    if (!user.isVerified) {
      this.logger.warn(`Login attempt for unverified user: ${dto.email}`);
      throw new InvalidCredentialsError();
    }

    // 🧩 Narrow type before checking password
    if (!(user instanceof EmailUser)) {
      this.logger.warn(`Non-local user attempted password login: ${dto.email}`);
      throw new InvalidCredentialsError();
    }

    const isValidPassword = await this.passwordService.comparePassword(
      dto.password,
      user.password.hash
    );

    if (!isValidPassword) {
      this.logger.warn(`Invalid password for ${dto.email}`);
      throw new InvalidCredentialsError();
    }

    const payload = {
      userId: user.id.value,
      email: user.email.value,
      role: user.role,
    };

    // 🪙 Generate tokens
    let accessToken = "";
    let refreshToken = "";

    if (dto.accessToken && dto.refreshToken) {
      const validAccess = await this.tokenService.verifyAccessToken(dto.accessToken);
      const validRefresh = await this.tokenService.verifyRefreshToken(dto.refreshToken);

      if (validAccess && validRefresh) {
        accessToken = dto.accessToken;
        refreshToken = dto.refreshToken;
      } else {
        this.logger.info(`Tokens expired, reissuing for ${dto.email}`);
        accessToken = await this.tokenService.generateAccessToken(payload);
        refreshToken = await this.tokenService.generateRefreshToken(payload);
      }
    } else {
      accessToken = await this.tokenService.generateAccessToken(payload);
      refreshToken = await this.tokenService.generateRefreshToken(payload);
    }

    const userPublic: UserPublicDTO = {
      id: user.id.value,
      name: user.name,
      email: user.email.value,
      role: user.role,
      status: user.status,
      isVerified: user.isVerified,
      provider: user.provider,
      createdAt: user.createdAt,
    };

    this.logger.info(`User ${dto.email} logged in successfully`);

    return {
      data: userPublic,
      accessToken,
      refreshToken,
      message: ResponseMessages.LoginSuccess,
    };
  }
}
