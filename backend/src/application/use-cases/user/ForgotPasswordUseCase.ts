import { IForgotPasswordUseCase } from "../../../domain/use-cases/user/IForgotPasswordUseCase";
import { IUserRepositories } from "../../../domain/repositories/IUserRepositories";
import { ICacheServices } from "../../../domain/services/ICacheService";
import { IEmailSerivice } from "../../../domain/services/IEmailService";
import { ForgotPasswordDTO } from "../../../domain/dtos/user/ForgotPasswordDTO";
import { UserNotExistError } from "../../../domain/errors/UserNotExistError";
import { ForgotPasswordResponseDTO } from "../../../domain/dtos/user/ForgotPasswordResponseDTO";

export class ForgotPasswordUseCase implements IForgotPasswordUseCase{
    constructor(
        private userRepository:IUserRepositories,
        private emailService:IEmailSerivice,
        private cacheService:ICacheServices

    ){}

    async execute(dto: ForgotPasswordDTO): Promise<ForgotPasswordResponseDTO> {
       const {email} = dto
           const existingUser = await this.userRepository.findByEmail(email);
       if(!existingUser){
throw new UserNotExistError(email)
}
    const otp = Math.floor(100000 + Math.random() * 900000);

    await this.cacheService.set(`forgotPassword:${email}`, otp.toString(), 300);
await this.emailService.sendOtp(email,otp.toString())
return {message:"OTP has send to you email"}
}
}