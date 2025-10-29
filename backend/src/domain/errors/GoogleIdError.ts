import { DomainError } from './DomainError';

export class GoogleIdError extends DomainError {
  constructor() {
    super('Google ID is required for GoogleUser creation.');
  }
}

