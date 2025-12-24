import { CreateProductUseCase } from "@/application/product/use-cases/create-product.use-case";
import { UpdateProductUseCase } from "@/application/product/use-cases/update-product.use-case";
import { ProductController } from "@/infrastructure/http/nestjs/controllers/product/product.controller";
import { DeleteProductUseCase } from "@/application/product/use-cases/delete-product.use-case";
import { FindByIdProductUseCase } from "@/application/product/use-cases/find-by-id-product.use.case";
import { ListProductUseCase } from "@/application/product/use-cases/list-product.use-case";
import { SellProductUseCase } from "@/application/product/use-cases/sell-product.use-case";
import { Module } from "@nestjs/common";
import { BuyProductUseCase } from "@/application/product/use-cases/buy-product.use-case";
import { ProductRepositoryInterface } from "@/domain/product/repositories/product.repository.interface";
import { RepositoryModule } from "@/infrastructure/http/nestjs/modules/product/repository.module";

const useCaseProviders = [
  CreateProductUseCase,
  UpdateProductUseCase,
  DeleteProductUseCase,
  FindByIdProductUseCase,
  SellProductUseCase,
  BuyProductUseCase,
  ListProductUseCase,
].map((useCase) => ({
  provide: useCase,
  useFactory: (repo: ProductRepositoryInterface) => new useCase(repo),
  inject: ["ProductRepositoryInterface"],
}));

@Module({
  imports: [RepositoryModule],
  controllers: [ProductController],
  providers: [...useCaseProviders],
})
export class ProductModule {}
