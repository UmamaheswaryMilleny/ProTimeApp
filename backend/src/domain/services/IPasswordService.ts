import { Password } from "../value-objects/Password";

export interface IPasswordService {
  hashPassword(password: Password): Promise<string>;
  comparePassword(password: Password, hash: string): Promise<boolean>;
}
