export interface IPasswordServices{
    hashPassword(password:string):string
    comparePassword(password:string,hash:string):boolean
}