import process from "node:process";
import { Config } from "drizzle-kit";

export default {
    schema: "./src/db/schema.ts",
    out: "./src/drizzle",
    driver: "pg",
    dbCredentials: {
        connectionString: process.env.DATABASE_URL!
    }
} satisfies Config;
