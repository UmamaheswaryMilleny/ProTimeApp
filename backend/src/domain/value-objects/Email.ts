import { InvalidEmailError } from "../errors/InvalidEmailError";

export class Email {
  private constructor(private readonly _value: string) {} // private constructor

  // Factory method to create a valid Email
  static create(email: string): Email {
    if (!this.isValid(email)) {
      throw new InvalidEmailError(); // throw domain error if invalid
    }
    return new Email(email); // return a new instance
  }

  // Internal validation method
  private static isValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Public getter to access email string
  get value(): string {
    return this._value;
  }

  // Compare two emails by value
  equals(other: Email): boolean {
    if (!other) return false;
    return this._value === other._value;
  }
}


















// import { InvalidEmailError } from "../errors/InvalidEmailError";

// export class Email {
//   private readonly _value: string;
//   constructor(email: string) {
//     if (!this.isValid(email)) {
//       throw new InvalidEmailError()
//     }
//     this._value = email;
//   }

//   private isValid(email: string):boolean {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   }

//   get value(): string {
//     return this._value;
//   }
// }
