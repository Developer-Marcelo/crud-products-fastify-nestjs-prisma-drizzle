import type { ProductEntity } from "@/domain/product/entities/product.entity";

export interface ProductRepositoryInterface {
  create(product: ProductEntity): Promise<void>;
  update(id: string, product: Partial<ProductEntity>): Promise<ProductEntity>;
  delete(id: string): Promise<void>;
  list(): Promise<ProductEntity[]>;
  findById(id: string): Promise<ProductEntity>;
}
