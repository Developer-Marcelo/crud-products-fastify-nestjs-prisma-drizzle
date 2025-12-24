import { ProductEntity } from "@/domain/product/entities/product.entity";
import { ProductRepositoryInterface } from "@/domain/product/repositories/product.repository.interface";

export class ListProductUseCase {
  constructor(private readonly productRepository: ProductRepositoryInterface) {}

  async execute(): Promise<ProductEntity[]> {
    return this.productRepository.list();
  }
}
