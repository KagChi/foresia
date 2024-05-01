"use client";

import { FindCommunityPostResult } from "@/actions/Community";
import { DefaultContentCard } from "@/components/ContentCard";
import { useCommunity } from "@/context/Community";

export default function CommunityClientPage({
    posts
}: {
    posts: FindCommunityPostResult[];
}) {
    const community = useCommunity()!;

    return (
        <>
            {posts.length >= 1 &&
                posts.map((x, i) => <DefaultContentCard
                    key={i}
                    user={x.author.nick}
                    community={community.name}
                    title={x.title}
                    description={x.message ? `${x.message.length >= 521 ? `${x.message.slice(0, 520)}...` : x.message}` : ""}
                />)
            }

            {
                posts.length <= 0 && <>
                    <p className="mt-4 px-2 text-lg text-white">Its so quite here... create post now!</p>
                </>
            }
        </>
    );
}
