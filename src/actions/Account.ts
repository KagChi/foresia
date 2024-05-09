"use server";

import db from "@/db/drizzle";
import { User } from "@/db/schema";
import { firebase } from "@/lib/server.firebase";
import { eq, or } from "drizzle-orm";
import { getAuth } from "firebase-admin/auth";
import { fetchSession } from "./Auth";
import { randomUUID } from "crypto";
import { putObject } from "@/lib/server.s3";

export const createAccount = async (props: FormData) => {
    try {
        const result = await db.insert(User).values({
            email: props.get("email") as string,
            nick: props.get("displayName") as string,
            username: props.get("username") as string
        }).returning({ id: User.id });

        try {
            await getAuth(await firebase())
                .createUser({
                    email: props.get("email") as string,
                    displayName: props.get("displayName") as string,
                    password: props.get("password") as string,
                    uid: result[0].id
                });
        } catch {
            await db.delete(User)
                .where(
                    eq(User.id, result[0].id)
                );
        }

        const avatar = props.get("avatar") as File | null;
        if (avatar && avatar.size > 0) {
            if (!["image/jpeg", "image/jpg"].includes(avatar.type)) {
                throw new Error("Avatar can only jpeg format!");
            }

            if (avatar.size > 1024 * 1024 * 20) {
                throw new Error("Avatar must be fewer than 20MB!");
            }

            const avatarId = randomUUID();
            await putObject(avatarId, "avatars", await avatar.arrayBuffer());

            await db.update(User)
                .set({
                    avatar: avatarId
                })
                .where(
                    eq(User.id, result[0].id)
                );
        }

        return { message: "Successfully created account !", success: true };
    } catch (e: unknown) {
        if (e && typeof e === "object" && "message" in e && typeof e.message === "string") {
            if (e.message.includes("username")) {
                return { message: "Please try other username!", success: false };
            } else if (e.message.includes("email")) {
                return { message: "Already registered with same email!", success: false };
            }
        }

        console.error(e);

        return { message: "Failed to create account with unknown reason", success: false };
    }
};

export const updateAccount = async (props: FormData) => {
    try {
        const user = await fetchSession();
        const result = await db.update(User)
            .set({
                email: props.get("email") as string,
                nick: props.get("displayName") as string,
                username: props.get("username") as string
            })
            .where(
                eq(User.id, user!.uid)
            )
            .returning({
                avatar: User.avatar,
                id: User.id
            });
        await getAuth(await firebase())
            .updateUser(user!.uid, {
                email: props.get("email") as string,
                displayName: props.get("displayName") as string
            });

        const avatar = props.get("avatar") as File | null;
        if (avatar && avatar.size > 0) {
            if (!["image/jpeg", "image/jpg"].includes(avatar.type)) {
                throw new Error("Avatar can only jpeg format!");
            }

            if (avatar.size > 1024 * 1024 * 20) {
                throw new Error("Avatar must be fewer than 20MB!");
            }

            if (result[0].avatar) {
                await putObject(result[0].avatar, "avatars", await avatar.arrayBuffer());
            } else {
                const avatarId = randomUUID();
                await putObject(avatarId, "avatars", await avatar.arrayBuffer());

                await db.update(User)
                    .set({
                        avatar: avatarId
                    })
                    .where(
                        eq(User.id, result[0].id)
                    );
            }
        }

        return { message: "Successfully updated account !", success: true };
    } catch (e: unknown) {
        console.error(e);

        return { message: "Failed to update account with unknown reason", success: false };
    }
};

export const findAccount = async (props: FormData) => {
    try {
        const result = await db.select({
            email: User.email,
            username: User.username,
            nick: User.nick,
            avatar: User.avatar
        })
            .from(User)
            .where(
                or(
                    eq(User.email, props.get("user_or_email") as string),
                    eq(User.username, props.get("user_or_email") as string)
                )
            );

        if (result.length) {
            return {
                data: result[0],
                message: "That account exist!",
                success: true
            };
        }

        return {
            data: null,
            message: "Account doesnt seem exist!",
            success: false
        };
    } catch (e: unknown) {
        console.log(e);

        return {
            data: null,
            message: "Server side error ocurred, please contact admin!",
            success: false
        };
    }
};
