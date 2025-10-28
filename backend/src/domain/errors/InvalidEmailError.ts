import { DomainError } from './DomainError';

export class InvalidEmailError extends DomainError {
  constructor() {
    super('Invalid Email');
  }
}


