import { randomUUID } from "crypto";

export class UserId {
  private constructor(private readonly _value: string) {
    Object.freeze(this);
  }

  static create(id?: string): UserId {
    

    return new UserId(id ?? randomUUID());
  }

  get value(): string {
    return this._value;
  }
}
