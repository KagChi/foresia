import { Role } from "@/constants/enum";
import { HasDefault, NotNull, sql } from "drizzle-orm";
import { pgTable, PgTimestampBuilderInitial, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

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
    username: varchar("username").notNull().unique(),
    email: varchar("email").notNull().unique(),

    avatar: varchar("avatar"),
    roles: varchar("roles").default(Role.User.toString()),

    createdAt: createdAt("created_at"),
    updatedAt: updatedAt("updated_at")
});

export const Community = pgTable("community", {
    id: uuid("id").primaryKey().defaultRandom(),

    name: varchar("name").unique().notNull(),
    description: varchar("description").notNull(),

    rules: text("rules")
        .array()
        .notNull()
        .default(sql`ARRAY[]::text[]`),

    icon: varchar("icon"),
    banner: varchar("banner"),

    ownerId: uuid("owner_id").notNull().references(() => User.id),

    createdAt: createdAt("created_at"),
    updatedAt: updatedAt("updated_at")
});

export const CommunityPost = pgTable("community_post", {
    id: uuid("id").primaryKey().defaultRandom(),

    title: varchar("title").notNull(),
    message: varchar("message"),
    image: varchar("image"),

    communityId: uuid("community_id").notNull().references(() => Community.id),
    userId: uuid("owner_id").notNull().references(() => User.id),

    createdAt: createdAt("created_at"),
    updatedAt: updatedAt("updated_at")
});

export const CommunityPostComment = pgTable("community_post_comment", {
    id: uuid("id").primaryKey().defaultRandom(),

    message: varchar("message"),

    communityId: uuid("community_id").notNull().references(() => Community.id),
    userId: uuid("owner_id").notNull().references(() => User.id),

    createdAt: createdAt("created_at"),
    updatedAt: updatedAt("updated_at")
});

