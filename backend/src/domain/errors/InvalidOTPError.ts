export class InvalidOTPError extends Error{
    constructor(){
super(`OTP is invalid or expired`)
this.name="InvalidOTPError"
    }
}