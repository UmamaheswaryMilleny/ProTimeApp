import { DomainEvent } from "./DomainEvent";
import { UserRole } from "../enums/UserEnums";

export class UserRegisteredEvent extends DomainEvent {
  constructor(
    public readonly userId: string,
    public readonly email: string,
    public readonly role: UserRole
  ) {
    super();
    Object.freeze(this);
  }

  getName(): string {
    return "UserRegisteredEvent";
  }

  toPrimitives(): Record<string, unknown> {
    return {
      ...super.toPrimitives(),
      userId: this.userId,
      email: this.email,
      role: this.role,
    };
  }
}
