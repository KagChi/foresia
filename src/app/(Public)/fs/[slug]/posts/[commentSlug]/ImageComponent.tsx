/* eslint-disable tailwindcss/no-custom-classname */
"use client";

import { CircleX } from "lucide-react";
import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function ImageComponent({ image }: { image: string }) {
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
        <>
            {
                fullscreenState && <>
                    <div className="fixed inset-0 z-[90] overflow-y-auto backdrop-blur-sm">
                        <CircleX className="absolute right-0 top-0 m-4 cursor-pointer text-white" size={32} onClick={() => setFullscreenState(false)} />
                        <div className={"flex size-full items-center justify-center"}>
                            <Image className="image-container h-full w-3/5 object-contain" height={1920} width={1280} alt="Content" src={`https://s3.tebi.io/foresia/assets/posts/${image}.jpg`} />
                        </div>
                    </div>
                </>
            }
            <Image onClick={() => setFullscreenState(true)} height={1920} width={1280} className="h-full rounded-lg object-contain" alt="Content" src={`https://s3.tebi.io/foresia/assets/posts/${image}.jpg`} />
        </>
    );
}
