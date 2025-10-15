export class InvalidOTPError extends Error {
  constructor() {
    super(`OTP is invalid`);
    this.name = 'InvalidOTPError';
  }
}
