import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";
import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL!, { prepare: false });

const db = drizzle(sql, { schema });

export default db;
