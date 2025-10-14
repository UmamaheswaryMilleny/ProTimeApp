interface UserPayload {
    userId: string;
    email: string;
    role: string;
}
export interface ITokenServices{
    generateAccessToken(payload:UserPayload):string
    verifyAccessToken(token:string):object|null
    generateRefreshToken(payload:UserPayload):string
    verifyRefreshToken(token:string):object|null
}