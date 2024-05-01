"use server";

import { findCommunityPost, findCommunityPostComment } from "@/actions/Community";
import { NotFound } from "@/components/NotFound";
import { ChevronUp, ChevronDown, MessageSquareMore, Share2, ChevronLeft } from "lucide-react";
import Image from "next/image";
import { timeSince } from "@/app/util/parseDate";
import CommentComponent from "./CommentComponent";

export default async function CommunityPage({ params }: { params: { slug: string; commentSlug: string } }) {
    const { data: post } = await findCommunityPost(params.commentSlug);

    if (!post) {
        return <NotFound />;
    }

    const comments = await findCommunityPostComment(params.commentSlug);
    return (
        <div className="container h-full max-w-5xl p-4 lg:mt-0 xl:px-0">
            <div className="flex w-full flex-col gap-4">
                <div className="flex w-full flex-col-reverse gap-6 rounded-md p-2 md:p-4">
                    <div className="flex h-10 flex-row items-center justify-between">
                        <div className="flex h-full w-fit flex-row items-center gap-1 rounded-full bg-[#1B1B1B] px-4 text-sm text-white md:text-lg">
                            <ChevronUp strokeWidth={3} color="#5da35d" />
                            <p>2.5K</p>
                            <ChevronDown strokeWidth={3} color="#b32b2b" />
                        </div>

                        <div className="flex h-full flex-row gap-1">
                            <div className="flex h-full w-fit flex-row items-center gap-1 rounded-full bg-[#1B1B1B] px-4 text-white">
                                <MessageSquareMore size={22} color="white" />
                                <p>36</p>
                            </div>

                            <div className="flex h-full flex-row items-center gap-1 rounded-full bg-[#1B1B1B] p-2 text-white">
                                <Share2 />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <div className="flex h-12 flex-row items-center gap-2">
                            <a href={`/fs/${params.slug}`} className="flex flex-row items-center gap-4 py-4 text-white">
                                <ChevronLeft size={28} />
                            </a>
                            {
                                post.author.avatar ? <div className="size-10 rounded-full bg-[#1B1B1B]" /> : <Image width={512} height={512} alt="Avatar" className="size-10 rounded-full" src={`${post.author.avatar ? "" : `https://ui-avatars.com/api?name=${post.author.nick}&format=webp`}`} />
                            }
                            <p className="flex flex-col text-white">
                                <span className="flex flex-row gap-3">
                                    <span className="font-bold">fs/{post.community.name}</span>

                                    <span className="flex flex-row gap-3 text-gray-500">
                                        <span>•</span>
                                        <span>{timeSince(post.createdAt)}</span>
                                    </span>
                                </span>
                                <span className="-mt-1 text-gray-400">Posted by {post.author.nick}</span>
                            </p>
                        </div>
                        <p className="text-white">
                            <span className="line-clamp-1 text-lg font-bold md:text-2xl">
                                {post.title}
                            </span>
                            <span className="line-clamp-3 text-xs text-gray-400 md:text-sm">
                                {post.message}
                            </span>
                        </p>
                    </div>
                </div>

                <CommentComponent params={params} />

                <div className="mt-10 flex flex-col gap-4 p-2">
                    {
                        comments.data.map((x, i) => <div key={i} className="flex flex-row gap-3 text-white">
                            {
                                x.author.avatar ? <div className="size-8 rounded-full bg-[#1B1B1B]" /> : <Image width={512} height={512} alt="Avatar" className="size-8 rounded-full" src={`${x.author.avatar ? "" : `https://ui-avatars.com/api?name=${x.author.nick}&format=webp`}`} />
                            }
                            <div className="flex flex-col gap-2">
                                <p className="flex w-full flex-row gap-2 text-lg text-gray-500">
                                    <span className="text-white">{x.author.nick}</span>
                                    <span>•</span>
                                    <span>{timeSince(x.createdAt)}</span>
                                </p>

                                <p>{x.message}</p>
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </div>
    );
}
