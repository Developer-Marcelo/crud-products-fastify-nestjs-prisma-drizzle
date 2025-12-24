import { ProductRepositoryInterface } from "@/domain/product/repositories/product.repository.interface";
import { BuyProductDto } from "@/application/product/dtos/buy-product.dto";
import { ProductEntity } from "@/domain/product/entities/product.entity";

export class BuyProductUseCase {
  constructor(private readonly productRepository: ProductRepositoryInterface) {}

  async execute(buyProductDto: BuyProductDto): Promise<ProductEntity> {
    const product = await this.productRepository.findById(buyProductDto.id);
    if (!product) {
      throw new Error("Product not found");
    }
    product.buy(buyProductDto.quantity);
    await this.productRepository.update(product.id, {
      quantity: product.quantity,
    });
    return product;
  }
}
