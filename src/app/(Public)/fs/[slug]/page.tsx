"use server";

import { communityPost } from "@/actions/Community";
import CommunityClientPage from "./clientPage";

export default async function CommunityPage({ params }: { params: { slug: string } }) {
    const posts = await communityPost(params.slug);

    console.log(posts.data);

    return (
        <div className="relative mt-4 flex flex-col items-center gap-2 px-4 pb-4 md:px-6">
            <div className="flex w-full flex-col gap-4">
                <CommunityClientPage posts={posts.data} />
            </div>
        </div>
    );
}
