// src/infrastructure/database/repositories/MongoUserRepository.ts
import { IUserRepository } from '../../../application/interfaces/usecase/IUserRepository';
import { UserModel } from '../Models/userModel';
import { EmailUser, GoogleUser } from '../../../domain/entities/User';
import { Email } from '../../../domain/value-objects/Email';
import { Password } from '../../../domain/value-objects/Password';
// import { UserRole } from '../../../domain/enums/UserEnums';
// import { UserStatus } from '../../../domain/enums/UserEnums';

export class UserRepository implements IUserRepository {
  async findByEmail(email: Email): Promise<EmailUser | null> {
    const userDoc = await UserModel.findOne({ email: email.value });
    if (!userDoc) return null;
    const passwordVO = Password.fromHash(userDoc.password!);
    // if (userDoc.googleId) {
    //   return new GoogleUser(
    //     userDoc.id,
    //     userDoc.name,
    //     Email.create(userDoc.email),
    //     userDoc.googleId,
    //       userDoc.role as UserRole,
    //     userDoc.status as UserStatus,
    //     userDoc.isVerified,
    //     userDoc.createdAt,
    //     userDoc.updatedAt
    //   );
    // }

    return EmailUser.create(userDoc.id, userDoc.name, email, passwordVO);
  }

  //     async findById(id: string) {
  //     const userDoc = await UserModel.findById(id);
  //     if (!userDoc) return null;
  //     return new EmailUser(
  //       userDoc.id,
  //       userDoc.name,
  //       Email.create(userDoc.email),
  //       Password.fromHash(userDoc.password!),
  //       userDoc.role as UserRole,
  //       userDoc.status as UserStatus,
  //       userDoc.isVerified,
  //       userDoc.createdAt,
  //       userDoc.updatedAt
  //     );
  //   }

  //   async findByGoogleId(googleId: string): Promise<GoogleUser | null> {
  //   const userDoc = await UserModel.findOne({ googleId });
  //   if (!userDoc || !userDoc.googleId) return null; // ✅ guard against undefined

  //   return new GoogleUser(
  //     userDoc.id,
  //     userDoc.name,
  //     Email.create(userDoc.email),
  //     userDoc.googleId, // ✅ now guaranteed to be a string
  //     userDoc.role as UserRole,
  //     userDoc.status as UserStatus,
  //     userDoc.isVerified,
  //     userDoc.createdAt,
  //     userDoc.updatedAt
  //   );
  // }

  async createUser(user: EmailUser): Promise<EmailUser> {
    await UserModel.create({
      name: user.name,
      email: user.email.value,
      password: user.password.hash,
      // password: user instanceof EmailUser ? user.password.hash : undefined,
      // googleId: user instanceof GoogleUser ? user.googleId : undefined,
      role: user.role,
      status: user.status,
      // isVerified: user.isVerified,
    });
    return user;
  }
  //  async verifyUser(userId: string): Promise<void> {
  //     await UserModel.findByIdAndUpdate(userId, {
  //       isVerified: true,
  //       status: UserStatus.ACTIVE,
  //     });
  //   }

  async findByGoogleId(googleId: string): Promise<GoogleUser | null> {
    throw new Error(`Method not implemented. ${googleId}`);
  }

  async findById(id: string): Promise<GoogleUser> {
    throw new Error(`Method not implemented. ${id}`);
  }

  async verifyUser(id: string): Promise<void> {
    throw new Error(`Method not implemented. ${id}`);
  }

  async updatePassword(id: string, newPassword: Password): Promise<void> {
    throw new Error(`Method not implemented ${id} ${newPassword}`);
  }

  async deleteUser(id: string): Promise<void> {
    throw new Error(`Method not implemented. ${id}`);
  }
}

//   async updatePassword(userId: string, password: Password): Promise<void> {
//     await UserModel.findByIdAndUpdate(userId, { password: password.hash});
//   }

//   async deleteUser(userId: string): Promise<void> {
//     await UserModel.findByIdAndDelete(userId);
//   }
// }

// async verifyUser(userId: string): Promise<void> {
//   await UserModel.findByIdAndUpdate(userId, { isVerified: true });
// }

// async findById(id: string): Promise<EmailUser | GoogleUser | null> {
//   const userDoc = await UserModel.findById(id);
//   if (!userDoc) return null;

//   if (userDoc.googleId) {
//     return new GoogleUser(
//       userDoc._id.toString(),
//       userDoc.name,
//       new Email(userDoc.email),
//       userDoc.googleId
//     );
//   }

//   return new EmailUser(
//     userDoc._id.toString(),
//     userDoc.name,
//     Email.create(userDoc.email),
//     Password.fromHash(userDoc.password!),
//     userDoc.isVerified
//   );
// }

// async findByGoogleId(googleId: string): Promise<GoogleUser | null> {
//   const userDoc = await UserModel.findOne({ googleId });
//   if (!userDoc) return null;
//   return new GoogleUser(
//     userDoc._id.toString(),
//     userDoc.name,
//     new Email(userDoc.email),
//     googleId
//   );
// }

// async createUser(
//   user: EmailUser | GoogleUser
// ): Promise<EmailUser | GoogleUser> {
//   const userDoc = await UserModel.create({
//     name: user.name,
//     email: user.email.value,
//     password: user instanceof EmailUser ? user.password.value : undefined,
//     googleId: user instanceof GoogleUser ? user.googleId : undefined,
//     isVerified: user.isVerified,
//     role: 'USER',
//   });

//   if (userDoc.googleId) {
//     return new GoogleUser(
//       userDoc._id.toString(),
//       userDoc.name,
//       new Email(userDoc.email),
//       userDoc.googleId
//     );
//   }

//   return new EmailUser(
//     userDoc._id.toString(),
//     userDoc.name,
//     new Email(userDoc.email),
//     Password.fromHash(userDoc.password!)
//   );
// }
