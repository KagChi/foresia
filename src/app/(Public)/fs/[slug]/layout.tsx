"use server";

import { findCommunity } from "@/actions/Community";
import { NotFound } from "@/components/NotFound";
import ClientLayout from "./clientLayout";

export default async function RootLayout({
    children,
    params
}: Readonly<{
    children: React.ReactNode;
    params: { slug: string };
}>) {
    const { data: community } = await findCommunity(params.slug);

    if (!community) {
        return (
            <NotFound />
        );
    }

    return (
        <>
            <ClientLayout community={community}>
                {children}
            </ClientLayout>
        </>
    );
}
