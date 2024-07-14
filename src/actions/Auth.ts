"use server";

import { firebase } from "@/lib/server.firebase";
import { cookies } from "next/headers";

export const createSession = (token: string) => {
    const expiresIn = 60 * 60 * 24 * 365 * 1000; // 365 Days.

    cookies()
        .set("session", token, { maxAge: expiresIn });
};

export const fetchSession = async () => {
    const token = cookies().get("session")?.value ?? "";
    const firebaseUser = await (await firebase()).auth().verifyIdToken(token, true).catch(() => null);

    return firebaseUser;
};
