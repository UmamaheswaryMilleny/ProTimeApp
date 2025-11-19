// src/domain/errors/UnauthorizedError.ts
import { DomainError } from "./DomainError";

export class UnauthorizedError extends DomainError {
  constructor() {
    super("Access denied: Admins only.");
  }
}
