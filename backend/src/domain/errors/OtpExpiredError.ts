export class OtpExpiredError extends Error {
  constructor() {
    super(`OTP expired`);
    this.name = 'OtpExpiredError';
  }
}
