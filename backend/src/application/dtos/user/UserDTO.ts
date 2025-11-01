import {
  UserRole,
  UserStatus,
  OtpPurpose,
  Provider,
} from '../../../domain/enums/UserEnums';

export interface UserPublicDTO {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  googleId?: string;
  isVerified: boolean;
  provider: Provider;
  createdAt: Date;
}

export interface RegisterUserDTO {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  googleId?: string;
  provider:Provider;
}

export interface RegisterResponseDTO{
  data?:UserPublicDTO,
  message:string
  isOtpRequired:boolean
}

export interface GoogleRegisterResponseDTO{
  type:"GOOGLE",
  data:UserPublicDTO,
  message?:string
}

export interface LoginUserDTO {
  email: string;
  password: string;
}

export interface AuthTokensDTO {
  accessToken: string;
  refreshToken: string;
}
export interface LoginResponseDTO extends AuthTokensDTO {
  data: UserPublicDTO;
  message?: string;
}

export interface ResendOtpRequestDTO {
  email: string;
  purpose: OtpPurpose;
}

export interface ForgotPasswordRequestDTO {
  email: string;
}

export interface ForgotPasswordResponseDTO {
  message: string;
}

export interface ResetPasswordRequestDTO {
  email: string;
  // purpose:OtpPurpose
  newPassword: string;
  confirmPassword: string;
}

export interface ResetPasswordResponseDTO {
  message: string;
}

export interface VerifyOtpRequestDTO {
  email: string;
  otp: string;
}

export interface VerifyOtpResponseDTO extends AuthTokensDTO {
  //   userId: string;
  // name:string,
  email: string;
  // role:string,
  accessToken: string;
  refreshToken: string;
  message?: string;
}

// export interface RefreshAccessTokenResponseDTO {

// }

export interface GoogleAuthResponseDTO {
  data: UserPublicDTO;
  // isNewUser: boolean,
  message?: string;
}
