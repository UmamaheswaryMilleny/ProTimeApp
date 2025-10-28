import { DomainError } from './DomainError';

export class WeakPasswordError extends DomainError {
  constructor() {
    super('Password must include uppercase, lowercase, number, and special character');
  }
}
