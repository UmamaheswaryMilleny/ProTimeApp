import { IBaseRepository } from "./IBaseRepository";
import { User } from "../../../domain/entities/User";
import { Email } from "../../../domain/value-objects/Email";

export interface IUserRepository extends IBaseRepository<User> {
  findByEmail(email: Email): Promise<User | null>;
  findByGoogleId(googleId: string): Promise<User | null>;
}