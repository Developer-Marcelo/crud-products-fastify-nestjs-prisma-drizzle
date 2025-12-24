import { DrizzleService } from "@/infrastructure/drizzle/prisma.service";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Module({
  providers: [
    {
      provide: DrizzleService,
      useFactory: () => {
        return new DrizzleService();
      },
      inject: [ConfigService],
    },
  ],
  exports: [DrizzleService],
})
export class DrizzleModule {}
