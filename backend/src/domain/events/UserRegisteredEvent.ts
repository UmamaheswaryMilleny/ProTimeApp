import { DomainEvent } from "./DomainEvent";
import { UserRole } from "../enums/UserEnums";

export class UserRegisteredEvent extends DomainEvent {
  constructor(
    public readonly userId: string,
    public readonly email: string,
    public readonly role: UserRole
  ) {
    super();
  }

  getName(): string {
    return "UserRegisteredEvent";
  }
}