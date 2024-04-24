/* eslint-disable tailwindcss/no-custom-classname */
"use client";

import { ChevronDown, ChevronUp, CircleX, MessageSquareMore, PencilLine, Share2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
    const [image, imageState] = useState(false);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            const target = event.target;
            if (image && target instanceof HTMLElement && !target.closest(".image-container")) {
                imageState(false);
            }
        };

        document.addEventListener("mousedown", e => handleOutsideClick(e));

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [image]);

    return (
        <>
            <div className="container relative flex w-full flex-col gap-2 p-10 lg:max-w-6xl">
                <a href="/create" className="fixed bottom-4 right-4 z-50 flex items-center rounded-full bg-[#12372A] p-3">
                    <PencilLine color="white" />
                </a>

                <div className="flex flex-col gap-4">
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
                                <Image width={512} height={512} className="size-10 rounded-full" alt="User" src={"https://cdn.discordapp.com/avatars/597678468280614922/a39daa2dd7e9bea3c68ac80515f3c45a.png?size=1024"} />
                                <p className="flex flex-col text-white">
                                    <span className="font-bold">fs/AskForesia</span>
                                    <span className="-mt-1 text-gray-400">Posted by ArkanDash</span>
                                </p>
                            </div>
                            <p className="text-white">
                                <span className="line-clamp-1 text-lg font-bold md:text-2xl">
                                        Why does KannaChan is a Cute characters?
                                </span>
                                <span className="line-clamp-3 text-xs text-gray-400 md:text-sm">
                                    Kanna Kamui (神凪 カンナ, Kanna Kamui) is a young dragon girl from the world of dragons who becomes Miss Kobayashi adopted daughter.
                                    Kanna has long, white hair with a distinctive ahoge (a single strand of hair that sticks up) and bright blue eyes.
                                    She often wears a school uniform or a casual outfit with a tail accessory. In her dragon form, she has white scales and powerful wings.
                                </span>
                            </p>
                            {
                                image && <>
                                    <div className="fixed inset-0 z-[90] overflow-y-auto backdrop-blur-sm">
                                        <CircleX className="absolute right-0 top-0 m-4 cursor-pointer text-white" size={32} onClick={() => imageState(false)} />
                                        <div className="flex min-h-screen items-center justify-center">
                                            <Image className="image-container" height={1920} width={1280} alt="Content" src={"https://cdn.discordapp.com/attachments/1174136474250248204/1231795766776041534/th.png?ex=66384234&is=6625cd34&hm=01c577b8c91847fe94d93f8c5a3055993ba38dd9b73a4f808739341418b300a8&"} />
                                        </div>
                                    </div>
                                </>
                            }
                            <Image onClick={() => imageState(true)} height={1920} width={1280} className="h-48 rounded-lg object-cover md:h-[22rem]" alt="Content" src={"https://cdn.discordapp.com/attachments/1174136474250248204/1231795766776041534/th.png?ex=66384234&is=6625cd34&hm=01c577b8c91847fe94d93f8c5a3055993ba38dd9b73a4f808739341418b300a8&"} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
