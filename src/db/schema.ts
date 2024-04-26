import { HasDefault, NotNull } from "drizzle-orm";
import { pgTable, PgTimestampBuilderInitial, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export function createdAt(name?: string): HasDefault<NotNull<PgTimestampBuilderInitial<string>>> {
    return timestamp(name ?? "created_at")
        .notNull()
        .defaultNow();
}

export function updatedAt(name?: string): HasDefault<NotNull<PgTimestampBuilderInitial<string>>> {
    return timestamp(name ?? "updated_at")
        .notNull()
        .$onUpdate(() => new Date());
}

export const user = pgTable("user", {
    id: uuid("id").primaryKey().defaultRandom(),
    username: varchar("username").unique(),
    email: varchar("email").unique(),

    avatar: varchar("avatar"),

    createdAt: createdAt("created_at"),
    updatedAt: updatedAt("updated_at")
});
