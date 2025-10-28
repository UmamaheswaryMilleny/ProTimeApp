import { DomainEvent } from "../events/DomainEvent";

export abstract class BaseEntity {
  protected readonly _id: string;
  protected readonly _createdAt: Date;
  protected _updatedAt: Date;
   private readonly _events: DomainEvent[] = [];

  constructor(id: string, createdAt?: Date, updatedAt?: Date) {
    this._id = id;
    this._createdAt = createdAt ?? new Date();
    this._updatedAt = updatedAt ?? new Date();
  } 

  get id(): string {
    return this._id;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  protected updateTimestamp(): void {
    this._updatedAt = new Date();
  }
    protected addEvent(event: DomainEvent): void {
    this._events.push(event);
  }

  get events(): DomainEvent[] {
    return [...this._events];
  }

  clearEvents(): void {
    this._events.length = 0;
  }
}