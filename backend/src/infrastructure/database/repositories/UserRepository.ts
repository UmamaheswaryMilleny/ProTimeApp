import { Model } from "mongoose";
import { IUserModel } from "../Models/userModel";
import { IUserRepository } from "../../../application/interfaces/repository/IUserRepository";
import { User } from "../../../domain/entities/User";
import { Email } from "../../../domain/value-objects/Email";
import { UserId } from "../../../domain/value-objects/UserId";
import { toDomain } from "../../mappers/UserMapper";
import { toPersistence } from "../../mappers/UserMapper";
/**
 * Infrastructure implementation of IUserRepository using Mongoose.
 * - Uses UserMapper to convert between persistence and domain.
 * - save uses upsert (create or update) to avoid duplicate insert errors.
 */
export class UserRepository implements IUserRepository {
  constructor(private readonly model: Model<IUserModel>) {}

  async save(entity: User): Promise<void> {
    const data = toPersistence(entity);

    // `data.id` must exist (mapper ensures id is present)
    try {
      await this.model
        .findOneAndUpdate(
          { id: data.id },
          { $set: data },
          { upsert: true, new: true, setDefaultsOnInsert: true }
        )
        .exec();
    } catch (err) {
      // rethrow to be handled by upper layers (use logger in DI if desired)
      throw err;
    }
  }

  async findById(id: UserId): Promise<User | null> {
    const doc = await this.model.findOne({ id: id.value }).exec();
    return toDomain(doc);
  }

  async findByEmail(email: Email): Promise<User | null> {
    const doc = await this.model.findOne({ email: email.value }).exec();
    return toDomain(doc);
  }

  async findByGoogleId(googleId: string): Promise<User | null> {
    const doc = await this.model.findOne({ googleId }).exec();
    return toDomain(doc);
  }

  async delete(id: UserId): Promise<boolean> {
    const result = await this.model.findOneAndDelete({ id: id.value }).exec();
    return !!result;
  }
}

