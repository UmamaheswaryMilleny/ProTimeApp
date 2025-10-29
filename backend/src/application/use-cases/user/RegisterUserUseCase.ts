import { IRegisterUserUseCase } from '../../interfaces/user/IRegisterUserUseCase';
import { IEmailService } from '../../interfaces/services/IEmailService';
import { ICacheService } from '../../interfaces/services/ICacheService';
import { IUserRepository } from '../../interfaces/user/IUserRepository';
import { RegisterUserDTO } from '../../dtos/user/UserDTO';
import { IPasswordService } from '../../interfaces/services/IPasswordService';
import { Email } from '../../../domain/value-objects/Email';
import { OTP } from '../../../domain/value-objects/OTP';
import { UserAlreadyExistError } from '../../../domain/errors/UserAlreadyExistError';
import { PasswordMismatchError } from '../../../domain/errors/PasswordMismatchError';
import { Password } from '../../../domain/value-objects/Password';
import { OtpPurpose } from '../../../domain/types/Auth';
import { ResponseMessages } from '../../constants/ResponseMessages';
import { UserId } from '../../../domain/value-objects/UserId';
// import { EmailUser } from '../../../domain/entities/User';
// import { GoogleUser } from '../../../domain/entities/User';

export class RegisterUserUseCase implements IRegisterUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private emailService: IEmailService,
    private cacheService: ICacheService,
    private passwordService: IPasswordService
  ) {}

  async execute(
    dto: RegisterUserDTO
  ): Promise<{ success: boolean; message: string }> {
    const { name, email, password, confirmPassword } = dto;
    const emailVO = Email.create(email);
    // const passwordVO = Password.create(password);
    const existingUser = await this.userRepository.findByEmail(emailVO);
    if (existingUser) {
      throw new UserAlreadyExistError();
    }


      // If Google Sign-Up
    // if (googleID) {
    //   const userId = UserId.create();
    //   const googleUser = GoogleUser.create(userId.getValue(), name, emailVO, googleId);
    //   await this.userRepository.save(googleUser);
    //   return { success: true, message: ResponseMessages.RegisteredWithGoogle };
    // }

    if (password !== confirmPassword) {
      throw new PasswordMismatchError();
    }
    const hashedPassword = await this.passwordService.hashPassword(password);
    // const hashedPassword = await this.passwordService.hashPassword(passwordVO.hash);
    // const passwordVOForUser = Password.fromHash(hashedPassword);
    const passwordVO = Password.fromHash(hashedPassword)
    const userId=UserId.create()

    // const tempUser = EmailUser.create(
    //   userId.getValue(),
    //   name,
    //   emailVO,
    //   passwordVO
    // )


    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 60 * 1000);
    const otpVO = OTP.create(otp, expiresAt,OtpPurpose.RIGISTER)
    ;
    await this.cacheService.set(`otp:register:${emailVO.value}`, otpVO.value, 300);
    // const userData = JSON.stringify({
    //   name,
    //   email: emailVO.value,
    //   password: hashedPassword,
    // });



    // await this.cacheService.set(`user:temp:${emailVO.value}`,JSON.stringify(tempUser), 300);
        await this.cacheService.set(
      `user:temp:${emailVO.value}`,
      JSON.stringify({
        id: userId.getValue(),
        name,
        email: emailVO.value,
        password: passwordVO.hash,
      }),
      300
    );

    await this.emailService.sendOtp(emailVO, otpVO);
    return { success: true,  message: ResponseMessages.OtpHasBeenSent};
  }
}
