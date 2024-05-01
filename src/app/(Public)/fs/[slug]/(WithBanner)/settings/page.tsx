"use server";

import { fetchSession } from "@/actions/Auth";
import { findCommunity } from "@/actions/Community";
import { NotFound } from "@/components/NotFound";
import ClientPage from "./clientPage";

export default async function CommunityPage({ params }: { params: { slug: string } }) {
    const session = await fetchSession();
    const { data: community } = await findCommunity(params.slug, true);

    if (!community || ("id" in community.author && community.author.id !== session?.uid)) {
        return <NotFound />;
    }

    return (
        <>
            <div className="relative mt-4 flex flex-col gap-2 px-4 pb-4 md:px-6">
                <div className="flex size-full flex-col gap-2 rounded-md bg-[#1B1B1B70]">
                    <div className="px-6 py-4">
                        <p className="text-xl font-bold uppercase text-white">Community Settings</p>
                    </div>

                    <ClientPage />
                </div>
            </div>
        </>
    );
}
