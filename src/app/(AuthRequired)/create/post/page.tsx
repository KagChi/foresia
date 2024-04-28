"use client";

import { CloudUpload, Send } from "lucide-react";

export default function Create() {
    return (
        <>
            <div className="container flex max-w-3xl flex-col gap-2 p-10">
                <p className="text-4xl font-bold text-white">Create new post</p>

                <div className="mt-12 flex flex-col gap-2 md:w-4/5 ">
                    <div className="flex flex-col gap-2 text-white">
                        <p className="text-2xl font-semibold">Post title<span className="text-red-500">*</span></p>
                        <input className="min-h-8 w-full rounded-md bg-[#1B1B1B] px-4 py-2 outline-none" />
                    </div>

                    <div className="flex flex-col gap-2 text-white">
                        <p className="text-2xl font-semibold">Your message<span className="text-red-500">*</span></p>
                        <textarea className="max-h-72 min-h-72 w-full rounded-md bg-[#1B1B1B] px-4 py-2 outline-none" />
                    </div>

                    <div className="flex flex-col gap-2 text-white">
                        <p className="text-2xl font-semibold">Community<span className="text-red-500">*</span></p>
                        <select className="min-h-8 w-full rounded-md bg-[#1B1B1B] px-4 py-2 outline-none">
                            <option>Select Community</option>

                            <optgroup label="Gaming">
                                <option value="1">Genshin Impact</option>
                                <option value="2">Valorant</option>
                            </optgroup>

                            <optgroup label="Crypto">
                                <option value="6">Bitcoin</option>
                            </optgroup>
                        </select>
                    </div>

                    <div className="flex flex-col gap-2 text-white">
                        <p className="text-2xl font-semibold">Image</p>
                        <input accept="image/jpeg, image/jpg, image/webp, image/gif" id="image" type="file" hidden />
                        <button onClick={() => document.getElementById("image")?.click()} className="flex w-full flex-row items-center justify-between gap-2 rounded-md bg-[#1B1B1B] px-4 py-2 md:w-fit">
                            <p>Upload Image</p>
                            <CloudUpload />
                        </button>
                    </div>

                    <button className="ml-auto mt-12 flex w-full flex-row items-center justify-between gap-4 rounded-md bg-[#1B1B1B] px-6 py-4 text-white md:w-fit">
                        <p className="text-xl font-bold">Create Post</p>
                        <Send />
                    </button>
                </div>
            </div>
        </>
    );
}
