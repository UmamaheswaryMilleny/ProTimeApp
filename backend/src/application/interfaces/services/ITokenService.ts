// import { Email } from "../../../domain/value-objects/Email";
import { UserRole } from "../../../domain/enums/UserEnums";

export interface UserPayload {
  userId: string;
  email: string;
  role: UserRole;
}
export interface ITokenService {
  generateAccessToken(payload: UserPayload): string;
  verifyAccessToken(token: string): object | null;
  generateRefreshToken(payload: UserPayload): string;
  verifyRefreshToken(token: string): object | null;
}
