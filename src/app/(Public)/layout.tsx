"use client";

import { Sidebar } from "@/components/Sidebar";

import { Baloo } from "@/constants/fonts";
import { MessageCircleMore, Settings } from "lucide-react";
import Image from "next/image";
import { Toaster } from "react-hot-toast";


export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <body className={`${Baloo.className} flex h-full min-h-screen flex-row overflow-y-hidden`}>
            <Toaster />

            <div className="shrink-0">
                <Sidebar profile={<>
                    <div className="mt-auto flex w-full bg-[#12372A65]">
                        <div className="flex w-full flex-row items-center gap-3 px-6 py-4">
                            <Image width={512} height={512} alt="Avatar" className="size-10 rounded-full" src={"https://cdn.discordapp.com/avatars/435497505883422721/c8f47d17223ff04a4b4cce9b0b855ec5.png?size=1024"} />
                            <div className="flex flex-col text-white">
                                <p className="line-clamp-1 font-bold">Vann</p>
                                <p className="-mt-2">suonyan</p>
                            </div>
                            <div className="ml-auto flex flex-row gap-4 px-4 text-white">
                                <a href="/account">
                                    <span>
                                        <Settings />
                                    </span>
                                </a>
                            </div>
                        </div>
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
