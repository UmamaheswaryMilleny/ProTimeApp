import { Email } from "../value-objects/Email";
import { OTP } from "../value-objects/OTP";

export interface ICacheService {
  set(email: Email, otp: OTP, ttlSeconds: number): Promise<void>;
  get(email: Email): Promise<string | null>;
  delete(email: Email): Promise<void>;
}
