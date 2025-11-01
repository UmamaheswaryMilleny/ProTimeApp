export interface IRateLimitService{
    checkLimit(key:string,maxAttempts:number,windowSeconds:number):Promise<boolean>
    increment(key:string,windowSeconds:number):Promise<number>
    reset(key:string):Promise<void>
}