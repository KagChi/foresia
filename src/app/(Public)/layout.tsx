/* eslint-disable @typescript-eslint/no-unnecessary-condition */
"use client";

import { ownedCommunity } from "@/actions/Community";
import { ProfileCardSidebar } from "@/components/ProfileCardSidebar";
import { Sidebar } from "@/components/Sidebar";

import { Baloo } from "@/constants/fonts";
import { useAuthSnapshot } from "@/context/Auth";
import { Community } from "@/db/schema";
import { MessageCircleMore } from "lucide-react";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [communities, setCommunities] = useState<Omit<typeof Community.$inferSelect, "id" | "updatedAt">[] | null>(null);
    const auth = useAuthSnapshot();

    useEffect(() => {
        void ownedCommunity()
            .then(x => setCommunities(x.data));
    }, []);

    return (
        <body className={`${Baloo.className} flex h-full min-h-screen flex-row overflow-y-hidden`}>
            <Toaster />

            <div className="shrink-0">
                <Sidebar profile={<>
                    <div className="flex h-24 flex-row items-center justify-between bg-[#12372A65] px-3 py-4">
                        <ProfileCardSidebar auth={auth} />
                    </div>
                </>}>
                    {
                        communities !== null && communities?.length >= 1 &&
                            <div className="flex flex-col gap-4">
                                <p className="flex items-center gap-2 text-lg font-bold text-white">
                                    <MessageCircleMore strokeWidth={3} />
                                            My Communities
                                </p>
                                <div className="flex flex-col">
                                    {
                                        communities.map(x => <>
                                            <a href={`/fs/${x.name.toLowerCase()}`} className="font-medium text-gray-400">fs/{x.name}</a>
                                        </>)
                                    }
                                </div>
                            </div>
                    }

                    {
                        communities === null && <>
                            <div className="flex h-32 w-full animate-pulse flex-col gap-4 rounded-md bg-[#12372A65]" />
                        </>
                    }
                </Sidebar>
            </div>

            <div className="no-scrollbar h-screen grow overflow-y-auto">{children}</div>
        </body>
    );
}
