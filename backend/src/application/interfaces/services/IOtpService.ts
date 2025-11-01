export interface IOtpService {
  generateOtp(email: string,purpose:string): Promise<string>;
  verifyOtp(email: string, otp: string,purpose:string): Promise<boolean>;
  deleteOtp(email: string): Promise<void>;
}
