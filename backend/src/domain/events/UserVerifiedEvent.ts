import { DomainEvent } from "./DomainEvent";

export class UserVerifiedEvent extends DomainEvent {
  constructor(
    public readonly userId: string,
    public readonly email: string // ✅ primitive, not VO
  ) {
    super();
    Object.freeze(this);
  }

  getName(): string {
    return "UserVerifiedEvent";
  }

  toPrimitives(): Record<string, unknown> {
    return {
      ...super.toPrimitives(),
      userId: this.userId,
      email: this.email,
    };
  }
}


// import { DomainEvent } from "./DomainEvent";
// import { Email } from "../value-objects/Email";
// export class UserVerifiedEvent extends DomainEvent {
//   constructor(
//     public readonly userId: string,
//     public readonly email: Email
//   ) {
//     super();
//   }
//   getName(): string {
//     return "UserVerifiedEvent";
//   }
// }
