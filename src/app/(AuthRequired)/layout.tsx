"use server";

import { fetchSession } from "@/actions/Auth";
import { Sidebar } from "@/components/Sidebar";
import { Baloo } from "@/constants/fonts";
import { redirect } from "next/navigation";
import { Toaster } from "react-hot-toast";

export default async function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    const firebaseUser = await fetchSession();

    if (!firebaseUser) {
        return redirect("/account");
    }

    return (
        <body className={`${Baloo.className} flex h-full min-h-screen flex-row overflow-x-hidden`}>
            <Toaster />
            <div className="shrink-0">
                <Sidebar />
            </div>

            <div className="grow">{children}</div>
        </body>
    );
}
