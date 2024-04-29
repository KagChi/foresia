"use server";

import { redirect } from "next/navigation";
import { fetchSession } from "./Auth";
import db from "@/db/drizzle";
import { Community } from "@/db/schema";
import { ilike } from "drizzle-orm";

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

export const findCommunity = async (slug: string) => {
    try {
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
                ilike(
                    Community.name, slug
                )
            )
            .then(x => x[0] ?? null);

        return { data: result, message: "Successfully find community!", success: true };
    } catch (e: unknown) {
        console.error(e);

        return { data: null, message: "Failed to querying with unknown reason", success: false };
    }
};
