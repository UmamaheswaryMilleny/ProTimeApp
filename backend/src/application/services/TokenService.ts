import jwt from 'jsonwebtoken';
import { ITokenServices } from '../../domain/services/ITokenService';

interface UserPayload {
  userId: string;
  email: string;
  role: string;
}

export class TokenSerivice implements ITokenServices {
  ACCESS_TOKEN_SECRET = process.env.JWT_SECRET!;
  REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;

  generateAccessToken(payload: UserPayload): string {
    return jwt.sign(payload, this.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
  }

  verifyAccessToken(token: string): object | null {
    try {
      const decoded = jwt.verify(token, this.ACCESS_TOKEN_SECRET);
      return typeof decoded === 'string' ? null : decoded;
      // return jwt.verify(token, this.ACCESS_TOKEN_SECRET);
    } catch (error) {
      console.error('Access token verification failed:', error);
      return null;
    }
  }

  generateRefreshToken(payload: UserPayload): string {
    return jwt.sign(payload, this.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
  }

  verifyRefreshToken(token: string): object | null {
    try {
      const decoded = jwt.verify(token, this.REFRESH_TOKEN_SECRET);
      return typeof decoded === 'string' ? null : decoded;
      // return jwt.verify(token, this.REFRESH_TOKEN_SECRET);
    } catch (error) {
      console.error('refresh token verification failed:', error);
      return null;
    }
  }
}
