"use server";

import { findCommunityPost, findCommunityPostComment } from "@/actions/Community";
import { NotFound } from "@/components/NotFound";
import { MessageSquareMore, ChevronLeft } from "lucide-react";
import Image from "next/image";
import { timeSince } from "@/app/util/parseDate";
import CommentComponent from "./CommentComponent";
import ImageComponent from "./ImageComponent";
import { VoteComponent } from "./VoteComponent";
import { Metadata } from "next";
import { ShareButtonComponent } from "./ShareButtonComponent";
import { DeleteButtonComponent } from "./DeleteButtonComponent";
import { fetchSession } from "@/actions/Auth";

export async function generateMetadata({ params }: { params: { commentSlug: string } }): Promise<Metadata> {
    const { data: post } = await findCommunityPost(params.commentSlug);

    if (post !== null) {
        return {
            title: post.title,
            description: post.message ? `${post.message.split(/\n/).join(" ").slice(0, 150)}...` : "No desc",
            openGraph: {
                title: post.title,
                description: post.message ? `${post.message.split(/\n/).join(" ").slice(0, 150)}...` : "No content",
                images: [
                    {
                        url: `https://s3.tebi.io/foresia/assets/posts/${post.image}.jpg`,
                        width: 1920,
                        height: 1280,
                        alt: post.title
                    }
                ]
            }
        };
    }

    return {
        title: "Post not found",
        description: "No post was found!"
    };
}

export default async function CommunityPage({ params }: { params: { slug: string; commentSlug: string } }) {
    const { data: post } = await findCommunityPost(params.commentSlug);

    if (!post) {
        return <NotFound />;
    }

    const session = await fetchSession();
    const comments = await findCommunityPostComment(params.commentSlug);
    return (
        <div className="container h-full max-w-5xl p-4 lg:mt-0 xl:px-0">
            <div className="flex w-full flex-col gap-4">
                <div className="flex w-full flex-col-reverse gap-6 rounded-md p-2 md:p-4">
                    <div className="flex h-10 flex-row items-center justify-between">
                        <div className="flex h-full w-fit flex-row items-center gap-1 rounded-full bg-[#1B1B1B] px-4 text-sm text-white md:text-lg">
                            <VoteComponent slug={params.commentSlug} voteCount={post.voteCount} />
                        </div>

                        <div className="flex h-full flex-row gap-1">
                            <div className="flex h-full w-fit flex-row items-center gap-1 rounded-full bg-[#1B1B1B] px-4 text-white">
                                <MessageSquareMore size={22} color="white" />
                                <p>{comments.data.length}</p>
                            </div>

                            <ShareButtonComponent />
                            {
                                (session?.uid === post.author.id || session?.uid === post.community.ownerId) &&
                                    <DeleteButtonComponent homeSlug={params.slug} slug={params.commentSlug} />
                            }
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <div className="flex h-12 flex-row items-center gap-2">
                            <a href={`/fs/${params.slug}`} className="flex flex-row items-center gap-4 py-4 text-white">
                                <ChevronLeft size={28} />
                            </a>
                            {
                                <Image unoptimized width={512} height={512} alt="Avatar" className="size-10 rounded-full" src={`${post.author.avatar ? `https://s3.tebi.io/foresia/assets/avatars/${post.author.avatar}.jpg` : `https://ui-avatars.com/api?name=${post.author.nick}&format=webp`}`} />
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

                        {
                            post.image && <ImageComponent image={post.image} />
                        }
                    </div>
                </div>

                <CommentComponent params={params} />

                <div className="mt-10 flex flex-col gap-4 p-2">
                    {
                        comments.data.map((x, i) => <div key={i} className="flex flex-row gap-3 text-white">
                            {
                                <Image unoptimized width={512} height={512} alt="Avatar" className="size-8 rounded-full" src={`${x.author.avatar ? `https://s3.tebi.io/foresia/assets/avatars/${x.author.avatar}.jpg` : `https://ui-avatars.com/api?name=${x.author.nick}&format=webp`}`} />
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
