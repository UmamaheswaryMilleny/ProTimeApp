// src/domain/value-objects/Password.ts
import { WeakPasswordError } from "../errors/WeakPasswordError";

export class Password {
  private constructor(private readonly _value: string) {}

  // When user registers or resets password (plain text)
  static create(raw: string): Password {
    if (!this.isValid(raw)) {
      throw new WeakPasswordError()
    }
    return new Password(raw);
  }

  // When loading hashed password from DB
  static fromHash(hash: string): Password {
    return new Password(hash);
  }

  private static isValid(password: string): boolean {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  get hash(): string {
    return this._value;
  }
  equals(other: Password): boolean {
    if (!other) return false;
    return this._value === other._value;
  }
}




// export class Password {
//   private readonly _value: string;
//   constructor(password: string) {
//     if (!this.isValid(password))
//       throw new Error(
//         'Password must include uppercase, lowercase, number, and special character'
//       );
//     this._value = password;
//   }

//   private isValid(password: string): boolean {
//     const passwordRegex =
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%*?&]{8,}$/;

//     return passwordRegex.test(password);
//   }

//   get value(): string {
//     return this._value;
//   }
// }
