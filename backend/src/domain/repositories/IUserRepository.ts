import { User } from '../entities/User';
import { Password } from '../value-objects/Password';
import { Email } from '../value-objects/Email';
import { GoogleUser } from '../entities/User';
import { EmailUser } from '../entities/User';

export interface IUserRepository {
  findByEmail(email: Email): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  findByGoogleId(googleId:string):Promise<User|null>
  createUser(user:EmailUser | GoogleUser): Promise<User>;
  verifyUser(userId: string): Promise<User>;
  updatePassword(userId: string, password: Password): Promise<User>;
  deleteUser(userId:string):Promise<void>;
}
