import "dotenv/config";
import { drizzle, LibSQLDatabase } from "drizzle-orm/libsql";
import { Client, createClient } from "@libsql/client";
import * as schema from "drizzle/schema.drizzle";

export class DrizzleService {
  private readonly db: LibSQLDatabase<typeof schema>;
  private readonly client: Client;

  constructor() {
    const database = process.env.DB_FILE_NAME!;
    this.client = createClient({ url: database! });
    this.db = drizzle(this.client, { schema });
  }

  get getDrizzle() {
    return this.db;
  }
  get getClient() {
    return this.client;
  }

  async close() {
    this.client.close();
  }
}
