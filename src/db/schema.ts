import { Role } from "@/constants/enum";
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

export const User = pgTable("user", {
    id: uuid("id").primaryKey().defaultRandom(),
    nick: varchar("nick").notNull(),
    username: varchar("username").unique(),
    email: varchar("email").unique(),

    avatar: varchar("avatar"),

    roles: varchar("roles").default(Role.User.toString()),

    createdAt: createdAt("created_at"),
    updatedAt: updatedAt("updated_at")
});
