// import { Password } from "../../../domain/value-objects/Password";

export interface IPasswordService {
  hashPassword(password: string): Promise<string>;
  comparePassword(password: string, hash: string): Promise<boolean>;
}
