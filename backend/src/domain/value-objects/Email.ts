export class Email {
  private readonly _value: string;
  constructor(email: string) {
    if (!this.isValid(email)) {
      throw new Error('Invalid email.');
    }
    this._value = email;
  }

  private isValid(email: string):boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  get value(): string {
    return this._value;
  }
}
