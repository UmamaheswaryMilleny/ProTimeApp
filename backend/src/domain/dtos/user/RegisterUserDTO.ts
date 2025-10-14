export interface RegisterUserDTO{
    name:string
    email:string
    password:string
    confirmPassword:string
    googleID?:string
}