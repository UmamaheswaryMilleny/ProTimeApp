import { DomainError } from "./DomainError";

export class SamePasswordError extends DomainError {
  constructor() {
    super('New password cannot be the same as the old one');
  }
}


