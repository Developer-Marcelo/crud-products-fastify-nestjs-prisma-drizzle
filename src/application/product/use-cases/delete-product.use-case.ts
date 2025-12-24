import { ProductRepositoryInterface } from "@/domain/product/repositories/product.repository.interface";

export class DeleteProductUseCase {
  constructor(private readonly productRepository: ProductRepositoryInterface) {}

  async execute(id: string): Promise<void> {
    await this.productRepository.delete(id);
  }
}
