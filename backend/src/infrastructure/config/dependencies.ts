// src/infrastructure/config/dependencies.ts
import { UserModel } from "../database/Schema/userSchema";
import { UserRepository } from "../database/repositories/UserRepository";
import { PasswordService } from "../services/PasswordService";
import { JwtTokenService } from "../services/TokenService";
import { CacheService } from "../services/CacheService";
import { EmailService } from "../services/EmailService";
import { OtpService } from "../services/OtpService";
import { DomainEventPublisher } from "../services/DomainEventPublisher";
import { WinstonLogger } from "../Logger/logger";
import { ForgotPasswordUseCase } from "../../application/use-cases/user/ForgotPasswordUseCase";
import { ResetPasswordUseCase } from "../../application/use-cases/user/ResetPasswordUseCase";
import { RegisterUseCase } from "../../application/use-cases/user/RegisterUserUseCase";
import { VerifyOtpUsecase } from "../../application/use-cases/user/VerifyOtpUseCase";
import { LoginUserUseCase } from "../../application/use-cases/user/LoginUserUseCase";
// import { AdminModel } from "../database/Schema/adminSchema";
// import { AdminRepository } from "../database/repositories/AdminRepository";
import { LoginAdminUseCase } from "../../application/use-cases/user/LoginAdminUseCase";


export const logger = new WinstonLogger();
export const userRepository = new UserRepository(UserModel);
export const passwordService = new PasswordService();
export const tokenService = new JwtTokenService();
export const cacheService = new CacheService();
export const emailService = new EmailService();
export const otpService = new OtpService(cacheService);
export const domainEventPublisher = new DomainEventPublisher(logger);
export const adminRepository=new AdminRepository(UserModel)

// Create use case (application layer)
export const registerUseCase = new RegisterUseCase(
  userRepository,
  passwordService,
  otpService,
  emailService,
  cacheService,
  domainEventPublisher,
  logger
);

export const verifyOtpUseCase = new VerifyOtpUsecase(
  userRepository,
  tokenService,
  cacheService,
  otpService,
  domainEventPublisher,
  logger
);

export const loginUserUseCase = new LoginUserUseCase(
  userRepository,
  passwordService,
  tokenService,
  logger
);

export const forgotPasswordUseCase = new ForgotPasswordUseCase(
  userRepository,
  otpService,
  emailService,
  cacheService,
  domainEventPublisher,
  logger
);

export const resetPasswordUseCase = new ResetPasswordUseCase(
  userRepository,
  passwordService,
  otpService,
  cacheService,
  domainEventPublisher,
  logger
);


export const adminLoginUseCase=new LoginAdminUseCase(
userRepository,
passwordService,
tokenService,
logger
)

// import { UserRepository } from "../database/repositories/UserRepository";
// import { UserModel } from "../database/Schema/userSchema";
// import { PasswordService } from "../services/PasswordService";
// import { JwtTokenService } from "../services/TokenService";
// import { CacheService } from "../services/CacheService";
// import { EmailService } from "../services/EmailService";
// import { OtpService } from "../services/OtpService";
// import { DomainEventPublisher } from "../services/DomainEventPublisher";
// import { WinstonLogger } from "../Logger/logger";


// export const userRepository = new UserRepository(UserModel);
// export const passwordService = new PasswordService();
// export const tokenService = new JwtTokenService();
// export const cacheService = new CacheService();
// export const emailService = new EmailService();
// export const otpService = new OtpService(cacheService);
// export const logger = new WinstonLogger()
// export const domainEventPublisher = new DomainEventPublisher(logger);
