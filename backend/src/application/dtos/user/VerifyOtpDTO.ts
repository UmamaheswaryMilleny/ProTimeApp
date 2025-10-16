import { OTP } from '../../../domain/value-objects/OTP';

export interface VerifyOtpDTO {
  email: string;
  otp: OTP;
}
