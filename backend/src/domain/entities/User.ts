import { BaseEntity } from './BaseEntity';
import { Email } from '../value-objects/Email';
import { Password } from '../value-objects/Password';
import { UserRole, UserStatus } from '../enums/UserEnums';
import { OTP } from '../value-objects/OTP';
import { UserVerifiedEvent } from '../events/UserVerifiedEvent';
import { UserPasswordChangedEvent } from '../events/UserPasswordChangedEvent';
import { OTPGeneratedEvent } from '../events/OTPGeneratedEvent';

export abstract class User extends BaseEntity {
 protected _name: string;
  protected _email: Email;
  protected _role: UserRole;
  protected _status: UserStatus;
  protected _isVerified: boolean;
  protected constructor(
    id: string,
    name: string,
    email: Email,
    role: UserRole,
    status: UserStatus,
    isVerified: boolean,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(id, createdAt, updatedAt);
    this._name = name;
    this._email = email;
    this._role = role;
    this._status = status;
    this._isVerified = isVerified;
  }

  // ===== Getters =====
  get name(): string { return this._name; }
  get email(): Email { return this._email; }
  get role(): UserRole { return this._role; }
  get status(): UserStatus { return this._status; }
  get isVerified(): boolean { return this._isVerified; }

  // ===== Domain Logic =====
  verifyUser(): void {
    if (!this._isVerified) {
      this._isVerified = true;
      this._status = UserStatus.ACTIVE;
      this.addEvent(new UserVerifiedEvent(this._id, this._email));
      this.updateTimestamp();
    }
  }

  blockUser(): void {
    if (this._status !== UserStatus.BLOCKED) {
      this._status = UserStatus.BLOCKED;
       this.updateTimestamp();
    }
  }

}

export class EmailUser extends User {
  private _password: Password;

  constructor(
    id: string,
    name: string,
    email: Email,
    password: Password,
    role: UserRole = UserRole.USER,
    status: UserStatus = UserStatus.PENDING_VERIFICATION,
    isVerified = false,
    createdAt? :Date,
    updatedAt? :Date
  ) {
    super(id, name, email, role, status, isVerified, createdAt, updatedAt);
    this._password = password;
  }

  get password(): Password {
    return this._password;
  }

  changePassword(newPassword: Password): void {
    this._password = newPassword;
    this.updateTimestamp();
    this.addEvent(new UserPasswordChangedEvent(this._id, newPassword.hash));
  }

  generateOTP(otp: OTP): void {
    this.addEvent(new OTPGeneratedEvent(this._id, otp.value, otp.expiry,otp.purpose));
  }
}

export class GoogleUser extends User {
  private readonly _googleId: string;

  constructor(
    id: string,
    name: string,
    email: Email,
    googleId: string,
    role: UserRole = UserRole.USER,
    status: UserStatus = UserStatus.ACTIVE,
    isVerified = true,
    createdAt?:Date,
    updatedAt?:Date
  ) {
    super(id, name, email, role, status, isVerified, createdAt, updatedAt);
    this._googleId = googleId;
  }

  get googleId(): string {
    return this._googleId;
  }
}
