"use client";

import { useAuthSnapshot } from "@/context/Auth";
import { useCommunity } from "@/context/Community";
import { PencilLine } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ClientLayout({
    children,
    params
}: Readonly<{
    children: React.ReactNode;
    params: { slug: string };
}>) {
    const pathname = usePathname();
    const community = useCommunity()!;
    const auth = useAuthSnapshot();

    return (
        <>
            <div className="container h-full max-w-5xl lg:mt-0 xl:py-4">
                <a href={`/fs/${params.slug}/create/post`} className="fixed bottom-4 right-4 z-50 flex items-center rounded-full bg-[#12372A] p-3">
                    <PencilLine color="white" />
                </a>
                <div className="h-auto md:relative">
                    {
                        community.banner === null
                            ? <div className="h-full bg-[#808080] xl:rounded-md">
                                <div className="h-48 xl:rounded-md" />
                            </div>
                            : <div className="relative h-48 xl:rounded-md">
                                <Image unoptimized className="h-48 object-cover object-center xl:rounded-md" alt="banner" height={1920} width={1280} src={`https://s3.tebi.io/foresia/assets/banners/${community.banner}.jpg`} />
                                <div className="absolute top-0 h-48 w-full bg-gradient-to-b from-[#1B1B1B90] xl:rounded-md" />
                            </div>
                    }

                    <div className="mt-4 flex flex-row items-center gap-4 px-4 md:mt-0 md:items-start md:gap-0 lg:px-36">
                        <Image unoptimized className="size-20 rounded-full bg-[#29252C] object-cover p-2 md:absolute md:top-32 md:size-28 lg:left-6" alt="banner" height={512} width={512} src={community.icon ? `https://s3.tebi.io/foresia/assets/icons/${community.icon}.jpg` : `https://ui-avatars.com/api?name=${community.name}&format=webp`} />
                        <div className="text-white md:px-32 lg:px-0">
                            <p className="text-xl font-bold md:mt-10 md:text-3xl">fs/{community.name}</p>
                            <p className="-mt-1 text-sm">
                                400,000 Members
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-4 px-4 md:mt-6 md:px-8">
                    <div className="flex flex-row gap-2">
                        <Link href={`/fs/${params.slug}`} className={`rounded-full ${pathname === `/fs/${params.slug}` ? "bg-[#1B1B1B] font-bold" : "hover:bg-[#1B1B1B]"} px-4 py-2 font-bold text-white`}>
                                Feed
                        </Link>

                        <Link href={`/fs/${params.slug}/about`} className={`rounded-full ${pathname === `/fs/${params.slug}/about` ? "bg-[#1B1B1B] font-bold" : "hover:bg-[#1B1B1B]"} px-4 py-2 font-bold text-white`}>
                                About
                        </Link>

                        {
                            !auth.loading && auth.firebaseUser && auth.firebaseUser.displayName === community.author.nick && <Link href={`/fs/${params.slug}/settings`} className={`rounded-full ${pathname === `/fs/${params.slug}/settings` ? "bg-[#1B1B1B] font-bold" : "hover:bg-[#1B1B1B]"} px-4 py-2 font-bold text-white`}>
                                    Settings
                            </Link>
                        }
                    </div>
                </div>

                {children}
            </div>
        </>
    );
}
