// // src/infrastructure/database/repositories/AdminRepository.ts
// import { Model } from "mongoose";
// import { IAdminModel } from "../Models/adminModel";
// import { Admin } from "../../../domain/entities/Admin";
// import { IAdminRepository } from "../../../application/interfaces/repository/IAdminRepository";
// import { Email } from "../../../domain/value-objects/Email";
// import { UserId } from "../../../domain/value-objects/UserId";
// import { Password } from "../../../domain/value-objects/Password";
// import { UserRole } from "../../../domain/enums/UserEnums";

// export class AdminRepository implements IAdminRepository {
//   constructor(private readonly model: Model<IAdminModel>) {}

//   async findByEmail(email: Email): Promise<Admin | null> {
//     const doc = await this.model.findOne({ email: email.value }).exec();
//     if (!doc) return null;
//     return Admin.restore(
//       UserId.create(doc.id),
//       doc.name,
//       Email.create(doc.email),
//       Password.fromHash(doc.password),
//       doc.role as UserRole
//     );
//   }

//   async save(admin: Admin): Promise<void> {
//     const data = {
//       id: admin.id.value,
//       name: admin.name,
//       email: admin.email.value,
//       password: admin.password.hash,
//       role: admin.role,
//     };
//     await this.model.findOneAndUpdate({ id: data.id }, data, {
//       upsert: true,
//       new: true,
//     });
//   }
// }
