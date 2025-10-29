
import { DomainEvent } from "./DomainEvent";

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

