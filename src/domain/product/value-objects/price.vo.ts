import { BadRequestException } from "@nestjs/common";

export class PriceVO {
  private _value: number;

  constructor(value: number) {
    if (value <= 0) {
      throw new BadRequestException("Price must be greater than 0");
    }
    this._value = value;
  }

  get value(): number {
    return this._value;
  }
}
