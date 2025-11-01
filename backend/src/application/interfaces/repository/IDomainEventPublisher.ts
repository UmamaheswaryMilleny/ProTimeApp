import { DomainEvent } from "../../../domain/events/DomainEvent";

export interface IDomainEventPublisher{
      publishEvents(events:DomainEvent[]): Promise<void>;
}