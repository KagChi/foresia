"use client";

import { DefaultContentCard } from "@/components/ContentCard";
import { useCommunity } from "@/context/Community";

export default function CommunityPage() {
    const community = useCommunity()!;

    return (
        <div className="relative mt-4 flex flex-col items-center gap-2 px-4 pb-4 md:px-6">
            <div className="flex w-full flex-col gap-4">
                <DefaultContentCard
                    user="ArkanDash"
                    community={community.name}
                    image="https://cdn.discordapp.com/attachments/1174136474250248204/1231799616253722757/artwork.png?ex=663845ca&is=6625d0ca&hm=4fd68774b50b025129bf4a23bfe03c7bbaad99e104aeab24af25dfc8c21056b6&&w=1920&q=75"
                    title="Why does Arisu is a Cute characters?"
                    description="Student of Millennium and member of the Game development club. She was found sleeping inside some ruins. Everything about her is unknown, including her age. Currently, she enjoys playing videogames with Momoi, Midori and Yuzu and has become a serious game maniac. Because she picks up lines from retro games, her speech tends to be hesitant and unnatural."
                />

                <DefaultContentCard
                    user="ArkanDash"
                    community={community.name}
                    title="Why does Arona is a Cute characters?"
                    description="She is the main mascot of Blue Archive, appearing as the figurehead on its website and social media. In addition to providing information and updates to Sensei, she also runs a series of videos called Arona Channel."
                />
            </div>
        </div>
    );
}
