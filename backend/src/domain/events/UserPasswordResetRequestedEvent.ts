import { DomainEvent } from "./DomainEvent";
import { Email } from "../value-objects/Email";

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
