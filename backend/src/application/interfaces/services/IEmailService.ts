

export interface IEmailService {
  sendEmail(to:string,subject:string,body:string):Promise<void>
  sendOtp(email:string, otp: string): Promise<void>;
}
