/* eslint-disable tailwindcss/no-custom-classname */
"use client";

import { Navigation, UsersRound, Gamepad2, ChevronDown, Bitcoin, LineChart, Dumbbell, Menu, X, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { SearchQuery } from "./SearchQuery";
import { useImmer } from "use-immer";
import Image from "next/image";

export const Sidebar = ({ children, profile }: Readonly<{ children?: React.ReactNode; profile?: React.JSX.Element }>) => {
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

            <div className={`sidebar-container flex h-screen flex-col bg-[#1B1B1B] ${state ? "absolute z-40 w-9/12 md:relative md:w-80" : "hidden w-full md:w-80 lg:flex"}`}>
                <div className="flex h-full flex-col gap-10 overflow-y-auto px-6 py-4">
                    <a href="/" className="flex flex-row items-center gap-4 text-white">
                        <Image className="size-12 rounded-full" height={512} width={512} alt="Logo" src={"/Logo.png"} />
                        <p className="text-xl font-bold ">Foresia</p>
                    </a>

                    <SearchQuery />

                    <div className="flex flex-col gap-4">
                        <p className="flex items-center gap-2 text-lg font-bold text-white">
                            <Navigation strokeWidth={3} />
        Navigation
                        </p>
                        <div className="flex flex-col font-medium">
                            <a href="/create/community" className="font-medium text-gray-400">Create new community</a>
                            <a href="/create/post" className="font-medium text-gray-400">Create new post</a>
                            <a href="/popular" className="font-medium text-gray-400">Popular Subrealms</a>
                            <a href="/account" className="font-medium text-gray-400">Manage Account</a>
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

                                    {
                                        !topicsState.gaming && <ChevronDown />
                                    }

                                    {
                                        topicsState.gaming && <ChevronRight />
                                    }
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

                                    {
                                        !topicsState.crypto && <ChevronDown />
                                    }

                                    {
                                        topicsState.crypto && <ChevronRight />
                                    }
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

                                    {
                                        !topicsState.business && <ChevronDown />
                                    }

                                    {
                                        topicsState.business && <ChevronRight />
                                    }
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

                                    {
                                        !topicsState.sports && <ChevronDown />
                                    }

                                    {
                                        topicsState.sports && <ChevronRight />
                                    }
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

                    {children}
                </div>
                {profile}
            </div>
        </>
    );
};
