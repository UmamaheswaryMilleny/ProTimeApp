import { UserRepository } from "../infrastructure/database/repositories/UserRepository";
import { EmailService } from "../infrastructure/services/EmailService";
import { CacheService } from "../infrastructure/services/CacheService";
import { PasswordService } from "../infrastructure/services/PasswordService";
import { RegisterUserUseCase } from "../application/use-cases/user/RegisterUserUseCase";

const userRepository = new UserRepository();
const emailService = new EmailService();
const cacheService = new CacheService();
const passwordService = new PasswordService();

export const registerUserUseCase = new RegisterUserUseCase(
  userRepository,
  emailService,
  cacheService,
  passwordService
);
