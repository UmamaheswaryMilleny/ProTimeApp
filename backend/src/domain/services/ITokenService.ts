import { Email } from "../value-objects/Email";
import { UserRole } from "../enums/UserRole";

interface UserPayload {
  userId: string;
  email: Email;
  role: UserRole;
}
export interface ITokenService {
  generateAccessToken(payload: UserPayload): string;
  verifyAccessToken(token: string): object | null;
  generateRefreshToken(payload: UserPayload): string;
  verifyRefreshToken(token: string): object | null;
}
