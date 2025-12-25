import { NameVO } from "@/domain/product/value-objects/name.vo";
import { PriceVO } from "@/domain/product/value-objects/price.vo";
import { QuantityVO } from "@/domain/product/value-objects/quantity.vo";

export class ProductEntity {
  private _id: string;
  private _name: NameVO;
  private _price: PriceVO;
  private _quantity: QuantityVO;
  private _createdAt: Date;

  constructor(
    id: string,
    name: NameVO,
    price: PriceVO,
    quantity: QuantityVO,
    createdAt: Date
  ) {
    this._id = id;
    this._name = name;
    this._price = price;
    this._quantity = quantity;
    this._createdAt = createdAt;
  }

  public static create(id: string, name: string, price: number): ProductEntity {
    const nameVO = new NameVO(name);
    const priceVO = new PriceVO(price);
    const quantityVO = new QuantityVO(0);
    return new ProductEntity(id, nameVO, priceVO, quantityVO, new Date());
  }

  public static build(
    id: string,
    name: string,
    price: number,
    quantity: number,
    createdAt: Date
  ): ProductEntity {
    const nameVO = new NameVO(name);
    const priceVO = new PriceVO(price);
    const quantityVO = new QuantityVO(quantity);
    return new ProductEntity(id, nameVO, priceVO, quantityVO, createdAt);
  }

  get id(): string {
    return this._id;
  }

  get name(): NameVO {
    return this._name;
  }

  get price(): PriceVO {
    return this._price;
  }

  get quantity(): QuantityVO {
    return this._quantity;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  buy(quantity: number): void {
    if (quantity <= 0) {
      throw new Error("Quantity must be greater than 0");
    }
    this._quantity = this._quantity.add(quantity);
  }

  sell(quantity: number): void {
    if (quantity <= 0) {
      throw new Error("Quantity must be greater than 0");
    }
    if (quantity > this._quantity.value) {
      throw new Error(
        "Quantity must be less than or equal to the available quantity"
      );
    }
    this._quantity = this._quantity.subtract(quantity);
  }

  updateName(name: NameVO): void {
    this._name = name;
  }

  updatePrice(price: PriceVO): void {
    this._price = price;
  }
}
