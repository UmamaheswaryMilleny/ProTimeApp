export class Password {
  private readonly _value: string;
  constructor(password: string) {
   if(!this.isValid(password)) throw new Error("Password must include uppercase, lowercase, number, and special character")
    this._value = password;
  }

  private isValid(password: string): boolean {
      const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%*?&]{8,}$/;

    return passwordRegex.test(password)
  }

  get value():string{
   return this._value
  }
}
