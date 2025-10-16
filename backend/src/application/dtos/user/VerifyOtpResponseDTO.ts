import { User } from '../../../domain/entities/User';

export interface VerifyOtpResponseDTO {
  user: User;
  accessToken: string;
  refreshToken: string;
}
