export class QuantityVO {
  constructor(public readonly value: number) {
    if (value < 0) {
      throw new Error("Product quantity cannot be negative");
    }
    if (!Number.isInteger(value)) {
      throw new Error("Product quantity must be an integer");
    }
  }

  add(quantity: number): QuantityVO {
    return new QuantityVO(this.value + quantity);
  }

  subtract(quantity: number): QuantityVO {
    const newQuantity = this.value - quantity;
    if (newQuantity < 0) {
      throw new Error("Insufficient quantity");
    }
    return new QuantityVO(newQuantity);
  }
}
