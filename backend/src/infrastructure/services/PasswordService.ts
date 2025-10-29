import { IPasswordService } from '../../application/interfaces/services/IPasswordService';
import bcrypt from 'bcryptjs';

export class PasswordService implements IPasswordService {
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
