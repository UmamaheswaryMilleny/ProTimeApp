// src/application/use-cases/admin/LoginAdminUseCase.ts
import { ILoginAdminUseCase } from "../../interfaces/usecase/ILoginAdminUseCase";
// import { IAdminRepository } from "../../interfaces/repository/IAdminRepository";
import { IPasswordService } from "../../interfaces/services/IPasswordService";
import { ITokenService } from "../../interfaces/services/ITokenService";
import { ILogger } from "../../interfaces/ILogger";
import { Email } from "../../../domain/value-objects/Email";
import { InvalidCredentialsError } from "../../../domain/errors/InvalidCredentialsError";
import { ResponseMessages } from "../../constants/ResponseMessages";
import { AdminLoginRequestDTO } from "../../dtos/admin/adminDTO";
import { AdminLoginResponseDTO } from "../../dtos/admin/adminDTO";
import { UserRole,UserStatus } from "../../../domain/enums/UserEnums";

export class LoginAdminUseCase implements ILoginAdminUseCase {
  constructor(
    private readonly adminRepository: IAdminRepository,
    private readonly passwordService: IPasswordService,
    private readonly tokenService: ITokenService,
    private readonly logger: ILogger
  ) {}

  async execute(dto:AdminLoginRequestDTO): Promise<AdminLoginResponseDTO> {
    const emailVO = Email.create(dto.email);
    const admin = await this.adminRepository.findByEmail(emailVO);

    if (!admin) {
      this.logger.warn(`Admin login failed: ${dto.email} not found`);
      throw new InvalidCredentialsError();
    }

    const isValid = await this.passwordService.comparePassword(dto.password, admin.password.hash);
    if (!isValid) {
      this.logger.warn(`Invalid password for admin ${dto.email}`);
      throw new InvalidCredentialsError();
    }

    const payload = {
      userId: admin.id.value,
      email: admin.email.value,
      role: admin.role,
    };

    const accessToken = await this.tokenService.generateAccessToken(payload);
    const refreshToken = await this.tokenService.generateRefreshToken(payload);

    this.logger.info(`Admin ${dto.email} logged in successfully`);

    return {
      data: {
        id: admin.id.value,
        name: admin.name,
        email: admin.email.value,
          role: UserRole.ADMIN,
  status: UserStatus.ACTIVE,
        createdAt: admin.createdAt,
      },
      accessToken,
      refreshToken,
      message: ResponseMessages.LoginSuccess,
    };
  }
}


