// import { User } from "../entities/User";
// import { Email } from "../value-objects/Email";
// import { Password } from "../value-objects/Password";
// import { OTP } from "../value-objects/OTP";
// import { PasswordMismatchError, InvalidOTPError } from "../errors";

// export class UserAggregate {
//   private user: User;
//   private otp?: OTP;

//   constructor(user: User) {
//     this.user = user;
//   }

//   // Register new user
//   public static register(
//     id: string,
//     name: string,
//     email: Email,
//     password: Password,
//     confirmPassword: Password
//   ): UserAggregate {
//     if (!password.compare(confirmPassword.value)) {
//       throw new PasswordMismatchError(confirmPassword.value);
//     }

//     const user: User = {
//       id,
//       name,
//       email: email.value,
//       passwordHash: password.value, // hash in infrastructure layer
//       createdAt: new Date(),
//       isVerified: false,
//       role: 'User',
//     };

//     return new UserAggregate(user);
//   }

//   // Generate OTP
//   public generateOtp(value: string, expiresAt: Date) {
//     this.otp = new OTP(value, expiresAt);
//   }

//   // Verify OTP
//   public verifyOtp(value: string) {
//     if (!this.otp || this.otp.value !== value) throw new InvalidOTPError(value);
//     this.user.isVerified = true;
//     this.otp = undefined; // clear OTP after verification
//   }

//   // Accessors
//   public getUser() {
//     return this.user;
//   }
// }

// public static register(
//   id: string,
//   name: string,
//   email: Email,
//   password: Password,
//   confirmPassword: Password
// ): UserAggregate {
//   if (password.value !== confirmPassword.value) {
//     throw new PasswordMismatchError();
//   }

//   // Use the domain entity’s factory method to ensure consistency
//   const user = User.createNew(id, name, email, password);

//   return new UserAggregate(user);
// }
