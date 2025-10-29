import { DomainEvent } from "./DomainEvent";
import { OtpPurpose } from "../enums/UserEnums";

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

