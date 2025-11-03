import jwt from "jsonwebtoken";
import { ITokenService } from "../../application/interfaces/services/ITokenService";
import { UserPayload } from "../../application/interfaces/services/ITokenService";
import { config } from "../config/env";

export class JwtTokenService implements ITokenService {
  async generateAccessToken(payload: UserPayload): Promise<string> {
    return jwt.sign(payload, config.jwtAccessSecret, {
      expiresIn: "15m",
    });
  }

  async generateRefreshToken(payload: UserPayload): Promise<string> {
    return jwt.sign(payload, config.jwtRefreshSecret, {
      expiresIn: "7d",
    });
  }

  async verifyAccessToken(token: string): Promise<UserPayload | null> {
    return jwt.verify(token,config.jwtAccessSecret) as UserPayload;
  }
  async verifyRefreshToken(token: string): Promise<UserPayload | null> {
    return jwt.verify(token,config.jwtRefreshSecret) as UserPayload;
  }
}


//  verifyAccessToken(token: string): UserPayload | null;
//   generateRefreshToken(payload: UserPayload): Promise<string>;
//   verifyRefreshToken(token: string): UserPayload | null;





















// import jwt from 'jsonwebtoken';
// import { ITokenService } from '../../application/interfaces/services/ITokenService';
// import { UserPayload } from '../../application/interfaces/services/ITokenService';

// export class TokenSerivce implements ITokenService {
//   ACCESS_TOKEN_SECRET = process.env.JWT_SECRET!;
//   REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;

//   generateAccessToken(payload: UserPayload): string {
//     return jwt.sign(payload, this.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
//   }

//   verifyAccessToken(token: string): object | null {
//     try {
//       const decoded = jwt.verify(token, this.ACCESS_TOKEN_SECRET);
//       return typeof decoded === 'string' ? null : decoded;
//       // return jwt.verify(token, this.ACCESS_TOKEN_SECRET);
//     } catch (error) {
//       console.error('Access token verification failed:', error);
//       return null;
//     }
//   }

//   generateRefreshToken(payload: UserPayload): string {
//     return jwt.sign(payload, this.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
//   }

//   verifyRefreshToken(token: string): object | null {
//     try {
//       const decoded = jwt.verify(token, this.REFRESH_TOKEN_SECRET);
//       return typeof decoded === 'string' ? null : decoded;
//       // return jwt.verify(token, this.REFRESH_TOKEN_SECRET);
//     } catch (error) {
//       console.error('refresh token verification failed:', error);
//       return null;
//     }
//   }
// }
