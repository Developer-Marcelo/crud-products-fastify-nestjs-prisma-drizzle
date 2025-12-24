import "dotenv/config";
import { PrismaClient } from "@/infrastructure/prisma/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

export class PrismaService extends PrismaClient {
  constructor() {
    const adapter = new PrismaBetterSqlite3({
      url: process.env.DATABASE_URL!,
    });
    super({ adapter });
  }
}
