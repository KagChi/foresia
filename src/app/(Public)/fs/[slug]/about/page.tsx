"use client";

import { useCommunity } from "@/context/Community";
import Image from "next/image";

export default function CommunityPage() {
    const community = useCommunity()!;

    return (
        <>
            <div className="relative mt-4 flex flex-col gap-2 px-4 pb-4 md:px-6">
                <div className="flex size-full flex-col gap-2 rounded-md bg-[#1B1B1B70]">
                    <div className="px-6 py-4">
                        <p className="text-xl font-bold uppercase text-white">About Community</p>
                        <p className="text-white">
                            {community.description}
                        </p>
                    </div>

                    <div className="h-0.5 w-full rounded bg-white opacity-10" />

                    <div className="flex flex-col gap-2 px-6 py-4 text-white">
                        <p className="text-xl font-bold uppercase">Author</p>
                        <div className="flex flex-row items-center gap-4">
                            {
                                community.author.avatar ? <div className="size-8 rounded-full bg-[#1B1B1B] md:size-10" /> : <Image width={512} height={512} alt="Avatar" className="size-8 rounded-full md:size-10" src={`${community.author.avatar ? "" : `https://ui-avatars.com/api?name=${community.author.username}&format=webp`}`} />
                            }
                            <p>{community.author.nick}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
