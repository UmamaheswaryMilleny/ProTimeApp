import { DomainEvent } from "./DomainEvent.js";
import { UserRole } from "../enums/UserEnums.js";

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