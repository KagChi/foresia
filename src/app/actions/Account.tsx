"use server";

import db from "@/db/drizzle";
import { User } from "@/db/schema";
import { firebase } from "@/lib/firebase";
import { getAuth } from "firebase-admin/auth";

export const createAccount = async (props: FormData) => {
    try {
        const result = await db.insert(User).values({
            email: props.get("email") as string,
            nick: props.get("displayName") as string,
            username: props.get("username") as string
        }).returning({ id: User.id });

        await getAuth(await firebase())
            .createUser({
                email: props.get("email") as string,
                displayName: props.get("displayName") as string,
                password: props.get("password") as string,
                uid: result[0].id
            });
        return { message: "Successfully created account !", success: true };
    } catch (e: unknown) {
        console.error(e);
        return { message: "Failed to create account that username probably already exist !", success: true };
    }
};
