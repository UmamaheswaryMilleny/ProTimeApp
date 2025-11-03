import type { Model } from "mongoose";

export class BaseRepository<T> {
  constructor(protected model: Model<T>) {}

  async save(data:T): Promise<void> {
    await this.model.create(data)
  }

  async findById(id: string): Promise<T | null> {
    return await this.model.findById(id).exec();
  }
  async delete(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id).exec();
    return !result;
  }

}