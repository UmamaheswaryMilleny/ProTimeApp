import { WeakPasswordError } from "../errors/WeakPasswordError";

export class Password {
  private constructor(private readonly _hash: string) {}

  static create(hash: string): Password {
    if (!this.isValid(hash)) {
      throw new WeakPasswordError()
    }
    return new Password(hash);
  }

  //Used when you load an existing user from the database.
  static fromHash(hash: string): Password {
    return new Password(hash);
  }

  private static isValid(password: string): boolean {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  get hash(): string {
    return this._hash
  }
  equals(other: Password): boolean {
   return !!other && this._hash === other._hash;
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
