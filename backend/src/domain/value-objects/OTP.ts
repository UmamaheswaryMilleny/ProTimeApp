import { InvalidOTPError } from "../errors/InvalidOTPError";
import { OtpPurpose } from "../enums/UserEnums";

export class OTP {
  private constructor(
    private readonly _code: string,
    private readonly _expiresAt: Date,
    private readonly _purpose: OtpPurpose
  ) {}

  static create(code: string, expiresAt: Date, purpose: OtpPurpose): OTP {
    if (!this.isValid(code)) throw new InvalidOTPError();
    if (this.isExpired(expiresAt)) throw new InvalidOTPError();
    return new OTP(code, expiresAt, purpose);
  }

  private static isValid(code: string): boolean {
    return /^[0-9]{6}$/.test(code);
  }

  private static isExpired(expiresAt: Date): boolean {
    return expiresAt.getTime() < Date.now();
  }

  get value(): string {
    return this._code;
  }

  get expiry(): Date {
    return this._expiresAt;
  }

  get purpose(): OtpPurpose {
    return this._purpose;
  }

  equals(other: OTP): boolean {
    return this._code === other._code && this._purpose === other._purpose;
  }

  isCurrentlyExpired(): boolean {
    return this._expiresAt.getTime() < Date.now();
  }
}







// export class OTP {
//   private readonly _code: string;
//   private readonly _expiresAt: Date;

//   constructor(code: string, expiresAt: Date) {
//     if (!this.isValid(code)) throw new Error('OTP must be a 6 didgit number');
//     if (this.isExpired(expiresAt)) {
//       throw new Error('OTP is  already expired');
//     }
//     this._code = code;
//     this._expiresAt = expiresAt;
//   }

//   private isValid(code: string): boolean {
//     return /^[0-9]{6}$/.test(code);
//   }
//   private isExpired(expiresAt: Date): boolean {
//     return expiresAt.getTime() < Date.now();
//   }
//   get value(): string {
//     return this._code;
//   }
//   get expiry(): Date {
//     return this._expiresAt;
//   }
// }
