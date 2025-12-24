import { ProductEntity } from "@/domain/product/entities/product.entity";
import { ProductRepositoryInterface } from "@/domain/product/repositories/product.repository.interface";

export class FindByIdProductUseCase {
  constructor(private readonly productRepository: ProductRepositoryInterface) {}

  async execute(id: string): Promise<ProductEntity> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  }
}
