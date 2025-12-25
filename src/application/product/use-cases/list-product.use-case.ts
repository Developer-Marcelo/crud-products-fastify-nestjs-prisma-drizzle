import { ProductEntity } from "@/domain/product/entities/product.entity";
import { ProductRepositoryInterface } from "@/domain/product/repositories/product.repository.interface";
import { ListProductDto } from "@/application/product/dtos/list-product.dto";

export class ListProductUseCase {
  constructor(private readonly productRepository: ProductRepositoryInterface) {}

  async execute(listProductDto: ListProductDto): Promise<{
    products: ProductEntity[];
    total: number;
  }> {
    return this.productRepository.list(listProductDto);
  }
}
