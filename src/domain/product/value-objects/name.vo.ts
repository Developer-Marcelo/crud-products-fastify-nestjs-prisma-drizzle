import { BadRequestException } from "@nestjs/common";

export class NameVO {
  private _value: string;

  constructor(value: string) {
    if (value.length < 3) {
      throw new BadRequestException("Name must be at least 3 characters long");
    }

    if (value.length > 120) {
      throw new BadRequestException("Name must be at most 120 characters long");
    }

    this._value = value;
  }

  get value(): string {
    return this._value;
  }
}
