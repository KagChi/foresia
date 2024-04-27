"use server";

import db from "@/db/drizzle";
import { User } from "@/db/schema";
import { firebase } from "@/lib/firebase";
import { getAuth } from "firebase-admin/auth";

export const createAccount = async (props: FormData) => {
    try {
        await db.transaction(async tx => {
            const result = await tx.insert(User).values({
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
                tx.rollback();
            }
        });

        return { message: "Successfully created account !", success: true };
    } catch (e: unknown) {
        if (e && typeof e === "object" && "message" in e && typeof e.message === "string") {
            if (e.message.includes("username")) {
                return { message: "Please try other username!", success: false };
            } else if (e.message.includes("email")) {
                return { message: "Already registered with same email!", success: false };
            }
        }

        return { message: "Failed to create account with unknown reason", success: false };
    }
};
