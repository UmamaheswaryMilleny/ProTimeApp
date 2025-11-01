import { UserId } from '../../../domain/value-objects/UserId';

export interface IBaseRepository<T> {
  save(entity: T): Promise<void>;
  findById(id: UserId): Promise<T | null>;
  delete(id: UserId): Promise<boolean>;
}
