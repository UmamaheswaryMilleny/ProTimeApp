export abstract class DomainEvent {
  readonly occurredOn: Date;

  constructor() {
    this.occurredOn = new Date();
  }

  // This line means: Every subclass must have a getName() method that returns a string
  abstract getName(): string;
    toPrimitives(): Record<string, unknown> { return { occurredOn: this.occurredOn }}
}