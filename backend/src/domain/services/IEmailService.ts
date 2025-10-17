import { OTP } from "../value-objects/OTP";
import { Email } from "../value-objects/Email";

export interface IEmailService {
  sendOtp(email:Email, otp: OTP): Promise<void>;
}
