import { ProductEntity } from "@/domain/product/entities/product.entity";
import { ProductRepositoryInterface } from "@/domain/product/repositories/product.repository.interface";
import { DrizzleService } from "@/infrastructure/drizzle/prisma.service";
import { eq } from "drizzle-orm";
import { productSchema } from "drizzle/schema.drizzle";

export class ProductRepositoryDrizzle implements ProductRepositoryInterface {
  constructor(private drizzle: DrizzleService) {}
  async create(product: ProductEntity): Promise<void> {
    const aProduct: typeof productSchema.$inferInsert = {
      id: product.id,
      name: product.name.value,
      price: product.price.value,
      quantity: 0,
    };
    await this.drizzle.getDrizzle.insert(productSchema).values(aProduct);
  }

  async update(
    id: string,
    product: Partial<ProductEntity>
  ): Promise<ProductEntity> {
    const aProduct: Partial<typeof productSchema.$inferInsert> = {
      name: product.name?.value,
      price: product.price?.value,
      quantity: product.quantity,
    };
    const updatedProduct = await this.drizzle.getDrizzle
      .update(productSchema)
      .set(aProduct)
      .where(eq(productSchema.id, id))
      .returning();

    if (!updatedProduct[0]) {
      throw new Error(`Product with id ${id} not found`);
    }
    const productEntity = ProductEntity.build(
      updatedProduct[0].id,
      updatedProduct[0].name,
      updatedProduct[0].price,
      updatedProduct[0].quantity,
      updatedProduct[0].createdAt
    );
    return productEntity;
  }

  async delete(id: string): Promise<void> {
    const deletedProduct = await this.drizzle.getDrizzle
      .delete(productSchema)
      .where(eq(productSchema.id, id))
      .returning();
    if (!deletedProduct[0]) {
      throw new Error(`Product with id ${id} not found`);
    }
  }

  async list(): Promise<ProductEntity[]> {
    const products = await this.drizzle.getDrizzle.select().from(productSchema);
    return products.map((product: typeof productSchema.$inferSelect) => {
      const productEntity = ProductEntity.build(
        product.id,
        product.name,
        product.price,
        product.quantity,
        product.createdAt
      );
      return productEntity;
    });
  }

  async findById(id: string): Promise<ProductEntity> {
    const product = await this.drizzle.getDrizzle
      .select()
      .from(productSchema)
      .where(eq(productSchema.id, id));
    if (!product[0]) {
      throw new Error(`Product with id ${id} not found`);
    }
    const productEntity = ProductEntity.build(
      product[0].id,
      product[0].name,
      product[0].price,
      product[0].quantity,
      product[0].createdAt
    );
    return productEntity;
  }
}
