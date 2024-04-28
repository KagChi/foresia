"use client";

import { Sidebar } from "@/components/Sidebar";

import { Baloo } from "@/constants/fonts";
import { Auth, useAuthSnapshot } from "@/context/Auth";
import { ArrowRight, MessageCircleMore, Settings } from "lucide-react";
import Image from "next/image";
import { Toaster } from "react-hot-toast";

const ProfileComponent = ({ auth }: { auth: Auth }) => {
    if (!auth.loading && !auth.user) {
        return (
            <>
                <div className="px-2">
                    <a href="/account" className="flex flex-row gap-2 rounded bg-[#1B1B1B] px-3 py-2 text-white">
                        <p className="font-bold">Login now!</p>
                        <ArrowRight />
                    </a>
                </div>
            </>
        );
    }

    return (
        <>
            <div className={`${auth.loading ? "animate-pulse " : ""}flex w-full flex-row items-center`}>
                <a href={`${auth.user ? `/u/${auth.user.username?.toLowerCase()}` : "#"}`} className="flex w-full flex-row gap-2 rounded-md px-3 py-2 hover:bg-[#1B1B1B70]">
                    {
                        auth.loading && !auth.user ? <div className="size-8 rounded-full bg-[#1B1B1B] md:size-10" /> : <Image width={512} height={512} alt="Avatar" className="size-8 rounded-full md:size-10" src={`${auth.user?.avatar ? "" : `https://ui-avatars.com/api?name=${auth.user?.username ?? "Unknown"}&format=webp`}`} />
                    }
                    <div className="flex flex-col gap-2 text-white">
                        {
                            auth.loading && !auth.user
                                ? <>
                                    <div className="h-4 w-16 rounded-md bg-[#1B1B1B70]" />
                                    <div className="h-4 w-12 rounded-md bg-[#1B1B1B70]" />
                                </>
                                : <>
                                    <p className="line-clamp-1 text-sm font-bold md:text-base">{auth.user?.nick}</p>
                                    <p className="-mt-3 text-xs md:text-sm">{auth.user?.username}</p>
                                </>
                        }
                    </div>
                </a>
            </div>

            <div className="flex items-center justify-center px-3 text-white md:px-6">
                <a href="/account">
                    <span>
                        <Settings className="text-xs md:text-base" />
                    </span>
                </a>
            </div>
        </>
    );
};

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
                    <div className="mt-auto flex h-24 flex-row items-center justify-between bg-[#12372A65] px-3 py-4">
                        <ProfileComponent auth={auth} />
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

            <div className="grow">{children}</div>
        </body>
    );
}
