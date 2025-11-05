import { BaseEntity } from './BaseEntity';
import { Email } from '../value-objects/Email';
import { Password } from '../value-objects/Password';
import { UserRole, UserStatus } from '../enums/UserEnums';
import { OTP } from '../value-objects/OTP';
import { UserVerifiedEvent } from '../events/UserVerifiedEvent';
import { UserPasswordChangedEvent } from '../events/UserPasswordChangedEvent';
import { OTPGeneratedEvent } from '../events/OTPGeneratedEvent';
import { UserId } from '../value-objects/UserId';
import { GoogleIdError } from '../errors/GoogleIdError';
import { InvalidUserNameError } from '../errors/InvalidUserNameError';
import { SamePasswordError } from '../errors/SamePasswordError';
import { Provider } from '../enums/UserEnums';


export abstract class User extends BaseEntity {
 protected _name: string;
  protected _email: Email;
  protected _role: UserRole;
  protected _status: UserStatus;
  protected _isVerified: boolean;
  protected _provider: Provider;
  
  protected constructor(
    id: UserId,
    name: string,
    email: Email,
    role: UserRole,
    status: UserStatus,
    isVerified: boolean,
    provider:Provider,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(id, createdAt, updatedAt);
    this._name = name;
    this._email = email;
    this._role = role;
    this._status = status;
    this._isVerified = isVerified;
    this._provider=provider;
  }


  get name(): string { return this._name; }
  get email(): Email { return this._email; }
  get role(): UserRole { return this._role; }
  get status(): UserStatus { return this._status; }
  get isVerified(): boolean { return this._isVerified; }
  get provider(): Provider { return this._provider; }


  verifyUser(): void {
    if (!this._isVerified) {
      this._isVerified = true;
      this._status = UserStatus.ACTIVE;
      this.addEvent(new UserVerifiedEvent(this._id.value, this._email));
      this.touch();

    }
  }

  blockUser(): void {
    if (this._status !== UserStatus.BLOCKED) {
      this._status = UserStatus.BLOCKED;
       this.touch();

    }
  }

}

export class EmailUser extends User {
  private _password: Password;

  private constructor( 
    id: UserId,
    name: string,
    email: Email,
    password: Password,
    role: UserRole = UserRole.USER,
    status: UserStatus = UserStatus.PENDING_VERIFICATION,
    isVerified = false,
    provider:Provider=Provider.LOCAL,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(id, name, email, role, status, isVerified,provider, createdAt, updatedAt);
    this._password = password;
  }

  static create(id: UserId, name: string, email: Email, password: Password): EmailUser {
    if (!name || name.trim().length < 2) {
      throw new InvalidUserNameError()
    }

    return new EmailUser(id, name.trim(), email, password);
  }


  static restore(
    id: UserId,
    name: string,
    email: Email,
    password: Password,
    role: UserRole,
    status: UserStatus,
    isVerified: boolean,
    provider: Provider,
    createdAt?: Date,
    updatedAt?: Date
  ): EmailUser {
    return new EmailUser(id, name, email, password, role, status, isVerified, provider, createdAt, updatedAt);
  }



  get password(): Password {
    return this._password;
  }

  changePassword(newPassword: Password): void {
      if (this._password.equals(newPassword)) {
    throw new SamePasswordError();
  }
    this._password = newPassword;
   this.touch();
    this.addEvent(new UserPasswordChangedEvent(this._id.value, newPassword.hash));
  }

  generateOTP(otp: OTP): void {
    this.addEvent(new OTPGeneratedEvent(this._id.value, otp.value, otp.expiry, otp.purpose));
  }
}


export class GoogleUser extends User {
  private readonly _googleId: string;

  private constructor(
    id: UserId,
    name: string,
    email: Email,
    googleId: string,
    role: UserRole = UserRole.USER,
    status: UserStatus = UserStatus.ACTIVE,
    isVerified = true,
    provider:Provider=Provider.GOOGLE,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(id, name, email, role, status, isVerified, provider,createdAt, updatedAt);
    this._googleId = googleId;
  }

  static create(id: UserId, name: string, email: Email, googleId: string): GoogleUser {
    if (!name || name.trim().length < 2) {
      throw new InvalidUserNameError()
    }
    if (!googleId) {
      throw new GoogleIdError()
    }
    return new GoogleUser(id, name.trim(), email, googleId);
  }

  get googleId(): string {
    return this._googleId;
  }
}
