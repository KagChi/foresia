"use client";

import { ChevronLeft } from "lucide-react";
import Image from "next/image";

export const NotFound = () => <div className="flex size-full min-h-screen flex-col items-center justify-center gap-4">
    <Image width={512} height={512} alt="Not Found" className="w-96" src="/404.svg" />
    <a href="/" className="flex flex-row items-center gap-4 rounded-md bg-[#12372A] px-4 py-2 text-white">
        <ChevronLeft color="white" />
        <p className="font-bold">Back to home</p>
    </a>
</div>;
