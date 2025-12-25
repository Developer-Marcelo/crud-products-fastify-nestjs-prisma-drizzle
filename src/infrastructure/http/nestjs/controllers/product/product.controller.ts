import { BuyProductDto } from "@/application/product/dtos/buy-product.dto";
import { CreateProductDto } from "@/application/product/dtos/create-product.dto";
import { SellProductDto } from "@/application/product/dtos/sell-product.dto";
import { UpdateProductDto } from "@/application/product/dtos/update-product.dto";
import { BuyProductUseCase } from "@/application/product/use-cases/buy-product.use-case";
import { CreateProductUseCase } from "@/application/product/use-cases/create-product.use-case";
import { DeleteProductUseCase } from "@/application/product/use-cases/delete-product.use-case";
import { FindByIdProductUseCase } from "@/application/product/use-cases/find-by-id-product.use.case";
import { ListProductUseCase } from "@/application/product/use-cases/list-product.use-case";
import { SellProductUseCase } from "@/application/product/use-cases/sell-product.use-case";
import { UpdateProductUseCase } from "@/application/product/use-cases/update-product.use-case";
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { ListProductNestDto } from "./dtos/list-product-nest.dto";

@Controller("products")
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase,
    private readonly findByIdProductUseCase: FindByIdProductUseCase,
    private readonly listProductUseCase: ListProductUseCase,
    private readonly sellProductUseCase: SellProductUseCase,
    private readonly buyProductUseCase: BuyProductUseCase
  ) {}

  @ApiOperation({ summary: "Create a new product" })
  @ApiResponse({
    status: 201,
    description: "Product created successfully",
    content: {
      "application/json": {
        example: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          name: "Product 1",
          price: 100.0,
          createdAt: "2023-01-01T00:00:00.000Z",
        },
      },
    },
  })
  @Post()
  async create(@Body() product: CreateProductDto) {
    const createdProduct = await this.createProductUseCase.execute(product);
    const output = {
      id: createdProduct.id,
      name: createdProduct.name.value,
      price: createdProduct.price.value,
      createdAt: createdProduct.createdAt,
    };
    return output;
  }

  @ApiOperation({ summary: "Update a product" })
  @ApiResponse({
    status: 200,
    description: "Product updated successfully",
    content: {
      "application/json": {
        example: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          name: "Product 1",
          price: 100.0,
          createdAt: "2023-01-01T00:00:00.000Z",
        },
      },
    },
  })
  @Put(":id")
  async update(@Param("id") id: string, @Body() product: UpdateProductDto) {
    try {
      const updatedProduct = await this.updateProductUseCase.execute(
        id,
        product
      );
      if (!updatedProduct) {
        throw new NotFoundException(`Product with id ${id} not found`);
      }
      const output = {
        id: updatedProduct.id,
        name: updatedProduct.name.value,
        price: updatedProduct.price.value,
        quantity: updatedProduct.quantity,
        createdAt: updatedProduct.createdAt,
      };
      return output;
    } catch (error) {
      throw new NotFoundException((error as Error).message);
    }
  }

  @ApiOperation({ summary: "Delete a product" })
  @Delete(":id")
  @HttpCode(204)
  async delete(@Param("id") id: string) {
    try {
      await this.deleteProductUseCase.execute(id);
    } catch (error) {
      throw new NotFoundException((error as Error).message);
    }
  }

  @ApiOperation({ summary: "Get a product by ID" })
  @ApiResponse({
    status: 200,
    description: "Product found successfully",
    content: {
      "application/json": {
        example: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          name: "Product 1",
          price: 100.0,
          createdAt: "2023-01-01T00:00:00.000Z",
        },
      },
    },
  })
  @Get(":id")
  async get(@Param("id") id: string) {
    try {
      const product = await this.findByIdProductUseCase.execute(id);
      const output = {
        id: product.id,
        name: product.name.value,
        price: product.price.value,
        createdAt: product.createdAt,
      };
      return output;
    } catch (error) {
      throw new NotFoundException((error as Error).message);
    }
  }

  @ApiOperation({ summary: "List all products" })
  @ApiResponse({
    status: 200,
    description: "Products listed successfully",
    content: {
      "application/json": {
        example: [
          {
            id: "123e4567-e89b-12d3-a456-426614174000",
            name: "Product 1",
            price: 100.0,
            createdAt: "2023-01-01T00:00:00.000Z",
          },
        ],
      },
    },
  })
  @Get()
  async list(@Query() listProductDto: ListProductNestDto) {
    try {
      const aProducts = await this.listProductUseCase.execute(listProductDto);
      const products = aProducts.products.map((product) => ({
        id: product.id,
        name: product.name.value,
        price: product.price.value,
        quantity: product.quantity.value,
        createdAt: product.createdAt,
      }));
      const output = {
        products,
        total: aProducts.total,
      };
      return output;
    } catch (error) {
      throw new NotFoundException((error as Error).message);
    }
  }

  @ApiOperation({ summary: "Sell a product" })
  @ApiResponse({
    status: 200,
    description: "Product sold successfully",
    content: {
      "application/json": {
        example: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          balance: 100,
        },
      },
    },
  })
  @Post("/sell")
  async sell(@Body() sellProductDto: SellProductDto) {
    try {
      const soldProduct = await this.sellProductUseCase.execute(sellProductDto);
      const output = {
        id: soldProduct.id,
        name: soldProduct.name.value,
        price: soldProduct.price.value,
        quantity: soldProduct.quantity,
        createdAt: soldProduct.createdAt,
      };
      return output;
    } catch (error) {
      throw new NotFoundException((error as Error).message);
    }
  }

  @ApiOperation({ summary: "Buy a product" })
  @ApiResponse({
    status: 200,
    description: "Product bought successfully",
    content: {
      "application/json": {
        example: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          balance: 100,
        },
      },
    },
  })
  @Post("/buy")
  async buy(@Body() buyProductDto: BuyProductDto) {
    try {
      const boughtProduct = await this.buyProductUseCase.execute(buyProductDto);
      const output = {
        id: boughtProduct.id,
        name: boughtProduct.name.value,
        price: boughtProduct.price.value,
        quantity: boughtProduct.quantity,
        createdAt: boughtProduct.createdAt,
      };
      return output;
    } catch (error) {
      throw new NotFoundException((error as Error).message);
    }
  }
}
