import { DomainError } from './DomainError';

export class InvalidCredentialsError extends DomainError {
  constructor() {
    super('Invalid credentials');
  }
}





// export class InvalidCredentialsError extends Error {
//   constructor(email: string) {
//     super(`Invalid credential for user ${email}`);
//     this.name = 'InvalidCredentialsError';
//   }
// }
