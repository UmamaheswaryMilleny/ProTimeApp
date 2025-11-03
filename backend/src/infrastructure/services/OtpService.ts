import { IOtpService } from "../../application/interfaces/services/IOtpService";
import { ICacheService } from "../../application/interfaces/services/ICacheService";


export class OtpService implements IOtpService{
    constructor(private cache:ICacheService){}

    async generateOtp(email: string, purpose: string): Promise<string> {
        const otp=Math.floor(100000 + Math.random()*900000).toString();
        await this.cache.set(`otp:${purpose}:${email}`,otp,300)
        return otp;
    }

    async verifyOtp(email: string, otp: string, purpose: string): Promise<boolean> {
        const cached = await this.cache.get(`otp:${purpose}:${email}`)
        return cached==otp
    }

    async deleteOtp(email: string): Promise<void> {
        await this.cache.delete(`otp:register:${email}`)
    }
}