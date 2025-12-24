import "dotenv/config";
import { CreateProductDto } from "@/application/product/dtos/create-product.dto";
import { FastifyInstance } from "fastify";
import { ContainerProduct } from "@/infrastructure/http/fastify/routes/product/container";
import { SellProductDto } from "@/application/product/dtos/sell-product.dto";
import { BuyProductDto } from "@/application/product/dtos/buy-product.dto";

export class routesProduct {
  constructor(
    private readonly app: FastifyInstance,
    private readonly containerProduct: ContainerProduct
  ) {}

  private create = async () => {
    this.app.post(
      "/products",
      {
        schema: {
          tags: ["Products"],
          body: {
            required: ["name", "price"],
            type: "object",
            properties: {
              name: { type: "string" },
              price: { type: "number", minimum: 1 },
            },
          },
          response: {
            201: {
              description: "Product created successfully",
            },
          },
        },
      },
      async (request, reply) => {
        const aProduct: CreateProductDto = request.body as CreateProductDto;
        const createProductUseCase =
          this.containerProduct.createProductUseCase();
        const createdProduct = await createProductUseCase.execute(aProduct);

        const output = {
          id: createdProduct.id,
          name: createdProduct.name.value,
          price: createdProduct.price.value,
          createdAt: createdProduct.createdAt,
        };
        reply.send(output);
      }
    );
  };

  private update = async () => {
    this.app.put(
      "/products/:id",
      {
        schema: {
          tags: ["Products"],
          params: {
            required: ["id"],
            type: "object",
            properties: {
              id: { type: "string" },
            },
          },
          body: {
            type: "object",
            properties: {
              name: { type: "string" },
              price: { type: "number", minimum: 1 },
            },
          },
          response: {
            200: {
              description: "Product updated successfully",
            },
            404: {
              description: "Product not found",
            },
          },
        },
      },
      async (request, reply) => {
        try {
          const { id } = request.params as { id: string };
          const aProduct: CreateProductDto = request.body as CreateProductDto;
          const updateProductUseCase =
            this.containerProduct.updateProductUseCase();
          const updatedProduct = await updateProductUseCase.execute(
            id,
            aProduct
          );
          const output = {
            id: updatedProduct.id,
            name: updatedProduct.name.value,
            price: updatedProduct.price.value,
            createdAt: updatedProduct.createdAt,
          };
          reply.send(output);
        } catch (error) {
          reply.status(404).send({ message: (error as Error).message });
        }
      }
    );
  };

  private delete = async () => {
    this.app.delete(
      "/products/:id",
      {
        schema: {
          tags: ["Products"],
          params: {
            required: ["id"],
            type: "object",
            properties: {
              id: { type: "string" },
            },
          },
          response: {
            204: {
              description: "Product deleted successfully",
            },
            404: {
              description: "Product not found",
            },
          },
        },
      },
      async (request, reply) => {
        const { id } = request.params as { id: string };
        try {
          const deleteProductUseCase =
            this.containerProduct.deleteProductUseCase();
          await deleteProductUseCase.execute(id);
          reply.status(204).send();
        } catch (error) {
          reply.status(404).send({ message: (error as Error).message });
        }
      }
    );
  };

  findById = async () => {
    this.app.get(
      "/products/:id",
      {
        schema: {
          tags: ["Products"],
          params: {
            required: ["id"],
            type: "object",
            properties: {
              id: { type: "string" },
            },
          },
          response: {
            200: {
              description: "Product found successfully",
            },
            404: {
              description: "Product not found",
            },
          },
        },
      },
      async (request, reply) => {
        const { id } = request.params as { id: string };
        try {
          const findProductUseCase =
            this.containerProduct.findProductByIdUseCase();
          const product = await findProductUseCase.execute(id);
          const output = {
            id: product.id,
            name: product.name.value,
            price: product.price.value,
            createdAt: product.createdAt,
          };
          reply.send(output);
        } catch (error) {
          reply.status(404).send({ message: (error as Error).message });
        }
      }
    );
  };

  private list = async () => {
    this.app.get(
      "/products",
      {
        schema: {
          tags: ["Products"],
          response: {
            200: {
              description: "Products found successfully",
            },
            404: {
              description: "Products not found",
            },
          },
        },
      },
      async (request, reply) => {
        try {
          const findAllProductUseCase =
            this.containerProduct.listProductUseCase();
          const products = await findAllProductUseCase.execute();
          const output = products.map((product) => ({
            id: product.id,
            name: product.name.value,
            price: product.price.value,
            createdAt: product.createdAt,
          }));
          reply.send(output);
        } catch (error) {
          reply.status(404).send({ message: (error as Error).message });
        }
      }
    );
  };

  private sell = async () => {
    this.app.post(
      "/products/:id/sell",
      {
        schema: {
          tags: ["Products"],
          params: {
            required: ["id"],
            type: "object",
            properties: {
              id: { type: "string" },
            },
          },
          response: {
            200: {
              description: "Product sold successfully",
            },
            404: {
              description: "Product not found",
            },
          },
        },
      },
      async (request, reply) => {
        const { id, quantity } = request.body as SellProductDto;
        try {
          const sellProductUseCase = this.containerProduct.sellProductUseCase();
          const product = await sellProductUseCase.execute({ id, quantity });
          const output = {
            id: product.id,
            name: product.name.value,
            price: product.price.value,
            createdAt: product.createdAt,
          };
          reply.send(output);
        } catch (error) {
          reply.status(404).send({ message: (error as Error).message });
        }
      }
    );
  };

  private buy = async () => {
    this.app.post(
      "/products/:id/buy",
      {
        schema: {
          tags: ["Products"],
          params: {
            required: ["id"],
            type: "object",
            properties: {
              id: { type: "string" },
            },
          },
          response: {
            200: {
              description: "Product bought successfully",
            },
            404: {
              description: "Product not found",
            },
          },
        },
      },
      async (request, reply) => {
        const { id, quantity } = request.body as BuyProductDto;
        try {
          const buyProductUseCase = this.containerProduct.buyProductUseCase();
          const product = await buyProductUseCase.execute({ id, quantity });
          const output = {
            id: product.id,
            name: product.name.value,
            price: product.price.value,
            createdAt: product.createdAt,
          };
          reply.send(output);
        } catch (error) {
          reply.status(404).send({ message: (error as Error).message });
        }
      }
    );
  };

  async register() {
    await this.app.register(this.create);
    await this.app.register(this.update);
    await this.app.register(this.delete);
    await this.app.register(this.findById);
    await this.app.register(this.list);
  }
}
