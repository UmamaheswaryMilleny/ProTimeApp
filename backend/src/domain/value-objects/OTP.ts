import { InvalidOTPError } from "../errors/InvalidOTPError";
import { OtpPurpose } from "../enums/UserEnums";
import { OtpExpiredError } from "../errors/OtpExpiredError";

export class OTP {
  private constructor(
    private readonly _code: string,
    private readonly _expiresAt: Date,
    private readonly _purpose: OtpPurpose
  ) {}

  static create(code: string, expiresAt: Date, purpose: OtpPurpose): OTP {
    if (!this.isValid(code)) throw new InvalidOTPError();
    if (this.isExpired(expiresAt)) throw new OtpExpiredError();
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


