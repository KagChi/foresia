/* eslint-disable @typescript-eslint/require-await */
"use server";

import "./globals.css";
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
            {children}
        </html>
    );
}
