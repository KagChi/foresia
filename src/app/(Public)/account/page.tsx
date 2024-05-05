"use server";

import ClientAccountPage, { Info } from "./ClientAccountPage";
import db from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { User } from "@/db/schema";
import { fetchSession } from "@/actions/Auth";

export default async function Account() {
    const firebaseUser = await fetchSession();

    if (!firebaseUser) {
        return <ClientAccountPage />;
    }

    const user = await db.select({
        email: User.email,
        username: User.username,
        nick: User.nick
    })
        .from(User)
        .where(
            eq(User.id, firebaseUser.uid)
        )
        .then(x => x[0]);

    return (
        <div className="container flex w-full max-w-5xl flex-col items-center justify-center gap-2 p-4">
            <Info user={user} />
        </div>
    );
}
