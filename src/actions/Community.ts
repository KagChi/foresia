"use server";

import { redirect } from "next/navigation";
import { fetchSession } from "./Auth";
import db from "@/db/drizzle";
import { Community, CommunityPost, CommunityPostComment, CommunityPostVote, User } from "@/db/schema";
import { and, desc, eq, ilike, sql } from "drizzle-orm";
import { DecodedIdToken } from "firebase-admin/auth";
import { randomUUID } from "crypto";
import { putObject } from "@/lib/server.s3";

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
        await db.transaction(async tx => {
            try {
                const communityId = await db.insert(Community)
                    .values({
                        name: props.get("name") as string,
                        description: props.get("description") as string,
                        ownerId: auth.uid,
                        rules: (JSON.parse(props.get("rules") as string) as Rule[]).map(x => x.text)
                    })
                    .returning({ id: Community.id })
                    .then(x => x[0].id);

                const icon = props.get("icon") as File | null;
                if (icon && icon.size > 0) {
                    const iconId = randomUUID();
                    if (!["image/jpeg", "image/jpg"].includes(icon.type)) {
                        throw new Error("Icon can only jpeg format!");
                    }

                    if (icon.size > 1024 * 1024 * 20) {
                        throw new Error("Icon must be fewer than 20MB!");
                    }

                    await putObject(iconId, "icons", await icon.arrayBuffer());
                    await db.update(Community)
                        .set({
                            icon: iconId
                        })
                        .where(
                            eq(Community.id, communityId)
                        );
                }

                const banner = props.get("banner") as File | null;
                if (banner && banner.size > 0) {
                    const bannerId = randomUUID();
                    if (!["image/jpeg", "image/jpg"].includes(banner.type)) {
                        throw new Error("Banner can only jpeg format!");
                    }

                    if (banner.size > 1024 * 1024 * 20) {
                        throw new Error("Banner must be fewer than 20MB!");
                    }

                    await putObject(bannerId, "banners", await banner.arrayBuffer());

                    await db.update(Community)
                        .set({
                            banner: bannerId
                        })
                        .where(
                            eq(Community.id, communityId)
                        );
                }
            } catch {
                tx.rollback();
            }
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
            .returning({ slug: CommunityPost.slug, id: CommunityPost.id });

        const image = props.get("image") as File | null;
        if (image && image.size > 0) {
            if (!["image/jpeg", "image/jpg"].includes(image.type)) {
                throw new Error("Image can only jpeg format!");
            }

            if (image.size > 1024 * 1024 * 20) {
                throw new Error("Image must be fewer than 20MB!");
            }

            const imageId = randomUUID();
            await putObject(imageId, "posts", await image.arrayBuffer());

            await db.update(CommunityPost)
                .set({
                    image: imageId
                })
                .where(
                    eq(CommunityPost.id, postResult[0].id)
                );
        }

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

export type FindCommunityPostResult = Pick<typeof CommunityPost.$inferSelect, "image" | "slug" | "title" | "message" | "createdAt"> & {
    voteCount: number;
    commentCount: number;
    author: Pick<typeof User.$inferSelect, "nick" | "username" | "avatar" | "id">;
    community: Pick<typeof Community.$inferSelect, "name" | "ownerId">;
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
            image: CommunityPost.image,
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
            image: CommunityPost.image,
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
                id: User.id,
                nick: User.nick,
                username: User.username,
                avatar: User.avatar
            },
            community: {
                name: Community.name,
                ownerId: Community.ownerId
            },
            image: CommunityPost.image,
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

export const deletePost = async (slug: string, session?: DecodedIdToken | null | undefined) => {
    try {
        if (!session) {
            session = await fetchSession();
        }

        if (!session) {
            return { message: "Not authenticated!", success: false };
        }

        await db.delete(
            CommunityPost
        )
            .where(
                ilike(
                    CommunityPost.slug, slug
                )
            );

        return { message: "Successfuly deleted post!", success: true };
    } catch (e: unknown) {
        console.error(e);

        return { data: null, message: "Failed to querying with unknown reason", success: false };
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
        const result = await db.update(Community)
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
            )
            .returning({
                icon: Community.icon,
                banner: Community.banner
            })
            .then(x => x[0]);

        const icon = props.get("icon") as File | null;
        if (icon && icon.size > 0) {
            if (!["image/jpeg", "image/jpg"].includes(icon.type)) {
                throw new Error("Icon can only jpeg format!");
            }

            if (icon.size > 1024 * 1024 * 20) {
                throw new Error("Icon must be fewer than 20MB!");
            }

            if (result.icon) {
                await putObject(result.icon, "icons", await icon.arrayBuffer());
            } else {
                const iconId = randomUUID();
                await putObject(iconId, "icons", await icon.arrayBuffer());

                await db.update(Community)
                    .set({
                        icon: iconId
                    })
                    .where(
                        eq(Community.id, communityId)
                    );
            }
        }

        const banner = props.get("banner") as File | null;
        if (banner && banner.size > 0) {
            if (!["image/jpeg", "image/jpg"].includes(banner.type)) {
                throw new Error("Banner can only jpeg format!");
            }

            if (banner.size > 1024 * 1024 * 20) {
                throw new Error("Banner must be fewer than 20MB!");
            }

            if (result.banner) {
                await putObject(result.banner, "banners", await banner.arrayBuffer());
            } else {
                const bannerId = randomUUID();
                await putObject(bannerId, "banners", await banner.arrayBuffer());

                await db.update(Community)
                    .set({
                        banner: bannerId
                    })
                    .where(
                        eq(Community.id, communityId)
                    );
            }
        }

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

        return { message: `Successfully ${type.toLowerCase()} the post`, success: true };
    } catch (e: unknown) {
        console.error(e);

        return { message: "Failed to querying with unknown reason", success: false };
    }
};
