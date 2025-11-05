import { DomainEvent } from "./DomainEvent";

export class UserPasswordResetRequestedEvent extends DomainEvent {
  constructor(
    public readonly userId: string,
    public readonly email: string,
    public readonly otpValue: string,
    public readonly expiresAt: string
  ) {
    super();
    Object.freeze(this);
  }

  getName(): string {
    return "UserPasswordResetRequestedEvent";
  }

  toPrimitives(): Record<string, unknown> {
    return {
      ...super.toPrimitives(),
      userId: this.userId,
      email: this.email,
      otpValue: this.otpValue,
      expiresAt: this.expiresAt,
    };
  }
}
