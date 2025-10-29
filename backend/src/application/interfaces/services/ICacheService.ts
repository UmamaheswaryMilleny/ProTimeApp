// import { Email } from "../../../domain/value-objects/Email";
// import { OTP } from "../../../domain/value-objects/OTP";

export interface ICacheService {
  set(key: string, value:string, ttlSeconds: number): Promise<void>;
  get(key:string): Promise<string | null>;
  delete(key:string): Promise<void>;
}
