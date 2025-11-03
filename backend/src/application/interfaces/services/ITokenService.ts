
import { UserRole } from "../../../domain/enums/UserEnums";

export interface UserPayload {
  userId: string;
  email: string;
  role: UserRole;
}
export interface ITokenService {
  generateAccessToken(payload: UserPayload):Promise<string>;
  verifyAccessToken(token: string): Promise<UserPayload | null>;
  generateRefreshToken(payload: UserPayload): Promise<string>;
  verifyRefreshToken(token: string):Promise< UserPayload | null>;
}
