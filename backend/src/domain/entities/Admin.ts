// // src/domain/entities/Admin.ts
// import { BaseEntity } from "./BaseEntity";
// import { Email } from "../value-objects/Email";
// import { Password } from "../value-objects/Password";
// import { UserId } from "../value-objects/UserId";
// import { UserRole } from "../enums/UserEnums";
// import { SamePasswordError } from "../errors/SamePasswordError";
// import { UserPasswordChangedEvent } from "../events/UserPasswordChangedEvent";

// export class Admin extends BaseEntity {
//   private _name: string;
//   private _email: Email;
//   private _password: Password;
//   private _role: UserRole;

//   private constructor(
//     id: UserId,
//     name: string,
//     email: Email,
//     password: Password,
//     role: UserRole = UserRole.ADMIN
//   ) {
//     super(id);
//     this._name = name;
//     this._email = email;
//     this._password = password;
//     this._role = role;
//   }

//   static create(id: UserId, name: string, email: Email, password: Password): Admin {
//     return new Admin(id, name, email, password);
//   }

//   static restore(
//     id: UserId,
//     name: string,
//     email: Email,
//     password: Password,
//     role: UserRole = UserRole.ADMIN
//   ): Admin {
//     return new Admin(id, name, email, password, role);
//   }

//   get name() {
//     return this._name;
//   }

//   get email() {
//     return this._email;
//   }

//   get password() {
//     return this._password;
//   }

//   get role() {
//     return this._role;
//   }

//   changePassword(newPassword: Password): void {
//     if (this._password.equals(newPassword)) {
//       throw new SamePasswordError();
//     }
//     this._password = newPassword;
//     this.touch();
//     this.addEvent(new UserPasswordChangedEvent(this._id.value, newPassword.hash));
//   }
// }
