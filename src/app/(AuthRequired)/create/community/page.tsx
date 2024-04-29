"use client";

import { createCommunity, Rule } from "@/actions/Community";
import * as SubmitButton from "@/components/SubmitButton";
import { CircleX, CloudUpload, Equal, Plus, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Create() {
    const [rules, setRules] = useState<Rule[]>([]);
    const router = useRouter();

    return (
        <>
            <div className="container flex max-w-3xl flex-col gap-2 p-10">
                <p className="text-4xl font-bold text-white">Create new community</p>

                <form action={p => {
                    if (!rules.length) {
                        toast.error("Please add few rules!");
                        return;
                    }
                    p.set("rules", JSON.stringify(rules));

                    void createCommunity(p)
                        .then(x => {
                            if (x.success) {
                                toast.success(x.message);
                                router.push(`/fs/${p.get("name")?.toString().toLowerCase()}`);
                            } else {
                                toast.error(x.message);
                            }
                        });
                }} className="mt-12 flex flex-col gap-2 md:w-4/5 ">
                    <div className="flex flex-col gap-2 text-white">
                        <p className="text-2xl font-semibold">Community name<span className="text-red-500">*</span></p>
                        <input name="name" required type="text" className="min-h-8 w-full rounded-md bg-[#1B1B1B] px-4 py-2 outline-none" />
                    </div>

                    <div className="flex flex-col gap-2 text-white">
                        <p className="text-2xl font-semibold">Description<span className="text-red-500">*</span></p>
                        <textarea name="description" required className="max-h-72 min-h-72 w-full rounded-md bg-[#1B1B1B] px-4 py-2 outline-none" />
                    </div>

                    <div className="flex flex-col gap-2 text-white">
                        <p className="text-2xl font-semibold">Rules<span className="text-red-500">*</span></p>
                        <input id="rule" type="text" className="min-h-8 w-full rounded-md bg-[#1B1B1B] px-4 py-2 outline-none" />

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

                        <button onClick={() => {
                            const element = document.getElementById("rule");
                            if (element && "value" in element && typeof element.value === "string" && element.value.length) {
                                if (element.value) {
                                    setRules([...rules, { text: element.value, id: (Math.random() + 1).toString(36).substring(7) }]);
                                    element.value = "";
                                }
                            }
                        }} type="button" className="mt-6 flex h-10 w-32 min-w-fit cursor-pointer flex-row items-center justify-between gap-2 rounded-md bg-[#1B1B1B] px-4 py-2 text-xs font-bold text-white hover:bg-[#1B1B1B65] md:text-base">
                            <p>
                                Add rules
                            </p>
                            <Plus />
                        </button>
                    </div>

                    <div className="flex flex-col gap-2 text-white">
                        <p className="text-2xl font-semibold">Icon</p>
                        <input accept="image/jpeg, image/jpg, image/webp, image/gif" id="icon" type="file" hidden />
                        <button type="button" onClick={() => document.getElementById("icon")?.click()} className="flex w-full flex-row items-center justify-between gap-2 rounded-md bg-[#1B1B1B] px-4 py-2 md:w-fit">
                            <p>Upload Icon</p>
                            <CloudUpload />
                        </button>
                    </div>

                    <div className="flex flex-col gap-2 text-white">
                        <p className="text-2xl font-semibold">Banner</p>
                        <input accept="image/jpeg, image/jpg, image/webp, image/gif" id="banner" type="file" hidden />
                        <button type="button" onClick={() => document.getElementById("banner")?.click()} className="flex w-full flex-row items-center justify-between gap-2 rounded-md bg-[#1B1B1B] px-4 py-2 md:w-fit">
                            <p>Upload Banner</p>
                            <CloudUpload />
                        </button>
                    </div>

                    <div className="ml-auto flex">
                        <SubmitButton.Primary icon={<Send size={20} />} text="Create Community" />
                    </div>
                </form>
            </div>
        </>
    );
}
