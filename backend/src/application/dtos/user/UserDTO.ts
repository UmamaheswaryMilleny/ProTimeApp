import { UserRole,UserStatus } from "../../../domain/enums/UserEnums";
import { OtpPurpose } from "../../../domain/types/Auth";

export interface UserPublicDTO {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  googleId?: string;
  isNewUser?: boolean;
  createdAt: Date;
}


export interface RegisterUserDTO {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  googleID?: string;
}


export interface LoginUserDTO {
  email: string;
  password: string;
}


export interface LoginResponseDTO {
  accessToken: string;
  refreshToken: string;
  data: UserPublicDTO;
}


export interface ResendOtpRequestDTO{
  email: string;
  purpose: OtpPurpose;
}

export interface ForgotPasswordRequestDTO {
  email:string;
}

export interface ForgotPasswordResponseDTO {
  message: string;
}

export interface ResetPasswordRequestDTO {
  email: string;
purpose:OtpPurpose
}

export interface ResetPasswordResponseDTO {
  message: string;
}

export interface VerifyOtpRequestDTO {
  email: string;
  otp: string;
}

export interface VerifyOtpResponseDTO {
//   userId: string;
  // name:string,
  email:string,
  // role:string,
  accessToken: string;
  refreshToken: string;
}


export interface RefreshAccessTokenResponseDTO {
  accessToken: string;
}



export interface GoogleAuthResponseDTO{
  data: UserPublicDTO,
  isNewUser: boolean,
}