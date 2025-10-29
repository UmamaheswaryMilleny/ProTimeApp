import { DomainError } from './DomainError';

export class InvalidUserNameError extends DomainError {
  constructor() {
    super('User name must be at least 2 characters long.');
  }
}


