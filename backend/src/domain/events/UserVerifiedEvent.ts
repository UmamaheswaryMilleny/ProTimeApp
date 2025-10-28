import { DomainEvent } from "./DomainEvent.js";
import { Email } from "../value-objects/Email.js";
export class UserVerifiedEvent extends DomainEvent {
  constructor(
    public readonly userId: string,
    public readonly email: Email
  ) {
    super();
  }
  getName(): string {
    return "UserVerifiedEvent";
  }
}
