import { Global, Module } from "@nestjs/common";
import { PrismaService } from "@/infrastructure/prisma/prisma.service";
import { ConfigService } from "@nestjs/config";

@Global()
@Module({
  providers: [
    {
      provide: PrismaService,
      useFactory: () => {
        return new PrismaService();
      },
      inject: [ConfigService],
    },
  ],
  exports: [PrismaService],
})
export class PrismaModule {}
