"use server";

import { findAccount } from "@/actions/Account";
import { fetchSession } from "@/actions/Auth";
import { Sidebar } from "@/components/Sidebar";
import { Baloo } from "@/constants/fonts";
import { redirect } from "next/navigation";
import { Toaster } from "react-hot-toast";
import Image from "next/image";
import { MessageCircleMore, Settings } from "lucide-react";
import { ownedCommunity } from "@/actions/Community";

export default async function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    const firebaseUser = await fetchSession();

    if (!firebaseUser?.email) {
        return redirect("/account");
    }

    const formData = new FormData();
    formData.set("user_or_email", firebaseUser.email);
    const user = await findAccount(formData);

    const communities = await ownedCommunity(firebaseUser);

    return (
        <body className={`${Baloo.className} flex h-full min-h-screen flex-row overflow-x-hidden`}>
            <Toaster />
            <div className="shrink-0">
                <Sidebar profile={<>
                    <div className="mt-auto flex h-24 flex-row items-center justify-between bg-[#12372A65] px-3 py-4">
                        <div className={"flex w-full flex-row items-center"}>
                            <a href={`/u/${user.data!.username.toLowerCase()}`} className="flex w-full flex-row gap-2 rounded-md px-3 py-2 hover:bg-[#1B1B1B70]">
                                <Image width={512} height={512} alt="Avatar" className="size-8 rounded-full md:size-10" src={`${user.data?.avatar ? "" : `https://ui-avatars.com/api?name=${user.data?.username ?? "Unknown"}&format=webp`}`} />
                                <div className="flex flex-col gap-2 text-white">
                                    <p className="line-clamp-1 text-sm font-bold md:text-base">{user.data?.nick}</p>
                                    <p className="-mt-3 text-xs md:text-sm">{user.data?.username}</p>
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
                    </div>
                </>}>
                    <div className="flex flex-col gap-4">
                        <p className="flex items-center gap-2 text-lg font-bold text-white">
                            <MessageCircleMore strokeWidth={3} />
                                            My Communities
                        </p>
                        <div className="flex flex-col">
                            {
                                communities.data.map(x => <>
                                    <a href={`/fs/${x.name.toLowerCase()}`} className="font-medium text-gray-400">fs/{x.name}</a>
                                </>)
                            }
                        </div>
                    </div>
                </Sidebar>
            </div>

            <div className="no-scrollbar h-screen grow overflow-y-auto ">{children}</div>
        </body>
    );
}
