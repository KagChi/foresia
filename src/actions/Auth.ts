"use server";

import { firebase } from "@/lib/server.firebase";
import { cookies } from "next/headers";

export const createSession = async (token: string) => {
    const expiresIn = 60 * 60 * 24 * 7 * 1000; // 7 Days.

    const auth = await (await firebase()).auth()
        .createSessionCookie(token, { expiresIn });
    cookies()
        .set("session", auth, { maxAge: expiresIn });
};

export const fetchSession = async () => {
    const token = cookies().get("session")?.value ?? "";
    const firebaseUser = await (await firebase()).auth().verifySessionCookie(token, true).catch(() => null);

    return firebaseUser;
};
