import { DomainError } from './DomainError';

export class UserAlreadyExistError extends DomainError {
  constructor() {
    super('User already exists');
  }
}

