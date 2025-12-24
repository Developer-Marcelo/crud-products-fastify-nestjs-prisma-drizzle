import type { CreateProductDto } from "@/application/product/dtos/create-product.dto";
import { ProductEntity } from "@/domain/product/entities/product.entity";
import { uuidv7 } from "uuidv7";
import { ProductRepositoryInterface } from "@/domain/product/repositories/product.repository.interface";

export class CreateProductUseCase {
  constructor(private readonly productRepository: ProductRepositoryInterface) {}
  async execute(data: CreateProductDto): Promise<ProductEntity> {
    const product = ProductEntity.create(uuidv7(), data.name, data.price);
    await this.productRepository.create(product);
    return product;
  }
}
