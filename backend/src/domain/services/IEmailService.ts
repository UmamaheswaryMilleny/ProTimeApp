export interface IEmailSerivice{
    sendOtp(email:string,otp:string):Promise<void>
}