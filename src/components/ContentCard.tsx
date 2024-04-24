/* eslint-disable tailwindcss/no-custom-classname */
"use client";
import { ChevronUp, ChevronDown, MessageSquareMore, Share2, CircleX } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ContentCardProps {
    imageKey: string;

    title: string;
    description: string;
    image: string;

    avatar: string;
    user: string;
    community: string;

    // href: string;
}

export const ContentCard = (props: ContentCardProps) => {
    const [fullscreenState, setFullscreenState] = useState(false);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            const target = event.target;
            if (fullscreenState && target instanceof HTMLElement && !target.closest(`.${props.imageKey}-image-container`)) {
                setFullscreenState(false);
            }
        };

        document.addEventListener("mousedown", e => handleOutsideClick(e));

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [fullscreenState, props.imageKey]);

    return (
        <div className="flex w-full cursor-pointer flex-col-reverse gap-6 rounded-md p-2 hover:bg-[#12372A40] md:p-4 lg:w-3/4">
            <div className="flex h-10 flex-row items-center justify-between">
                <div className="flex h-full w-fit flex-row items-center gap-1 rounded-full bg-[#1B1B1B] px-4 text-sm text-white md:text-lg">
                    <ChevronUp strokeWidth={3} color="green" />
                    <p>2.5K</p>
                    <ChevronDown strokeWidth={3} color="red" />
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
                    <Image width={512} height={512} className="size-10 rounded-full" alt="User" src={props.avatar} />
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
                    fullscreenState && <>
                        <div className="fixed inset-0 z-[90] overflow-y-auto backdrop-blur-sm">
                            <CircleX className="absolute right-0 top-0 m-4 cursor-pointer text-white" size={32} onClick={() => setFullscreenState(false)} />
                            <div className="flex min-h-screen items-center justify-center">
                                <Image className={`${props.imageKey}-image-container`} height={1920} width={1280} alt="Content" src={props.image} />
                            </div>
                        </div>
                    </>
                }
                <Image onClick={() => setFullscreenState(true)} height={1920} width={1280} className="h-48 rounded-lg object-cover md:h-[22rem]" alt="Content" src={props.image} />
            </div>
        </div>
    );
};
