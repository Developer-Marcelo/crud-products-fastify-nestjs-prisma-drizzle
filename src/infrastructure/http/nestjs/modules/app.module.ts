import { Module } from "@nestjs/common";
import { ProductModule } from "@/infrastructure/http/nestjs/modules/product/product.module";
import { PrismaModule } from "@/infrastructure/http/nestjs/modules/database/prisma/prisma.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ProductModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
  ],
})
export class AppModule {}
