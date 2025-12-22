import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const client = postgres(process.env.DATABASE_URL!, { prepare: false }); // connection pooling

const db = drizzle(client);

export default db;
