import { OTP } from "../../value-objects/OTP";
export interface VerifyOtpDTO {
  email: string;
  otp: OTP;
}
