/* eslint-disable tailwindcss/no-custom-classname */
"use client";
import { ChevronUp, ChevronDown, MessageSquareMore, Share2, CircleX } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ContentCardProps {
    title: string;
    description: string;
    image?: string;

    avatar?: string;
    user: string;
    community: string;

    slug: string;
}

export const DefaultContentCard = (props: ContentCardProps) => {
    const [fullscreenState, setFullscreenState] = useState(false);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            const target = event.target;
            if (fullscreenState && target instanceof HTMLElement && !target.closest(".image-container")) {
                setFullscreenState(false);
            }
        };

        document.addEventListener("mousedown", e => handleOutsideClick(e));

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [fullscreenState]);

    return (
        <a href={`/fs/${props.community.toLowerCase()}/posts/${props.slug}`} className="flex w-full cursor-pointer flex-col-reverse gap-6 rounded-md p-2 hover:bg-[#12372A40] md:p-4">
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
                <div className="flex h-12 flex-row gap-2">
                    {
                        props.avatar ? <div className="size-10 rounded-full bg-[#1B1B1B]" /> : <Image width={512} height={512} alt="Avatar" className="size-10 rounded-full" src={`${props.avatar ? "" : `https://ui-avatars.com/api?name=${props.user}&format=webp`}`} />
                    }
                    <p className="flex flex-col text-white">
                        <span className="font-bold">fs/{props.community}</span>
                        <span className="-mt-1 text-gray-400">Posted by {props.user}</span>
                    </p>
                </div>
                <p className="text-white">
                    <span className="line-clamp-1 text-lg font-bold md:text-2xl">
                        {props.title}
                    </span>
                    <span className="line-clamp-3 text-xs text-gray-400 md:text-sm">
                        {props.description}
                    </span>
                </p>
                {
                    props.image && <>
                        {
                            fullscreenState && <>
                                <div className="fixed inset-0 z-[90] overflow-y-auto backdrop-blur-sm">
                                    <CircleX className="absolute right-0 top-0 m-4 cursor-pointer text-white" size={32} onClick={() => setFullscreenState(false)} />
                                    <div className={"flex size-full items-center justify-center"}>
                                        <Image className="image-container h-full w-3/5 object-contain" height={1920} width={1280} alt="Content" src={props.image} />
                                    </div>
                                </div>
                            </>
                        }
                        <Image onClick={() => setFullscreenState(true)} height={1920} width={1280} className="h-full rounded-lg object-contain" alt="Content" src={props.image} />
                    </>
                }
            </div>
        </a>
    );
};

export const CommunityContentCard = (props: ContentCardProps) => {
    const [fullscreenState, setFullscreenState] = useState(false);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            const target = event.target;
            if (fullscreenState && target instanceof HTMLElement && !target.closest(".image-container")) {
                setFullscreenState(false);
            }
        };

        document.addEventListener("mousedown", e => handleOutsideClick(e));

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [fullscreenState]);

    return (
        <div href={`/fs/${props.community.toLowerCase()}/posts/${props.slug}`} className="flex w-full cursor-pointer flex-col-reverse gap-6 rounded-md p-2 hover:bg-[#12372A40] md:p-4">
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
                <div className="flex h-12 flex-row gap-2">
                    {
                        props.avatar ? <div className="size-10 rounded-full bg-[#1B1B1B]" /> : <Image width={512} height={512} alt="Avatar" className="size-10 rounded-full" src={`${props.avatar ? "" : `https://ui-avatars.com/api?name=${props.user}&format=webp`}`} />
                    }
                    <p className="flex flex-col text-white">
                        <span className="font-bold">u/{props.user}</span>
                    </p>
                </div>
                <p className="text-white">
                    <span className="line-clamp-1 text-lg font-bold md:text-2xl">
                        {props.title}
                    </span>
                    <span className="line-clamp-3 text-xs text-gray-400 md:text-sm">
                        {props.description}
                    </span>
                </p>
                {
                    props.image && <>
                        {
                            fullscreenState && <>
                                <div className="fixed inset-0 z-[90] overflow-y-auto backdrop-blur-sm">
                                    <CircleX className="absolute right-0 top-0 m-4 cursor-pointer text-white" size={32} onClick={() => setFullscreenState(false)} />
                                    <div className={"flex size-full items-center justify-center"}>
                                        <Image className="image-container h-full w-3/5 object-contain" height={1920} width={1280} alt="Content" src={props.image} />
                                    </div>
                                </div>
                            </>
                        }
                        <Image onClick={() => setFullscreenState(true)} height={1920} width={1280} className="h-full rounded-lg object-contain" alt="Content" src={props.image} />
                    </>
                }
            </div>
        </div>
    );
};
