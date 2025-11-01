import { RegisterUserDTO,UserPublicDTO } from "../../dtos/user/UserDTO";

export interface IUserRegistrationService{
      registerUser(data: RegisterUserDTO): Promise<UserPublicDTO>
      verifyEmail(email:string,otp:string):Promise<void>
      resendVerification(email:string):Promise<void>
}



// import { Password } from '../../../domain/value-objects/Password';
// import { Email } from '../../../domain/value-objects/Email';
// import { GoogleUser } from '../../../domain/entities/User';
// import { EmailUser } from '../../../domain/entities/User';

// export interface IUserRepository {
//   findByEmail(email: Email): Promise<EmailUser | GoogleUser |null>;
//   findById(id: string): Promise<EmailUser | GoogleUser | null>;
//   findByGoogleId(googleId:string):Promise<GoogleUser|null>
//   createUser(user:EmailUser | GoogleUser): Promise<EmailUser | GoogleUser>;
//   verifyUser(userId: string): Promise<void>;
//   updatePassword(userId: string, password: Password): Promise<void>;
//   deleteUser(userId:string):Promise<void>;
// }
