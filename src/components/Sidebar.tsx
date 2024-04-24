"use client";

import { Navigation, UsersRound, Gamepad2, ChevronDown, Bitcoin, LineChart, Dumbbell, MessageCircleMore, Menu, X } from "lucide-react";
import { useState } from "react";
import { SearchQuery } from "./SearchQuery";
import Image from "next/image";

export const Sidebar = () => {
    const [state, setState] = useState(false);

    return (
        <>
            <button onClick={() => setState(!state)} className="absolute right-0 z-50 block p-4 lg:hidden">
                {
                    !state && <Menu color="white" />
                }

                {
                    state && <X color="white" />
                }
            </button>

            <div className={state ? "absolute z-40 flex min-h-screen w-9/12 flex-col gap-10 bg-[#1B1B1B] px-8 py-4 md:w-80" : "hidden min-h-screen w-full flex-col gap-10 bg-[#1B1B1B] px-8 py-4 md:w-80 lg:flex"}>
                <div className="flex flex-row items-center gap-4 text-white">
                    <Image className="size-12 rounded-full" height={512} width={512} alt="Logo" src={"/Logo.png"} />
                    <p className="text-xl font-bold ">Foresia</p>
                </div>

                <SearchQuery />

                <div className="flex flex-col gap-4">
                    <p className="flex items-center gap-2 text-lg font-bold text-white">
                        <Navigation strokeWidth={3} />
        Navigation
                    </p>
                    <div className="font-medium">
                        <p className="font-medium text-gray-400">Popular Subrealms</p>
                        <p className="font-medium text-gray-400">Help & Settings</p>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <p className="flex items-center gap-2 font-bold text-white">
                        <UsersRound strokeWidth={3} />
        Topics
                    </p>
                    <div>
                        <p className="flex items-center justify-between font-medium text-gray-400">
                            <span className="flex items-center gap-2">
                                <Gamepad2 size={16} />
                Gaming
                            </span>

                            <ChevronDown />
                        </p>
                        <p className="flex items-center justify-between font-medium text-gray-400">
                            <span className="flex items-center gap-2">
                                <Bitcoin size={16} />
                Crypto
                            </span>

                            <ChevronDown />
                        </p>
                        <p className="flex items-center justify-between font-medium text-gray-400">
                            <span className="flex items-center gap-2">
                                <LineChart size={16} />
                Business
                            </span>

                            <ChevronDown />
                        </p>
                        <p className="flex items-center justify-between font-medium text-gray-400">
                            <span className="flex items-center gap-2">
                                <Dumbbell size={16} />
                Sports
                            </span>

                            <ChevronDown />
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <p className="flex items-center gap-2 text-lg font-bold text-white">
                        <MessageCircleMore strokeWidth={3} />
        My Communities
                    </p>
                    <div>
                        <p className="font-medium text-gray-400">fs/AskForesia</p>
                        <p className="font-medium text-gray-400">fs/BlueArchive</p>
                        <p className="font-medium text-gray-400">fs/DankMemes</p>
                        <p className="font-medium text-gray-400">fs/Indonesia</p>
                        <p className="font-medium text-gray-400">fs/GenshinImpact</p>
                    </div>
                </div>
            </div>
        </>
    );
};
