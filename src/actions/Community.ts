"use server";

import { redirect } from "next/navigation";
import { fetchSession } from "./Auth";
import db from "@/db/drizzle";
import { Community, CommunityPost, User } from "@/db/schema";
import { asc, eq, ilike } from "drizzle-orm";
import { DecodedIdToken } from "firebase-admin/auth";

export interface Rule {
    text: string;
    id: string;
}

export const createCommunity = async (props: FormData) => {
    const auth = await fetchSession();

    if (!auth) {
        redirect("/account");
    }

    try {
        await db.insert(Community)
            .values({
                name: props.get("name") as string,
                description: props.get("description") as string,
                ownerId: auth.uid,
                rules: (JSON.parse(props.get("rules") as string) as Rule[]).map(x => x.text)
            });

        return { message: "Created community!", success: true };
    } catch (e: unknown) {
        if (e && typeof e === "object" && "message" in e && typeof e.message === "string") {
            if (e.message.includes("community")) {
                return { message: "Please try other community name!", success: false };
            }
        }

        console.error(e);

        return { message: "Failed to create community with unknown reason", success: false };
    }
};

export type FindCommunityResult = Omit<typeof Community.$inferSelect, "id" | "updatedAt" | "ownerId"> & { author: Pick<typeof User.$inferSelect, "avatar" | "nick" | "username"> };

export const findCommunity = async (slug: string): Promise<{ data: FindCommunityResult | null; message: string; success: boolean }> => {
    try {
        const result = await db.select({
            name: Community.name,
            icon: Community.icon,
            banner: Community.banner,
            rules: Community.rules,
            description: Community.description,
            createdAt: Community.createdAt,
            author: {
                username: User.username,
                nick: User.nick,
                avatar: User.avatar
            }
        })
            .from(Community)
            .where(
                ilike(
                    Community.name, slug
                )
            )
            .leftJoin(
                User, eq(Community.ownerId, User.id)
            )
            .then(x => x[0] ?? null);

        return { data: result as FindCommunityResult, message: "Successfully find community!", success: true };
    } catch (e: unknown) {
        console.error(e);

        return { data: null, message: "Failed to querying with unknown reason", success: false };
    }
};

export const createCommunityPost = async (props: FormData, community: string, session?: DecodedIdToken | null | undefined) => {
    try {
        if (!session) {
            session = await fetchSession();
        }

        if (!session) {
            return { message: "Not authenticated!", success: false };
        }

        const result = await db.select({
            id: Community.id
        })
            .from(Community)
            .where(
                ilike(
                    Community.name, community
                )
            )
            .then(x => x[0] ?? null);

        await db.insert(CommunityPost)
            .values({
                title: props.get("title") as string,
                message: props.get("message") as string | null,
                slug: (props.get("title") as string)
                    .toLowerCase()
                    .replace(/[^\w ]+/g, "")
                    .replace(/ +/g, "-"),
                communityId: result.id,
                userId: session.uid
            });

        return { message: "Success created post!", success: true };
    } catch (e: unknown) {
        console.error(e);

        if (e && typeof e === "object" && "message" in e && typeof e.message === "string") {
            if (e.message.includes("slug")) {
                return { message: "Please try other post title !", success: false };
            }
        }

        return { message: "Failed to querying with unknown reason", success: false };
    }
};

export const ownedCommunity = async (session?: DecodedIdToken | null | undefined) => {
    try {
        if (!session) {
            session = await fetchSession();
        }

        const result = await db.select({
            name: Community.name,
            icon: Community.icon,
            banner: Community.banner,
            ownerId: Community.ownerId,
            rules: Community.rules,
            description: Community.description,
            createdAt: Community.createdAt
        })
            .from(Community)
            .where(
                eq(
                    Community.ownerId, session!.uid
                )
            )
            .limit(5)
            .then(x => x);

        return { data: result, message: "Successfully find community!", success: true };
    } catch (e: unknown) {
        console.error(e);

        return { data: [], message: "Failed to querying with unknown reason", success: false };
    }
};

export type FindCommunityPostResult = Pick<typeof CommunityPost.$inferSelect, "slug" | "title" | "message"> & {
    author: Pick<typeof User.$inferSelect, "nick" | "username" | "avatar">;
    community: Pick<typeof Community.$inferSelect, "name">;
};

export const communityPost = async (slug: string) => {
    try {
        const communityResult = await db.select({
            id: Community.id
        })
            .from(Community)
            .where(
                ilike(
                    Community.name, slug
                )
            )
            .then(x => x[0] ?? null);

        const result = await db.select({
            slug: CommunityPost.slug,
            title: CommunityPost.title,
            message: CommunityPost.message,
            author: {
                nick: User.nick,
                username: User.username,
                avatar: User.avatar
            },
            community: {
                name: Community.name
            }
        })
            .from(CommunityPost)
            .orderBy(
                asc(CommunityPost.updatedAt)
            )
            .where(
                eq(
                    CommunityPost.communityId, communityResult.id
                )
            )
            .leftJoin(
                User, eq(CommunityPost.userId, User.id)
            )
            .leftJoin(
                Community, eq(CommunityPost.communityId, Community.id)
            )
            .limit(5)
            .then(x => x);

        return { data: result as FindCommunityPostResult[], message: "Successfully find community post!", success: true };
    } catch (e: unknown) {
        console.error(e);

        return { data: [], message: "Failed to querying with unknown reason", success: false };
    }
};

export const feedCommunityPost = async () => {
    try {
        const result = await db.select({
            slug: CommunityPost.slug,
            title: CommunityPost.title,
            message: CommunityPost.message,
            author: {
                nick: User.nick,
                username: User.username,
                avatar: User.avatar
            },
            community: {
                name: Community.name
            }
        })
            .from(CommunityPost)
            .orderBy(
                asc(CommunityPost.updatedAt)
            )
            .leftJoin(
                User, eq(CommunityPost.userId, User.id)
            )
            .leftJoin(
                Community, eq(CommunityPost.communityId, Community.id)
            )
            .limit(5)
            .then(x => x);

        return { data: result as FindCommunityPostResult[], message: "Successfully find community post!", success: true };
    } catch (e: unknown) {
        console.error(e);

        return { data: [], message: "Failed to querying with unknown reason", success: false };
    }
};
