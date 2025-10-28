import { DomainEvent } from "./DomainEvent.js";
import { OtpPurpose } from "../types/Auth.js";

export class OTPGeneratedEvent extends DomainEvent {
  constructor(
    public readonly userId: string,
    public readonly otpValue: string,
    public readonly expiresAt: Date,
    public readonly purpose: OtpPurpose
  ) {
    super();
  }

  getName(): string {
    return "OTPGeneratedEvent";
  }
}
