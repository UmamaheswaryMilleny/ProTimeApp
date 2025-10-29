import { DomainEvent } from "./DomainEvent";
import { Email } from "../value-objects/Email";
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
