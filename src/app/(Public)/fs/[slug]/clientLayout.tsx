"use client";

import { FindCommunityResult } from "@/actions/Community";
import { CommunityContext } from "@/context/Community";

export default function ClientLayout({
    children,
    community
}: Readonly<{
    children: React.ReactNode;
    community: FindCommunityResult;
    params: { slug: string };
}>) {
    return (
        <CommunityContext.Provider value={community}>
            {children}
        </CommunityContext.Provider>
    );
}
