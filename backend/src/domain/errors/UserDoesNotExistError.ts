import { DomainError } from './DomainError';

export class UserDoesNotExistError extends DomainError {
  constructor() {
    super('User does not exist');
  }
}
