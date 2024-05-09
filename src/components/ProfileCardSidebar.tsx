import { Auth } from "@/context/Auth";
import { ArrowRight, Settings } from "lucide-react";
import Image from "next/image";

export const ProfileCardSidebar = ({ auth }: { auth: Auth }) => {
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
                        auth.loading && !auth.user ? <div className="size-8 rounded-full bg-[#1B1B1B] md:size-10" /> : <Image width={512} height={512} alt="Avatar" className="size-8 rounded-full md:size-10" src={`${auth.user?.avatar ? `https://s3.tebi.io/foresia/assets/avatars/${auth.user.avatar}.jpg` : `https://ui-avatars.com/api?name=${auth.user?.nick ?? "Unknown"}&format=webp`}`} />
                    }
                    <div className="flex flex-col gap-2 text-white">
                        {
                            auth.loading && !auth.user
                                ? <>
                                    <div className="h-4 w-16 rounded-md bg-[#1B1B1B70]" />
                                    <div className="h-4 w-12 rounded-md bg-[#1B1B1B70]" />
                                </>
                                : <>
                                    <p className="line-clamp-1 truncate text-sm font-bold md:text-base">{auth.user?.nick}</p>
                                    <p className="-mt-3 truncate text-xs md:text-sm">{auth.user?.username}</p>
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
