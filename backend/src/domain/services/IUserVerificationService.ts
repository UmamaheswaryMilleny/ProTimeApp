export interface IUserVerificationServices{
    verifyUserEmail(email:string):void
    verifyOtpEmail(user:string):void
    checkUserVerified(userId:string):boolean
}