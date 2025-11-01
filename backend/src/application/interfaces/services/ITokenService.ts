// import { Email } from "../../../domain/value-objects/Email";
import { UserRole } from "../../../domain/enums/UserEnums";

export interface UserPayload {
  userId: string;
  email: string;
  role: UserRole;
}
export interface ITokenService {
  generateAccessToken(payload: UserPayload):Promise<string>;
  verifyAccessToken(token: string): UserPayload | null;
  generateRefreshToken(payload: UserPayload): Promise<string>;
  verifyRefreshToken(token: string): UserPayload | null;
}
