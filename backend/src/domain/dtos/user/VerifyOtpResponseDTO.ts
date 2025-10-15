import { User } from "../../entities/User";

export interface VerifyOtpResponseDTO{
    user:User
    accessToken:string
    refreshToken:string
}