import { randomUUID } from "crypto";

export abstract class DomainEvent {
  readonly id: string;
  readonly occurredOn: Date;

  constructor() {
    this.id = randomUUID();
    this.occurredOn = new Date();
  }

  abstract getName(): string;

  getVersion(): number {
    return 1;
  }

  toPrimitives(): Record<string, unknown> {
    return {
      id: this.id,
      name: this.getName(),
      occurredOn: this.occurredOn.toISOString(),
      version: this.getVersion(),
    };
  }
}





// export abstract class DomainEvent {
//   public readonly occurredOn: Date;

//   constructor() {
//     this.occurredOn = new Date();
//   }

//   // This line means: Every subclass must have a getName() method that returns a string
//   abstract getName(): string;
//     toPrimitives(): Record<string, unknown> { return { occurredOn: this.occurredOn }}
// }