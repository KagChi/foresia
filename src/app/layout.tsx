/* eslint-disable @typescript-eslint/require-await */
"use server";

import "./globals.css";
import { Metadata } from "next";
import { Baloo } from "@/constants/fonts";
import { Sidebar } from "@/components/Sidebar";

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
            <head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
            </head>

            <body className={`${Baloo.className} flex h-full min-h-screen flex-row overflow-x-hidden`}>
                <div className="shrink-0">
                    <Sidebar />
                </div>

                <div className="grow">{children}</div>
            </body>
        </html>
    );
}
