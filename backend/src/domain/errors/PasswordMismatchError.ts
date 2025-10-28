import { DomainError } from './DomainError';

export class PasswordMismatchError extends DomainError {
  constructor() {
    super('Password does not match');
  }
}
