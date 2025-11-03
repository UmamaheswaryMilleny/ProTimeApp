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

import { RegisterUseCase } from "../../application/use-cases/user/RegisterUserUseCase";

export const logger = new WinstonLogger();
export const userRepository = new UserRepository(UserModel);
export const passwordService = new PasswordService();
export const tokenService = new JwtTokenService();
export const cacheService = new CacheService();
export const emailService = new EmailService();
export const otpService = new OtpService(cacheService);
export const domainEventPublisher = new DomainEventPublisher(logger);

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
