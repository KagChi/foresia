/* eslint-disable @typescript-eslint/require-await */
"use server";

import { findCommunity } from "@/actions/Community";
import ClientLayout from "./clientLayout";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const { data: community } = await findCommunity(params.slug);

    if (community !== null) {
        return {
            title: community.name,
            description: community.description ? `${community.description.split(/\n/).join(" ").slice(0, 150)}...` : "No desc",
            openGraph: {
                title: community.name,
                description: community.description ? `${community.description.split(/\n/).join(" ").slice(0, 150)}...` : "No content",
                images: [
                    {
                        url: `https://s3.tebi.io/foresia/assets/banners/${community.banner}.jpg`,
                        width: 1920,
                        height: 1280,
                        alt: community.name
                    }
                ]
            }
        };
    }

    return {
        title: "Community not found",
        description: "No community was found!"
    };
}

export default async function RootLayout({
    children,
    params
}: Readonly<{
    children: React.ReactNode;
    params: { slug: string };
}>) {
    return (
        <>
            <ClientLayout params={params}>
                {children}
            </ClientLayout>
        </>
    );
}
