import { InvalidCredentialsError } from "../errors/InvalidCredentialsError";

export class Password {
  private constructor(private readonly _hash: string) {
    Object.freeze(this);
  }

  // Use when you already have hashed password (restore from DB)
  static fromHash(hash: string): Password {
    if (!hash || typeof hash !== "string" || hash.length < 20) {
      // minimal sanity check for hash format/length; adjust per your hasher
      throw new InvalidCredentialsError();
    }
    return new Password(hash);
  }

  // Domain-level equality compares hashes
  equals(other: Password): boolean {
    if (!other) return false;
    return this._hash === other._hash;
  }

  get hash(): string {
    return this._hash;
  }
}










// import { WeakPasswordError } from "../errors/WeakPasswordError";

// export class Password {
//   private constructor(private readonly _hash: string) {}

//   static create(hash: string): Password {
//     if (!this.isValid(hash)) {
//       throw new WeakPasswordError()
//     }
//     return new Password(hash);
//   }

//   //Used when you load an existing user from the database.
//   static fromHash(hash: string): Password {
//     return new Password(hash);
//   }

//   private static isValid(password: string): boolean {
//     const passwordRegex =
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%*?&]{8,}$/;
//     return passwordRegex.test(password);
//   }

//   get hash(): string {
//     return this._hash
//   }
//   equals(other: Password): boolean {
//    return !!other && this._hash === other._hash;
//   }
// }


