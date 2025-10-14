export class InvalidCredentialsError extends Error{
    constructor(email:string){
super(`Invalid credential for user ${email}`)
        this.name="InvalidCredentialsError"
    }
}