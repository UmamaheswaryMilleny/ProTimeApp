import { DomainError } from './DomainError';

export class InvalidOTPError extends DomainError {
  constructor() {
    super('Invalid OTP');
  }
}


