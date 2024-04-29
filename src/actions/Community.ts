"use server";

import { redirect } from "next/navigation";
import { fetchSession } from "./Auth";
import db from "@/db/drizzle";
import { Community } from "@/db/schema";

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
                owner_id: auth.uid,
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
