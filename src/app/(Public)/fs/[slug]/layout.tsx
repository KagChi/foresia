"use server";

import { findCommunity } from "@/actions/Community";
import { NotFound } from "@/components/NotFound";
import ClientLayout from "./clientLayout";
import { Community, User } from "@/db/schema";

export default async function RootLayout({
    children,
    params
}: Readonly<{
    children: React.ReactNode;
    params: { slug: string };
}>) {
    const { data: community } = await findCommunity(params.slug);

    if (!community?.author) {
        return (
            <NotFound />
        );
    }

    return (
        <>
            <ClientLayout community={community as Omit<typeof Community.$inferSelect, "id" | "updatedAt" | "ownerId"> & { author: Pick<typeof User.$inferSelect, "avatar" | "nick" | "username"> }} params={params}>
                {children}
            </ClientLayout>
        </>
    );
}
