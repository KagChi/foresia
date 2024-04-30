"use server";

import { findCommunity } from "@/actions/Community";
import { ContentCard } from "@/components/ContentCard";
import { NotFound } from "@/components/NotFound";
import { PencilLine } from "lucide-react";
import Image from "next/image";

export default async function CommunityPage({ params }: { params: { slug: string } }) {
    const { data: community } = await findCommunity(params.slug);

    if (!community) {
        return (
            <NotFound />
        );
    }

    return (
        <>
            <div className="container h-full max-w-5xl lg:mt-0 xl:py-4">
                <div className="h-auto md:relative">
                    {
                        community.banner === null
                            ? <div className="relative h-48 xl:rounded-md">
                                <Image className="h-48 object-cover object-center xl:rounded-md" alt="banner" height={1920} width={1280} src="https://cdn.discordapp.com/attachments/1174136474250248204/1234349898942517288/cd974e322efbf0a9de8a649fd11a947a.png?ex=6630696d&is=662f17ed&hm=1034d3456bac6af0b50f8db7a2e652f7810bee3c575b48028404fb9bcf953e28&" />
                                <div className="absolute top-0 h-48 w-full bg-gradient-to-b from-[#1B1B1B90] xl:rounded-md" />
                            </div>
                            : <div className="h-full bg-[#808080] xl:rounded-md">
                                <div className="h-48 xl:rounded-md" />
                            </div>
                    }

                    <div className="mt-4 flex flex-row items-center gap-4 px-4 md:mt-0 md:items-start md:gap-0 lg:px-36">
                        <Image className="size-20 rounded-full bg-[#29252C] object-cover p-2 md:absolute md:top-32 md:size-28 lg:left-6" alt="banner" height={512} width={512} src={community.icon ? "" : `https://ui-avatars.com/api?name=${community.name}&format=webp`} />
                        <div className="text-white md:px-32 lg:px-0">
                            <p className="text-xl font-bold md:mt-10 md:text-3xl">fs/{community.name}</p>
                            <p className="-mt-1 block text-sm lg:hidden">
                                400,000 Members
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-4 px-4 md:mt-6 md:px-8">
                    <div className="flex flex-row gap-2">
                        <button className="rounded-full bg-[#1B1B1B] px-4 py-2 font-bold text-white">
                            Feed
                        </button>

                        <button className="rounded-full px-4 py-2 text-white hover:bg-[#1B1B1B]">
                            About
                        </button>
                    </div>
                </div>

                <div className="relative mt-4 flex flex-col items-center gap-2 px-4 md:px-6">
                    <a href="/create/post" className="fixed bottom-4 right-4 z-50 flex items-center rounded-full bg-[#12372A] p-3">
                        <PencilLine color="white" />
                    </a>

                    <div className="flex w-full flex-col gap-4">
                        <ContentCard
                            avatar="https://cdn.discordapp.com/avatars/597678468280614922/a39daa2dd7e9bea3c68ac80515f3c45a.png?size=1024"
                            user="ArkanDash"
                            community={community.name}
                            image="https://cdn.discordapp.com/attachments/1174136474250248204/1231799616253722757/artwork.png?ex=663845ca&is=6625d0ca&hm=4fd68774b50b025129bf4a23bfe03c7bbaad99e104aeab24af25dfc8c21056b6&&w=1920&q=75"
                            title="Why does Arisu is a Cute characters?"
                            description="Student of Millennium and member of the Game development club. She was found sleeping inside some ruins. Everything about her is unknown, including her age. Currently, she enjoys playing videogames with Momoi, Midori and Yuzu and has become a serious game maniac. Because she picks up lines from retro games, her speech tends to be hesitant and unnatural."
                        />

                        <ContentCard
                            avatar="https://cdn.discordapp.com/avatars/597678468280614922/a39daa2dd7e9bea3c68ac80515f3c45a.png?size=1024"
                            user="ArkanDash"
                            community={community.name}
                            title="Why does Arona is a Cute characters?"
                            description="She is the main mascot of Blue Archive, appearing as the figurehead on its website and social media. In addition to providing information and updates to Sensei, she also runs a series of videos called Arona Channel."
                        />
                    </div>

                </div>
            </div>
        </>
    );
}
