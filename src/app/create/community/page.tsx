"use client";

import { CircleX, CloudUpload, Equal, Send } from "lucide-react";
import { useState } from "react";
import { randomBytes } from "node:crypto";

interface Rule {
    text: string;
    id: string;
}

export default function Create() {
    const [rules, setRules] = useState<Rule[]>([]);

    return (
        <>
            <div className="container flex w-full flex-col gap-2 p-10 lg:max-w-6xl">
                <p className="text-4xl font-bold text-white">Create new community</p>

                <div className="mt-12 flex flex-col gap-2 md:w-4/5 ">
                    <div className="flex flex-col gap-2 text-white">
                        <p className="text-2xl font-semibold">Community name<span className="text-red-500">*</span></p>
                        <input className="min-h-8 w-full rounded-md bg-[#1B1B1B] px-4 py-2 outline-none" />
                    </div>

                    <div className="flex flex-col gap-2 text-white">
                        <p className="text-2xl font-semibold">Description<span className="text-red-500">*</span></p>
                        <textarea className="max-h-72 min-h-72 w-full rounded-md bg-[#1B1B1B] px-4 py-2 outline-none" />
                    </div>

                    <div className="flex flex-col gap-2 text-white">
                        <p className="text-2xl font-semibold">Rules<span className="text-red-500">*</span></p>
                        <input onKeyDown={e => {
                            if (e.key === "Enter" && e.currentTarget.value) {
                                setRules([...rules, { text: e.currentTarget.value, id: randomBytes(4).toString("hex") }]);
                                e.currentTarget.value = "";
                            }
                        }} className="min-h-8 w-full rounded-md bg-[#1B1B1B] px-4 py-2 outline-none" />

                        {rules.length >= 1 &&
                            <div className="flex flex-col rounded-md bg-[#1B1B1B] py-2">
                                {
                                    rules.map((x, i) => <div key={i} className="flex flex-row items-center justify-between rounded-md px-4 py-2">
                                        <div className="flex flex-row gap-2">
                                            <Equal />
                                            <p>{x.text}</p>
                                        </div>
                                        <CircleX className="cursor-pointer" onClick={() => setRules(existing => existing.filter(y => y.id !== x.id)) } />
                                    </div>)
                                }
                            </div>
                        }
                    </div>

                    <div className="flex flex-col gap-2 text-white">
                        <p className="text-2xl font-semibold">Icon</p>
                        <input accept="image/jpeg, image/jpg, image/webp, image/gif" id="icon" type="file" hidden />
                        <button onClick={() => document.getElementById("icon")?.click()} className="flex w-full flex-row items-center justify-between gap-2 rounded-md bg-[#1B1B1B] px-4 py-2 md:w-fit">
                            <p>Upload Icon</p>
                            <CloudUpload />
                        </button>
                    </div>

                    <div className="flex flex-col gap-2 text-white">
                        <p className="text-2xl font-semibold">Banner</p>
                        <input accept="image/jpeg, image/jpg, image/webp, image/gif" id="banner" type="file" hidden />
                        <button onClick={() => document.getElementById("banner")?.click()} className="flex w-full flex-row items-center justify-between gap-2 rounded-md bg-[#1B1B1B] px-4 py-2 md:w-fit">
                            <p>Upload Banner</p>
                            <CloudUpload />
                        </button>
                    </div>

                    <button className="ml-auto mt-12 flex w-full flex-row items-center justify-between gap-4 rounded-md bg-[#1B1B1B] px-6 py-4 text-white md:w-fit">
                        <p className="text-xl font-bold">Create Community</p>
                        <Send />
                    </button>
                </div>
            </div>
        </>
    );
}
