"use client";

import { ProfileCardSidebar } from "@/components/ProfileCardSidebar";
import { Sidebar } from "@/components/Sidebar";

import { Baloo } from "@/constants/fonts";
import { useAuthSnapshot } from "@/context/Auth";
import { MessageCircleMore } from "lucide-react";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    const auth = useAuthSnapshot();

    return (
        <body className={`${Baloo.className} flex h-full min-h-screen flex-row overflow-y-hidden`}>
            <Toaster />

            <div className="shrink-0">
                <Sidebar profile={<>
                    <div className="flex h-24 flex-row items-center justify-between bg-[#12372A65] px-3 py-4">
                        <ProfileCardSidebar auth={auth} />
                    </div>
                </>}>
                    <div className="flex flex-col gap-4">
                        <p className="flex items-center gap-2 text-lg font-bold text-white">
                            <MessageCircleMore strokeWidth={3} />
        My Communities
                        </p>
                        <div className="flex flex-col">
                            <a href="/fs/askforesia" className="font-medium text-gray-400">fs/AskForesia</a>
                            <a href="/fs/bluearchive" className="font-medium text-gray-400">fs/BlueArchive</a>
                            <a href="/fs/darkmemes" className="font-medium text-gray-400">fs/DankMemes</a>
                            <a href="/fs/indonesia" className="font-medium text-gray-400">fs/Indonesia</a>
                            <a href="/fs/genshinimpact" className="font-medium text-gray-400">fs/GenshinImpact</a>
                        </div>
                    </div>
                </Sidebar>
            </div>

            <div className="no-scrollbar h-screen grow overflow-y-auto">{children}</div>
        </body>
    );
}
