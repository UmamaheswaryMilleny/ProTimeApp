import { DomainEvent } from "./DomainEvent.js";
import { OtpPurpose } from "../types/Auth.js";

export class OTPVerifiedEvent extends DomainEvent {
  constructor(
    public readonly userId: string,
    public readonly otpValue: string,
    public readonly purpose: OtpPurpose
  ) {
    super();
  }

  getName(): string {
    return "OTPVerifiedEvent";
  }
}

