// src/infrastructure/mappers/UserMapper.ts
import { IUserModel } from "../database/Models/userModel";
import { EmailUser, GoogleUser, User } from "../../domain/entities/User";
import { Email } from "../../domain/value-objects/Email";
import { Password } from "../../domain/value-objects/Password";
import { UserId } from "../../domain/value-objects/UserId";
import { Provider } from "../../domain/enums/UserEnums";
import { UserRole,UserStatus } from "../../domain/enums/UserEnums";
/**
 * Convert persistence model -> domain entity
 */
export const toDomain = (doc: IUserModel | null): User | null => {
  if (!doc) return null;

  const userId = UserId.create(doc.id); // doc.id is domain id stored in DB
  const emailVO = Email.create(doc.email);
 const role = doc.role as UserRole;
 const status = doc.status as UserStatus;
  const provider = doc.provider as Provider;
  // If provider is GOOGLE or googleId exists -> GoogleUser
  if (doc.provider === Provider.GOOGLE || doc.googleId) {
    // GoogleUser.create validates name and googleId
    return GoogleUser.create(userId, doc.name, emailVO, doc.googleId ?? "");
  }

  // Otherwise EmailUser (local)
  // doc.password is a hash in DB — reconstruct Password via fromHash
 if (!doc.password && doc.provider !== Provider.GOOGLE) {
  throw new Error("Missing password for EmailUser in database");
}
const passwordVO = Password.fromHash(doc.password ?? "");

  // Note: EmailUser.create validates name length etc.
  // We assume password exists for local accounts; if not, creation may throw.
   return EmailUser.restore(
    userId,
    doc.name,
    emailVO,
    passwordVO,
    role,
    status,
    doc.isVerified,
    provider,
    doc.createdAt,
    doc.updatedAt
  );
};

/**
 * Convert domain entity -> persistence object (plain POJO matching IUserModel fields)
 * Use this before saving/upserting to DB.
 */
export const toPersistence = (user: User): Partial<IUserModel> => {
  // Common fields
  const base: Partial<IUserModel> = {
    id: user.id.value,
    name: user.name,
    email: user.email.value,
    role: user.role,
    status: user.status,
    isVerified: user.isVerified,
    provider: user.provider,
  };

  // Add provider-specific fields
  // EmailUser has password value object
  if (user instanceof EmailUser) {
    base.password = (user as EmailUser).password.hash;
  }

  if (user instanceof GoogleUser) {
    base.googleId = (user as GoogleUser).googleId;
  }

  return base;
};
