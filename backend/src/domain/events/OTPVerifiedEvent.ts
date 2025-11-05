import { DomainEvent } from "./DomainEvent";
import { OtpPurpose } from "../enums/UserEnums";

export class OTPVerifiedEvent extends DomainEvent {
  constructor(
    public readonly userId: string,
    public readonly otpValue: string,
    public readonly purpose: OtpPurpose
  ) {
    super();
    Object.freeze(this);
  }

  getName(): string {
    return "OTPVerifiedEvent";
  }

  toPrimitives(): Record<string, unknown> {
    return {
      ...super.toPrimitives(),
      userId: this.userId,
      otpValue: this.otpValue,
      purpose: this.purpose,
    };
  }
}
