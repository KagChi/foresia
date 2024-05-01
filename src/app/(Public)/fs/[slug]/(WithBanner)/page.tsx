"use server";

import { communityPost } from "@/actions/Community";
import { DefaultContentCard } from "@/components/ContentCard";

export default async function CommunityPage({ params }: { params: { slug: string } }) {
    const posts = await communityPost(params.slug);

    return (
        <div className="relative mt-4 flex flex-col items-center gap-2 px-4 pb-4 md:px-6">
            <div className="flex w-full flex-col gap-4">
                {posts.data.length >= 1 &&
                    posts.data.map((x, i) => <DefaultContentCard
                        key={i}
                        createdAt={x.createdAt}
                        slug={x.slug}
                        user={x.author.nick}
                        community={x.community.name}
                        title={x.title}
                        description={x.message ? `${x.message.length >= 521 ? `${x.message.slice(0, 520)}...` : x.message}` : ""}
                    />)
                }

                {
                    posts.data.length <= 0 && <>
                        <p className="mt-4 px-2 text-lg text-white">Its so quite here... create post now!</p>
                    </>
                }
            </div>
        </div>
    );
}
