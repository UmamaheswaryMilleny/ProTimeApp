import { InvalidCredentialsError } from "../errors/InvalidCredentialsError";
import { WeakPasswordError } from "../errors/WeakPasswordError";

export class Password {
  private constructor(private readonly _hash: string) {
    Object.freeze(this);
  }

  /**
   * Create a Password from plain text (for new user registration)
   * Validates password strength before accepting it
   * Infrastructure layer will hash this after domain validation
   */
  static create(plainPassword: string): Password {
    if (!this.isValid(plainPassword)) {
      throw new WeakPasswordError();
    }
    // Store the plain password temporarily
    // Infrastructure will replace it with hash via fromHash()
    return new Password(plainPassword);
  }

  /**
   * Restore a Password from database hash (for existing users)
   * Skips validation since it's already hashed
   */
  static fromHash(hash: string): Password {
    if (!hash || typeof hash !== "string" || hash.length < 20) {
      throw new InvalidCredentialsError();
    }
    return new Password(hash);
  }

  /**
   * Validate password strength (domain business rule)
   * - At least 8 characters
   * - At least 1 uppercase letter
   * - At least 1 lowercase letter
   * - At least 1 number
   * - At least 1 special character (@$!%?&)
   */
  private static isValid(password: string): boolean {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  /**
   * Check if this password is already hashed (vs plain text)
   * Useful for infrastructure layer to know if hashing is needed
   */
  isHashed(): boolean {
    // Bcrypt hashes start with $2a$, $2b$, or $2y$ and are 60 chars
    return /^\$2[aby]\$\d{2}\$.{53}$/.test(this._hash);
  }

  get hash(): string {
    return this._hash;
  }

  equals(other: Password): boolean {
    if (!other) return false;
    return this._hash === other._hash;
  }
}

// import { InvalidCredentialsError } from "../errors/InvalidCredentialsError";

// export class Password {
//   private constructor(private readonly _hash: string) {
//     Object.freeze(this);
//   }

//   // Use when you already have hashed password (restore from DB)
//   static fromHash(hash: string): Password {
//     if (!hash || typeof hash !== "string" || hash.length < 20) {
//       // minimal sanity check for hash format/length; adjust per your hasher
//       throw new InvalidCredentialsError();
//     }
//     return new Password(hash);
//   }


//     private static isValid(password: string): boolean {
//     const passwordRegex =
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%*?&]{8,}$/;
//     return passwordRegex.test(password);
//   }

//   // Domain-level equality compares hashes
//   equals(other: Password): boolean {
//     if (!other) return false;
//     return this._hash === other._hash;
//   }

//   get hash(): string {
//     return this._hash;
//   }
// }










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


