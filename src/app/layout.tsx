"use server";

/* eslint-disable @typescript-eslint/require-await */
import "./globals.css";
import { Baloo } from "@/constants/fonts";
import { Sidebar } from "@/components/Sidebar";
import { Toaster } from "react-hot-toast";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: {
            template: "Foresia | %s",
            default: "Foresia | Surf with communities"
        },
        description: "Create your own community, Surf with communities",
        authors: [
            {
                name: "KagChi",
                url: "kagchi.my.id"
            }
        ],
        creator: "KagChi",
        robots: "index, nofollow",
        applicationName: "Foresia",
        generator: "KagChi Technologies",
        icons: "/Logo.png"
    };
}

export default async function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${Baloo.className} flex h-full min-h-screen flex-row overflow-x-hidden`}>
                <Toaster position="bottom-right" />
                <div className="shrink-0">
                    <Sidebar />
                </div>

                <div className="grow">{children}</div>
            </body>
        </html>
    );
}
