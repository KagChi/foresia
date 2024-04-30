"use client";

import { CommunityContext } from "@/context/Community";
import { Community } from "@/db/schema";

export default function ClientLayout({
    children,
    community
}: Readonly<{
    children: React.ReactNode;
    community: Omit<typeof Community.$inferSelect, "id" | "updatedAt">;
}>) {
    return (
        <>
            <CommunityContext.Provider value={community}>
                {children}
            </CommunityContext.Provider>
        </>
    );
}
