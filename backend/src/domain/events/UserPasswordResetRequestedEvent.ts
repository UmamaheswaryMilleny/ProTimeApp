import { DomainEvent } from "./DomainEvent.js";
import { Email } from "../value-objects/Email.js";

export class UserPasswordResetRequestedEvent extends DomainEvent {
  constructor(
    public readonly userId: string,
    public readonly email: Email,
    public readonly otpValue: string,
    public readonly expiresAt: Date
  ) {
    super();
  }

  getName(): string {
    return "UserPasswordResetRequestedEvent";
  }
}
