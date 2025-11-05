import { DomainEvent } from "./DomainEvent";
import { OtpPurpose } from "../enums/UserEnums";

export class OTPGeneratedEvent extends DomainEvent {
  constructor(
    public readonly userId: string,
    public readonly otpValue: string,
    public readonly expiresAt: Date,
    public readonly purpose: OtpPurpose
  ) {
    super();
    Object.freeze(this);
  }

  getName(): string {
    return "OTPGeneratedEvent";
  }

  toPrimitives(): Record<string, unknown> {
    return {
      ...super.toPrimitives(),
      userId: this.userId,
      otpValue: this.otpValue,
      expiresAt: this.expiresAt,
      purpose: this.purpose,
    };
  }
}
