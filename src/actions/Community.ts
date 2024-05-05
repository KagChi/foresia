"use server";

import { redirect } from "next/navigation";
import { fetchSession } from "./Auth";
import db from "@/db/drizzle";
import { Community, CommunityPost, CommunityPostComment, CommunityPostVote, User } from "@/db/schema";
import { and, desc, eq, ilike, sql } from "drizzle-orm";
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

export type FindCommunityResult = Omit<typeof Community.$inferSelect, "updatedAt" | "ownerId"> & { voteCount: number; commentCount: number; author: Pick<typeof User.$inferSelect, "avatar" | "nick" | "username"> };

export const findCommunity = async (slug: string, withUserId?: boolean): Promise<{ data: FindCommunityResult | null; message: string; success: boolean }> => {
    try {
        const result = await db.select({
            id: Community.id,
            name: Community.name,
            icon: Community.icon,
            banner: Community.banner,
            rules: Community.rules,
            description: Community.description,
            createdAt: Community.createdAt,
            author: withUserId
                ? {
                    id: User.id,
                    username: User.username,
                    nick: User.nick,
                    avatar: User.avatar
                }
                : {
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

        const postResult = await db.insert(CommunityPost)
            .values({
                title: props.get("title") as string,
                message: props.get("message") as string | null,
                slug: (props.get("title") as string)
                    .toLowerCase()
                    .replace(/[^\w ]+/g, "")
                    .replace(/ +/g, "-"),
                communityId: result.id,
                userId: session.uid
            })
            .returning({ slug: CommunityPost.slug });

        return { data: postResult[0].slug, message: "Success created post!", success: true };
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

export type FindCommunityPostResult = Pick<typeof CommunityPost.$inferSelect, "slug" | "title" | "message" | "createdAt"> & {
    voteCount: number;
    commentCount: number;
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
            createdAt: CommunityPost.createdAt,
            author: {
                nick: User.nick,
                username: User.username,
                avatar: User.avatar
            },
            community: {
                name: Community.name
            },
            voteCount: sql<number>`cast(count(distinct ${CommunityPostVote.id}) as integer)`,
            commentCount: sql<number>`cast(count(distinct ${CommunityPostComment.id}) as integer)`
        })
            .from(CommunityPost)
            .orderBy(
                desc(CommunityPost.updatedAt)
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
            .leftJoin(CommunityPostVote, eq(CommunityPost.id, CommunityPostVote.postId))
            .leftJoin(CommunityPostComment, eq(CommunityPost.id, CommunityPostComment.postId))
            .groupBy(CommunityPost.id, User.id, Community.id)
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
            createdAt: CommunityPost.createdAt,
            author: {
                nick: User.nick,
                username: User.username,
                avatar: User.avatar
            },
            community: {
                name: Community.name
            },
            voteCount: sql<number>`cast(count(distinct ${CommunityPostVote.id}) as integer)`,
            commentCount: sql<number>`cast(count(distinct ${CommunityPostComment.id}) as integer)`
        })
            .from(CommunityPost)
            .orderBy(
                desc(CommunityPost.createdAt)
            )
            .leftJoin(
                User, eq(CommunityPost.userId, User.id)
            )
            .leftJoin(
                Community, eq(CommunityPost.communityId, Community.id)
            )
            .leftJoin(CommunityPostVote, eq(CommunityPost.id, CommunityPostVote.postId))
            .leftJoin(CommunityPostComment, eq(CommunityPost.id, CommunityPostComment.postId))
            .groupBy(CommunityPost.id, User.id, Community.id)
            .limit(5)
            .then(x => x);

        return { data: result as FindCommunityPostResult[], message: "Successfully find community post!", success: true };
    } catch (e: unknown) {
        console.error(e);

        return { data: [], message: "Failed to querying with unknown reason", success: false };
    }
};

export const findCommunityPost = async (slug: string) => {
    try {
        const result = await db.select({
            slug: CommunityPost.slug,
            title: CommunityPost.title,
            message: CommunityPost.message,
            createdAt: CommunityPost.createdAt,
            author: {
                nick: User.nick,
                username: User.username,
                avatar: User.avatar
            },
            community: {
                name: Community.name
            },
            voteCount: sql<number>`cast(count(distinct ${CommunityPostVote.id}) as integer)`,
            commentCount: sql<number>`cast(count(distinct ${CommunityPostComment.id}) as integer)`
        })
            .from(CommunityPost)
            .where(
                ilike(
                    CommunityPost.slug, slug
                )
            )
            .leftJoin(
                User, eq(CommunityPost.userId, User.id)
            )
            .leftJoin(
                Community, eq(CommunityPost.communityId, Community.id)
            )
            .leftJoin(CommunityPostVote, eq(CommunityPost.id, CommunityPostVote.postId))
            .leftJoin(CommunityPostComment, eq(CommunityPost.id, CommunityPostComment.postId))
            .groupBy(CommunityPost.id, User.id, Community.id)
            .then(x => x[0] ?? null);

        return { data: result as FindCommunityPostResult | null, message: "Successfully find community post!", success: true };
    } catch (e: unknown) {
        console.error(e);

        return { data: null, message: "Failed to querying with unknown reason", success: false };
    }
};

export type FindCommunityPostCommentResult = Pick<typeof CommunityPostComment.$inferSelect, "message" | "createdAt"> & {
    author: Pick<typeof User.$inferSelect, "nick" | "username" | "avatar">;
};

export const findCommunityPostComment = async (slug: string) => {
    try {
        const communityPostResult = await db.select({
            id: CommunityPost.id
        })
            .from(CommunityPost)
            .where(
                ilike(
                    CommunityPost.slug, slug
                )
            )
            .then(x => x[0] ?? null);

        const result = await db.select({
            message: CommunityPostComment.message,
            createdAt: CommunityPostComment.createdAt,
            author: {
                nick: User.nick,
                username: User.username,
                avatar: User.avatar
            }
        })
            .from(CommunityPostComment)
            .where(
                eq(
                    CommunityPostComment.postId, communityPostResult.id
                )
            )
            .orderBy(
                desc(CommunityPostComment.createdAt)
            )
            .leftJoin(
                User, eq(CommunityPostComment.userId, User.id)
            );

        return { data: result as FindCommunityPostCommentResult[], message: "Successfully find community post comment!", success: true };
    } catch (e: unknown) {
        console.error(e);

        return { data: [], message: "Failed to querying with unknown reason", success: false };
    }
};

export const postComment = async (props: FormData, slug: string, session?: DecodedIdToken | null | undefined) => {
    try {
        if (!session) {
            session = await fetchSession();
        }

        if (!session) {
            return { message: "Not authenticated!", success: false };
        }

        const postResult = await db.select({
            id: CommunityPost.id
        })
            .from(CommunityPost)
            .where(
                ilike(
                    CommunityPost.slug, slug
                )
            )
            .then(x => x[0] ?? null);

        await db.insert(CommunityPostComment)
            .values({
                postId: postResult.id,
                userId: session.uid,
                message: props.get("message") as string
            });

        return { message: "Successfully posted comment!", success: true };
    } catch (e: unknown) {
        console.error(e);

        return { data: null, message: "Failed to querying with unknown reason", success: false };
    }
};


export const updateCommunity = async (props: FormData, communityId: string) => {
    const auth = await fetchSession();

    if (!auth) {
        redirect("/account");
    }

    try {
        await db.update(Community)
            .set({
                name: props.get("name") as string,
                description: props.get("description") as string,
                rules: (JSON.parse(props.get("rules") as string) as Rule[]).map(x => x.text)
            })
            .where(
                and(
                    eq(Community.ownerId, auth.uid),
                    eq(Community.id, communityId)
                )
            );

        return { message: "Updated community!", success: true };
    } catch (e: unknown) {
        console.error(e);

        return { message: "Failed to update community with unknown reason", success: false };
    }
};

export const deleteCommunity = async (name: string, session?: DecodedIdToken | null | undefined) => {
    try {
        if (!session) {
            session = await fetchSession();
        }

        if (!session) {
            return { message: "Not authenticated!", success: false };
        }

        await db.delete(Community)
            .where(
                ilike(Community.name, name)
            );

        return { message: "Successfully deleted community!", success: true };
    } catch (e: unknown) {
        console.error(e);

        return { message: "Failed to querying with unknown reason", success: false };
    }
};

export const voteCommunityPost = async (slug: string, type: "UPVOTE" | "DOWNVOTE", session?: DecodedIdToken | null | undefined) => {
    try {
        if (!session) {
            session = await fetchSession();
        }

        if (!session) {
            return { message: "Not authenticated!", success: false };
        }

        const communityPostResult = await db.select({
            id: CommunityPost.id
        })
            .from(CommunityPost)
            .where(
                ilike(
                    CommunityPost.slug, slug
                )
            )
            .then(x => x[0] ?? null)
            .catch(() => null);

        if (!communityPostResult) {
            return { message: "Post not found", success: false };
        }

        const result = await db.update(CommunityPostVote)
            .set({
                type
            })
            .where(
                and(
                    eq(
                        CommunityPostVote.userId, session.uid
                    ),
                    eq(
                        CommunityPostVote.postId, communityPostResult.id
                    )
                )
            )
            .returning();

        if (!result.length) {
            await db.insert(CommunityPostVote)
                .values({
                    type,
                    userId: session.uid,
                    postId: communityPostResult.id
                });
        }

        console.log(result);

        return { message: `Successfully ${type.toLowerCase()} the post`, success: true };
    } catch (e: unknown) {
        console.error(e);

        return { message: "Failed to querying with unknown reason", success: false };
    }
};
