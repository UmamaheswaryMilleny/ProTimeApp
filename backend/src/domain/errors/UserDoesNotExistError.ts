export class UserDoesNotExistError extends Error {
  constructor(email: string) {
    super(`A user with email "${email}" not exists`);
    this.name = 'UserDoesNotExistError';
  }
}
