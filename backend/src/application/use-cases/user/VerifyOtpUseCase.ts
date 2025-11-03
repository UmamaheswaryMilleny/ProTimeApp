import { IVerifyOTPUserUseCase } from "../../interfaces/usecase/IVerifyOTPUserUseCase";
import { IUserRepository } from "../../interfaces/repository/IUserRepository";
import { ITokenService } from "../../interfaces/services/ITokenService";
import { ICacheService } from "../../interfaces/services/ICacheService";
import { Email } from "../../../domain/value-objects/Email";
import { VerifyOtpRequestDTO, VerifyOtpResponseDTO } from "../../dtos/user/UserDTO";
import { InvalidOTPError } from "../../../domain/errors/InvalidOTPError";
import { OtpExpiredError } from "../../../domain/errors/OtpExpiredError";
import { IOtpService } from "../../interfaces/services/IOtpService";
import { IDomainEventPublisher } from "../../interfaces/repository/IDomainEventPublisher";
import { OtpPurpose} from "../../../domain/enums/UserEnums";
import { ILogger } from "../../interfaces/ILogger";
import { EmailUser } from "../../../domain/entities/User";
import { UserId } from "../../../domain/value-objects/UserId";
import { ResponseMessages } from "../../constants/ResponseMessages";


export class VerifyOtpUsecase implements IVerifyOTPUserUseCase{
  constructor(
    private userRepository:IUserRepository,
    private tokenService:ITokenService,
    private cacheService:ICacheService,
    private otpService:IOtpService,
   private domainEventPublish: IDomainEventPublisher,
    private logger:ILogger

  ){}


  async execute(dto: VerifyOtpRequestDTO): Promise<VerifyOtpResponseDTO> {

    
    const cacheUser=await this.cacheService.get(`user:temp:${dto.email}`)

    if(!cacheUser){
      this.logger.warn(`No registration data found for ${dto.email}`)
      throw new OtpExpiredError()
    }

    
    const isValidOtp=await this.otpService.verifyOtp(dto.email,dto.otp,OtpPurpose.REGISTER)

    if(!isValidOtp){
      this.logger.warn(`Invalid OTP attempt for ${dto.email}`)
      throw new InvalidOTPError()
    }

    const parsedUser = JSON.parse(cacheUser)

    const emailVO=Email.create(parsedUser.email)
    const userId=UserId.create(parsedUser.id)

    // const userId=parsedUser.id
    const user=EmailUser.create(userId,parsedUser.name,emailVO,parsedUser.password)

    user.verifyUser()
    await this.userRepository.save(user)
      await this.domainEventPublish.publishEvents(user.events);
    user.clearEvents()


  const userPayload ={
      userId:user.id.value,
      email:user.email.value,
      role:user.role
    }
    
    const accessToken=await this.tokenService.generateAccessToken(userPayload)
    const refreshToken=await this.tokenService.generateRefreshToken(userPayload)


        this.logger.info(`User ${dto.email} verified successfully`);
 
        // await this.cacheService.delete(`otp:register${dto.email}`);
    await this.cacheService.delete(`user:temp:${dto.email}`);
    return {
      email:user.email.value,
      accessToken,
      refreshToken,
      message:ResponseMessages.OtpVerified
    }
  }
}

// import { IVerifyOTPUserUseCase } from '../../interfaces/usecase/IVerifyOTPUserUseCase';
// import { ICacheService } from '../../interfaces/services/ICacheService';
// import { IUserRepository } from '../../interfaces/usecase/IUserRepository';
// import { ITokenService } from '../../interfaces/services/ITokenService';
// import { Email } from '../../../domain/value-objects/Email';
// import {
//   VerifyOtpRequestDTO,
//   VerifyOtpResponseDTO,
// } from '../../dtos/user/UserDTO';
// import { InvalidOTPError } from '../../../domain/errors/InvalidOTPError';
// import { Password } from '../../../domain/value-objects/Password';
// import { EmailUser } from '../../../domain/entities/User';
// import { OtpExpiredError } from '../../../domain/errors/OtpExpiredError';
// import { toUserPublicDTO } from '../../mappers/UserMapper';

// export class VerifyOTPUserUseCase implements IVerifyOTPUserUseCase {
//   constructor(
//     // private userRepository: IUserRepository,
//     // private cacheService: ICacheService,
//     // private tokenService: ITokenService
//     private readonly userRepository: IUserRepository,
//     private readonly cacheService: ICacheService,
//     private readonly tokenService: ITokenService
//   ) {}

//   async execute(dto: VerifyOtpRequestDTO): Promise<VerifyOtpResponseDTO> {
//     const { email, otp } = dto;
//     const emailVO = Email.create(email);
//     const storedOtp = await this.cacheService.get(`otp:${emailVO.value}`);
//     if (!storedOtp) {
//       throw new InvalidOTPError();
//     }
//     if (storedOtp !== otp.toString()) {
//       throw new OtpExpiredError();
//     }

//     const userDataJson = await this.cacheService.get(
//       `user:temp:${emailVO.value}`
//     );
//     if (!userDataJson) throw new Error('User data not found in cache');

//     const userData = JSON.parse(userDataJson);

//     const user = EmailUser.create(
//       userData.id,
//       userData.name,
//       Email.create(userData.email),
//       Password.fromHash(userData.password)
//     );
//     const savedUser = await this.userRepository.createUser(user);
//     const payload = {
//       userId: savedUser.id,
//       email: savedUser.email.value,
//       role: savedUser.role,
//     };
//     const accessToken = this.tokenService.generateAccessToken(payload);
//     const refreshToken = this.tokenService.generateRefreshToken(payload);

//     await this.cacheService.delete(`otp:register${email}`);
//     await this.cacheService.delete(`user:temp:${email}`);

//     return { email: savedUser.email.value, accessToken, refreshToken };
//   }
// }
