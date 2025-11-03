import { IDomainEventPublisher } from "../../application/interfaces/repository/IDomainEventPublisher";
import { DomainEvent } from "../../domain/events/DomainEvent";
import { ILogger } from "../../application/interfaces/ILogger";

export class DomainEventPublisher implements IDomainEventPublisher{
    constructor(private logger:ILogger){}
    async publishEvents(events: DomainEvent[]): Promise<void> {
        for(const event of events){
            this.logger.info(`Domain Event Published; ${event.getName()}`)
        }
    }
}