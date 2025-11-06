// src/application/use-cases/user/ResetPasswordUseCase.ts
import { IResetPasswordUseCase } from "../../interfaces/usecase/IResetPasswordUseCase";
import { IUserRepository } from "../../interfaces/repository/IUserRepository";
import { IPasswordService } from "../../interfaces/services/IPasswordService";
import { IOtpService } from "../../interfaces/services/IOtpService";
import { ICacheService } from "../../interfaces/services/ICacheService";
import { ILogger } from "../../interfaces/ILogger";
import { ResetPasswordRequestDTO, ResetPasswordResponseDTO } from "../../dtos/user/UserDTO";
import { Email } from "../../../domain/value-objects/Email";
import { InvalidOTPError } from "../../../domain/errors/InvalidOTPError";
import { OtpExpiredError } from "../../../domain/errors/OtpExpiredError";
import { Password } from "../../../domain/value-objects/Password";
import { ResponseMessages } from "../../constants/ResponseMessages";
import { OtpPurpose } from "../../../domain/enums/UserEnums";
import { UserDoesNotExistError } from "../../../domain/errors/UserDoesNotExistError";
import { IDomainEventPublisher } from "../../interfaces/repository/IDomainEventPublisher";
import { InvalidCredentialsError } from "../../../domain/errors/InvalidCredentialsError";
import { EmailUser } from "../../../domain/entities/User";

export class ResetPasswordUseCase implements IResetPasswordUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordService: IPasswordService,
    private readonly otpService: IOtpService,
    private readonly cacheService: ICacheService,
    private readonly domainEventPublisher: IDomainEventPublisher,
    private readonly logger: ILogger
  ) {}

  async execute(dto: ResetPasswordRequestDTO): Promise<ResetPasswordResponseDTO> {
    const emailVO = Email.create(dto.email);
    const user = await this.userRepository.findByEmail(emailVO);

    if (!user) {
      throw new UserDoesNotExistError();
    }

    const cachedOtp = await this.cacheService.get(`otp:reset:${dto.email}`);
    if (!cachedOtp) throw new OtpExpiredError();

    const isValidOtp = await this.otpService.verifyOtp(dto.email, cachedOtp, OtpPurpose.RESET);
    if (!isValidOtp) throw new InvalidOTPError();

    const hashedPassword = await this.passwordService.hashPassword(dto.newPassword);
    const passwordVO = Password.fromHash(hashedPassword);

    if (user instanceof EmailUser) {
  user.changeHashedPassword(passwordVO);
} else {
  this.logger.warn(`Password reset attempted for non-local user: ${dto.email}`);
  throw new InvalidCredentialsError();
}

    await this.userRepository.save(user);
    await this.domainEventPublisher.publishEvents(user.events);
    user.clearEvents();

    await this.cacheService.delete(`otp:reset:${dto.email}`);
    this.logger.info(`Password reset successfully for ${dto.email}`);

    return { message: ResponseMessages.PasswordUpdatedSuccess };
  }
}










// import { IResetPasswordUseCase } from '../../interfaces/usecase/IResetPasswordUseCase';
// import { IUserRepository } from '../../interfaces/usecase/IUserRepository';
// import { ResetPasswordDTO } from '../../dtos/user/ResetPasswordDTO';
// import { PasswordMismatchError } from '../../../domain/errors/PasswordMismatchError';
// import { IPasswordService } from '../../interfaces/services/IPasswordService';
// import { ResetPasswordResponseDTO } from '../../dtos/user/ResetPasswordResponseDTO';
// import { ICacheService } from '../../interfaces/services/ICacheService';
// import { Email } from '../../../domain/value-objects/Email';
// import { InvalidOTPError } from '../../../domain/errors/InvalidOTPError';
// import { UserDoesNotExistError } from '../../../domain/errors/UserDoesNotExistError';
// import { Password } from '../../../domain/value-objects/Password';

// export class ResetPasswordUseCase implements IResetPasswordUseCase {
//   constructor(
//     private userRepository: IUserRepository,
//     private ICacheServices: ICacheService,
//     private passwordService: IPasswordService
//   ) {}

//   async execute(dto: ResetPasswordDTO): Promise<ResetPasswordResponseDTO> {
//     const { email, otp, password, confirmPassword } = dto;
//     const emailVO = Email.create(email);

//     const storedOtp = await this.ICacheServices.get(
//       `forgotPassword:${emailVO.value}`
//     );
//     if (!storedOtp) {
//       throw new InvalidOTPError();
//     }
//     if (storedOtp !== otp) {
//       throw new InvalidOTPError();
//     }

//     if (password !== confirmPassword) {
//       throw new PasswordMismatchError();
//     }
//     const existingUser = await this.userRepository.findByEmail(emailVO);
//     if (!existingUser) {
//       throw new UserDoesNotExistError();
//     }
//     const hashedPassword = await this.passwordService.hashPassword(password);
//     const passwordVO = Password.fromHash(hashedPassword);

//     await this.userRepository.updatePassword(existingUser.id, passwordVO);

//     return { message: 'Password has reset Successfully' };
//   }
// }
