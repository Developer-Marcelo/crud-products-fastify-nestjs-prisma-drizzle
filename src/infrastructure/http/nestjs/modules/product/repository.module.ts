//Example Prisma ORM
import { PrismaModule } from "@/infrastructure/http/nestjs/modules/database/prisma/prisma.module";
import { PrismaService } from "@/infrastructure/prisma/prisma.service";
import { ProductRepositoryPrisma } from "@/infrastructure/product/persistence/product.repository.prisma";

//Example Drizzle ORM
/*
import { DrizzleModule } from "./drizzle/drizzle.module";
import { ProductRepositoryDrizzle } from "@/infrastructure/product/persistence/drizzle/repositories/product.repository.drizzle";
import { DrizzleService } from "@/infrastructure/drizzle/prisma.service";
*/
import { Module } from "@nestjs/common";

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: "ProductRepositoryInterface",
      useFactory: (orm) => {
        return new ProductRepositoryPrisma(orm);
      },
      inject: [PrismaService],
    },
  ],
  exports: ["ProductRepositoryInterface"],
})
export class RepositoryModule {}
