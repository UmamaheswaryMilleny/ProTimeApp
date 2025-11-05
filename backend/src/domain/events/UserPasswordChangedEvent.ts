import { DomainEvent } from "./DomainEvent";

export class UserPasswordChangedEvent extends DomainEvent {
  constructor(
    public readonly userId: string,
    public readonly hashedPassword: string
  ) {
    super();
    Object.freeze(this);
  }

  getName(): string {
    return "UserPasswordChangedEvent";
  }

  toPrimitives(): Record<string, unknown> {
    return {
      ...super.toPrimitives(),
      userId: this.userId,
      hashedPassword: this.hashedPassword,
    };
  }
}


