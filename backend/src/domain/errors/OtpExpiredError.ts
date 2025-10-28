import { DomainError } from './DomainError';

export class OtpExpiredError extends DomainError {
  constructor() {
    super('OTP has expired');
  }
}
