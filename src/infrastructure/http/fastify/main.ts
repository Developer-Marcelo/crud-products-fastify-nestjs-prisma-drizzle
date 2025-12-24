import Fastify from "fastify";
import fastifyCors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { routesProduct } from "@/infrastructure/http/fastify/routes/product/routes.product";
import { ContainerProduct } from "./routes/product/container";
import { ProductRepositoryPrisma } from "@/infrastructure/product/persistence/product.repository.prisma";
import { PrismaService } from "@/infrastructure/prisma/prisma.service";

import { ProductRepositoryDrizzle } from "@/infrastructure/product/persistence/product.repository.drizzle";
import { DrizzleService } from "@/infrastructure/drizzle/prisma.service";

export const serverFastify = Fastify({
  logger: true,
});

//uso do prisma
const repositoryPrisma = new ProductRepositoryPrisma(new PrismaService());

//uso do drizzle
const repositoryDrizzle = new ProductRepositoryDrizzle(new DrizzleService());

serverFastify.register(fastifyCors, {
  origin: "*",
});

serverFastify.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Products CRUD API",
      version: "1.0.0",
      description: "API for managing products",
    },
  },
});

serverFastify.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

const containerProduct = new ContainerProduct(repositoryPrisma);

const productRoutes = new routesProduct(serverFastify, containerProduct);
productRoutes.register();
