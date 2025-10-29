import { Email } from "../../../domain/value-objects/Email";
import { OTP } from "../../../domain/value-objects/OTP";
export interface IEmailService {
  sendOtp(email:Email, otp: OTP): Promise<void>;
}
