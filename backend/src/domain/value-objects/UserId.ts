import { randomUUID } from "crypto";

export class UserId {
  private constructor(private readonly id: string) {}

  static create(id?: string): UserId {
    return new UserId(id ?? randomUUID());
  }

  get value(): string {
    return this.id;
  }
}
