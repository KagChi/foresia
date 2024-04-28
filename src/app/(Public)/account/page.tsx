"use server";

import { cookies } from "next/headers";
import ClientAccountPage from "./ClientAccountPage";
import { firebase } from "@/lib/server.firebase";
import { ChevronLeft } from "lucide-react";
import db from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { User } from "@/db/schema";
import * as SubmitButton from "@/components/SubmitButton";

export default async function Account() {
    const token = cookies().get("session")?.value ?? "";
    const firebaseUser = await (await firebase()).auth().verifySessionCookie(token, true).catch(() => null);

    if (!firebaseUser) {
        return <ClientAccountPage />;
    }

    const user = await db.select({
        email: User.email,
        username: User.username,
        nick: User.nick
    })
        .from(User)
        .where(
            eq(User.id, firebaseUser.uid)
        )
        .then(x => x[0]);

    return (
        <div className="container flex w-full max-w-3xl flex-col items-center justify-center gap-2 p-10">
            <form className="flex w-full flex-col gap-4 rounded-md bg-[#1B1B1B] px-6 py-4 text-white">
                <a href="/" className="flex flex-row gap-4 py-2 md:items-center">
                    <ChevronLeft size={28} />
                    <p className="text-2xl font-bold">Profile Info</p>
                </a>

                <div className="h-0.5 w-full rounded bg-white opacity-10" />

                {/* <div className="mt-4 flex flex-row items-center justify-between">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center">
                            <Image className="size-12 rounded-full" width={512} height={512} src={"https://cdn.discordapp.com/avatars/499021389572079620/3aff1ea56f6f1d87e0578642db2853dc.png?size=1024"} alt={"Avatar"} />
                            <p>Profile Picture</p>
                        </div>

                        <button
                            onClick={() => document.getElementById("image")?.click()} className="flex h-10 min-w-fit flex-row
                                items-center justify-between gap-2 rounded-md bg-[#12372A40] px-4 py-2 text-xs md:text-base">
                            <p>Upload Image</p>
                            <CloudUpload />
                        </button>
                    </div> */}

                {/* <div className="h-0.5 w-full rounded bg-white opacity-10" /> */}

                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2 text-white">
                        <p className="text-lg font-semibold">Username</p>
                        <input type="text" required defaultValue={user.username} className="min-h-8 rounded-md bg-[#12372A40] px-4 py-2 outline-none" />
                    </div>

                    <div className="flex flex-col gap-2 text-white">
                        <p className="text-lg font-semibold">Nickname</p>
                        <input type="text" required defaultValue={user.nick} className="min-h-8 rounded-md bg-[#12372A40] px-4 py-2 outline-none" />
                    </div>

                    <div className="flex flex-col gap-2 text-white">
                        <p className="text-lg font-semibold">Email</p>
                        <input type="email" required defaultValue={user.email} className="min-h-8 rounded-md bg-[#12372A40] px-4 py-2 outline-none" />
                    </div>
                </div>

                <SubmitButton.Secondary text="Save Changes" />
            </form>
        </div>
    );
}
