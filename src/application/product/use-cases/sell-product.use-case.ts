import { ProductRepositoryInterface } from "@/domain/product/repositories/product.repository.interface";
import { SellProductDto } from "@/application/product/dtos/sell-product.dto";
import { ProductEntity } from "@/domain/product/entities/product.entity";

export class SellProductUseCase {
  constructor(private readonly productRepository: ProductRepositoryInterface) {}

  async execute(sellProductDto: SellProductDto): Promise<ProductEntity> {
    const product = await this.productRepository.findById(sellProductDto.id);
    if (!product) {
      throw new Error("Product not found");
    }
    product.sell(sellProductDto.quantity);

    await this.productRepository.update(product.id, {
      quantity: product.quantity,
    });
    return product;
  }
}
