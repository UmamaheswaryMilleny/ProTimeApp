
import { DomainEvent } from "./DomainEvent.js";

export class UserPasswordChangedEvent extends DomainEvent {
  constructor(
    public readonly userId: string,
    public readonly hashedPassword: string
  ) {
    super();
  }

  getName(): string {
    return "UserPasswordChangedEvent";
  }
}

