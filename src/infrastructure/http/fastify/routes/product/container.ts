import { BuyProductUseCase } from "@/application/product/use-cases/buy-product.use-case";
import { CreateProductUseCase } from "@/application/product/use-cases/create-product.use-case";
import { DeleteProductUseCase } from "@/application/product/use-cases/delete-product.use-case";
import { FindByIdProductUseCase } from "@/application/product/use-cases/find-by-id-product.use.case";
import { ListProductUseCase } from "@/application/product/use-cases/list-product.use-case";
import { SellProductUseCase } from "@/application/product/use-cases/sell-product.use-case";
import { UpdateProductUseCase } from "@/application/product/use-cases/update-product.use-case";
import { ProductRepositoryInterface } from "@/domain/product/repositories/product.repository.interface";

export class ContainerProduct {
  constructor(private readonly orm: ProductRepositoryInterface) {}

  createProductUseCase() {
    return new CreateProductUseCase(this.orm);
  }

  updateProductUseCase() {
    return new UpdateProductUseCase(this.orm);
  }

  deleteProductUseCase() {
    return new DeleteProductUseCase(this.orm);
  }

  findProductByIdUseCase() {
    return new FindByIdProductUseCase(this.orm);
  }

  listProductUseCase() {
    return new ListProductUseCase(this.orm);
  }

  sellProductUseCase() {
    return new SellProductUseCase(this.orm);
  }

  buyProductUseCase() {
    return new BuyProductUseCase(this.orm);
  }
}
