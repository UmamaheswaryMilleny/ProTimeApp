import { IPasswordService } from '../../application/interfaces/services/IPasswordService';
import bcrypt from 'bcryptjs';

export class PasswordService implements IPasswordService {
  // Generate a random salt using 10 rounds of computation.
  // A salt is a random piece of data added to the password before hashing.

  private readonly saltRounds=10;

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
