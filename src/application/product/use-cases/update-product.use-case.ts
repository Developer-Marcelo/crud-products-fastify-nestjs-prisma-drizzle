import { ProductRepositoryInterface } from "@/domain/product/repositories/product.repository.interface";
import { UpdateProductDto } from "@/application/product/dtos/update-product.dto";
import { ProductEntity } from "@/domain/product/entities/product.entity";
import { NameVO } from "@/domain/product/value-objects/name.vo";
import { PriceVO } from "@/domain/product/value-objects/price.vo";
import { QuantityVO } from "@/domain/product/value-objects/quantity.vo";

export class UpdateProductUseCase {
  constructor(private readonly productRepository: ProductRepositoryInterface) {}

  async execute(id: string, data: UpdateProductDto): Promise<ProductEntity> {
    const aProduct = await this.productRepository.findById(id);
    if (!aProduct) {
      throw new Error("Product not found");
    }

    const updateData: {
      name?: NameVO;
      price?: PriceVO;
      quantity?: QuantityVO;
    } = {};

    if (data.name) {
      const name = new NameVO(data.name);
      updateData.name = name;
    }
    if (data.price) {
      const price = new PriceVO(data.price);
      updateData.price = price;
    }
    if (data.quantity) {
      const quantity = new QuantityVO(data.quantity);
      updateData.quantity = quantity;
    }
    const product = await this.productRepository.update(id, updateData);
    return product;
  }
}
