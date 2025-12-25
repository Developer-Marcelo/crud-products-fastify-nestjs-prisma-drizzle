import type { ProductRepositoryInterface } from "@/domain/product/repositories/product.repository.interface";
import { PrismaService } from "@/infrastructure/prisma/prisma.service";
import { ProductEntity } from "@/domain/product/entities/product.entity";
import { Prisma } from "@/infrastructure/prisma/generated/prisma/client";
import type { Product as PrismaProduct } from "@/infrastructure/prisma/generated/prisma/client";
import { ListProductDto } from "@/application/product/dtos/list-product.dto";

export class ProductRepositoryPrisma implements ProductRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}
  async create(product: ProductEntity): Promise<void> {
    const data: Prisma.ProductCreateInput = {
      id: product.id,
      name: product.name.value,
      price: product.price.value,
      quantity: 0,
    };
    await this.prisma.product.create({
      data,
    });
  }
  async update(
    id: string,
    product: Partial<ProductEntity>
  ): Promise<ProductEntity> {
    try {
      const updatedProduct = await this.prisma.product.update({
        where: {
          id,
        },
        data: {
          name: product.name?.value,
          price: product.price?.value,
          quantity: product.quantity?.value,
        },
      });
      const productEntity = ProductEntity.build(
        updatedProduct.id,
        updatedProduct.name,
        updatedProduct.price,
        updatedProduct.quantity,
        updatedProduct.createdAt
      );
      return productEntity;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new Error(`Product with id ${id} not found`);
      }
      throw error;
    }
  }
  async delete(id: string): Promise<void> {
    try {
      await this.prisma.product.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new Error(`Product with id ${id} not found`);
      }
      throw error;
    }
  }

  async list(
    listProductDto: ListProductDto
  ): Promise<{ products: ProductEntity[]; total: number }> {
    const aProducts = await this.prisma.product.findMany({
      skip: (listProductDto.page - 1) * listProductDto.limit,
      take: listProductDto.limit,
    });
    const total = await this.prisma.product.count();
    const products = aProducts.map((product: PrismaProduct) => {
      const productEntity = ProductEntity.build(
        product.id,
        product.name,
        product.price,
        product.quantity,
        product.createdAt
      );
      return productEntity;
    });
    return {
      products: products,
      total: total,
    };
  }

  async findById(id: string): Promise<ProductEntity> {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },
    });
    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }
    const productEntity = ProductEntity.build(
      product.id,
      product.name,
      product.price,
      product.quantity,
      product.createdAt
    );
    return productEntity;
  }
}
