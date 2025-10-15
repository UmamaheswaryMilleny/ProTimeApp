export class PasswordMismatchError extends Error {
  constructor() {
    super(`password and confirm password not matcch`);
    this.name = 'PasswordMismatchErro';
  }
}
