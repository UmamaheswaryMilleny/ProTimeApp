export class OTP {
  private readonly _code: string;
  private readonly _expiresAt: Date;

  constructor(code: string, expiresAt: Date) {
    if (!this.isValid(code)) throw new Error('OTP must be a 6 didgit number');
    if (this.isExpired(expiresAt)) {
      throw new Error('OTP is  already expired');
    }
    this._code = code;
    this._expiresAt = expiresAt;
  }

  private isValid(code: string): boolean {
    return /^[0-9]{6}$/.test(code);
  }
  private isExpired(expiresAt: Date): boolean {
    return expiresAt.getTime() < Date.now();
  }
  get Value(): string {
    return this._code;
  }
  get expiry(): Date {
    return this._expiresAt;
  }
}
