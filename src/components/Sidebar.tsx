/* eslint-disable tailwindcss/no-custom-classname */
"use client";

import { Navigation, UsersRound, Gamepad2, ChevronDown, Bitcoin, LineChart, Dumbbell, MessageCircleMore, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { SearchQuery } from "./SearchQuery";
import { useImmer } from "use-immer";
import Image from "next/image";

export const Sidebar = () => {
    const [state, setState] = useState(false);

    const [topicsState, setTopicsState] = useImmer({
        gaming: false,
        crypto: false,
        business: false,
        sports: false
    });

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            const target = event.target;
            if (state && target instanceof HTMLElement && !target.closest(".sidebar-container")) {
                setState(false);
            }
        };

        document.addEventListener("mousedown", e => handleOutsideClick(e));

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [state]);

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

            <div className={`sidebar-container ${state ? "absolute z-40 flex min-h-screen w-9/12 flex-col gap-10 bg-[#1B1B1B] px-8 py-4 md:relative md:w-80" : "hidden min-h-screen w-full flex-col gap-10 bg-[#1B1B1B] px-8 py-4 md:w-80 lg:flex"}`}>
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
                    <div className="flex flex-col font-medium">
                        <a href="/create" className="font-medium text-gray-400">Create new post</a>
                        <a href="/popular" className="font-medium text-gray-400">Popular Subrealms</a>
                        <a href="/settings" className="font-medium text-gray-400">Help & Settings</a>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <p className="flex items-center gap-2 font-bold text-white">
                        <UsersRound strokeWidth={3} />
        Topics
                    </p>
                    <div>
                        <div>
                            <button onClick={(() => {
                                setTopicsState(draft => {
                                    draft.gaming = !draft.gaming;
                                });
                            })} className="flex w-full items-center justify-between font-semibold text-gray-400">
                                <span className="flex items-center gap-2">
                                    <Gamepad2 size={16} />
                Gaming
                                </span>

                                <ChevronDown />
                            </button>
                            {
                                topicsState.gaming && <>
                                    <div className="ml-4 flex flex-col">
                                        <a href="/fs/valorant" className="font-medium text-gray-400">fs/Valorant</a>
                                    </div>
                                </>
                            }
                        </div>
                        <div>
                            <button onClick={(() => {
                                setTopicsState(draft => {
                                    draft.crypto = !draft.crypto;
                                });
                            })} className="flex w-full items-center justify-between font-semibold text-gray-400">
                                <span className="flex items-center gap-2">
                                    <Bitcoin size={16} />
                Crypto
                                </span>

                                <ChevronDown />
                            </button>

                            {
                                topicsState.crypto && <>
                                    <div className="ml-4 flex flex-col">
                                        <a href="/fs/bitcoin" className="font-medium text-gray-400">fs/Bitcoin</a>
                                    </div>
                                </>
                            }
                        </div>
                        <div>
                            <button onClick={(() => {
                                setTopicsState(draft => {
                                    draft.business = !draft.business;
                                });
                            })} className="flex w-full items-center justify-between font-semibold text-gray-400">
                                <span className="flex items-center gap-2">
                                    <LineChart size={16} />
                Business
                                </span>

                                <ChevronDown />
                            </button>

                            {
                                topicsState.business && <>
                                    <div className="ml-4 flex flex-col">
                                        <a href="/fs/askforesia" className="font-medium text-gray-400">fs/AskForesia</a>
                                    </div>
                                </>
                            }
                        </div>
                        <div>
                            <button onClick={(() => {
                                setTopicsState(draft => {
                                    draft.sports = !draft.sports;
                                });
                            })} className="flex w-full items-center justify-between font-semibold text-gray-400">
                                <span className="flex items-center gap-2">
                                    <Dumbbell size={16} />
                Sports
                                </span>

                                <ChevronDown />
                            </button>

                            {
                                topicsState.sports && <>
                                    <div className="ml-4 flex flex-col">
                                        <a href="/fs/tennis" className="font-medium text-gray-400">fs/Tennis</a>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <p className="flex items-center gap-2 text-lg font-bold text-white">
                        <MessageCircleMore strokeWidth={3} />
        My Communities
                    </p>
                    <div className="flex flex-col">
                        <a href="/fs/askforesia" className="font-medium text-gray-400">fs/AskForesia</a>
                        <a href="/fs/bluearchive" className="font-medium text-gray-400">fs/BlueArchive</a>
                        <a href="/fs/darkmemes" className="font-medium text-gray-400">fs/DankMemes</a>
                        <a href="/fs/indonesia" className="font-medium text-gray-400">fs/Indonesia</a>
                        <a href="/fs/genshinimpact" className="font-medium text-gray-400">fs/GenshinImpact</a>
                    </div>
                </div>
            </div>
        </>
    );
};
