"use client";

import { createCommunityPost } from "@/actions/Community";
import * as SubmitButton from "@/components/SubmitButton";
import { useAuthSnapshot } from "@/context/Auth";
import { ChevronLeft, CloudUpload, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Create({ params }: { params: { slug: string } }) {
    const router = useRouter();

    const auth = useAuthSnapshot();

    if (!auth.loading && !auth.firebaseUser && !auth.user) {
        return router.push("/account");
    }

    return (
        <div className="container flex w-full max-w-5xl flex-col items-center justify-center gap-2 p-4">
            <a href={`/fs/${params.slug}`} className="flex w-full flex-row items-center gap-4 py-4 text-white md:w-4/5">
                <ChevronLeft size={28} />
                <p className="text-3xl font-bold md:text-4xl">Create new post</p>
            </a>

            <form action={p => {
                void createCommunityPost(p, params.slug)
                    .then(x => {
                        if (x.success && x.data) {
                            toast.success(x.message);
                            router.push(`/fs/${params.slug}/posts/${x.data}`);
                        } else {
                            toast.error(x.message);

                            if (x.message.includes("auth")) {
                                router.push("/account");
                            }
                        }
                    });
            }} className="flex w-full flex-col gap-4 py-4 text-white md:w-4/5">
                <div className="flex flex-col gap-2 text-white">
                    <p className="text-2xl font-semibold">Post title<span className="text-red-500">*</span></p>
                    <input required type="text" name="title" className="min-h-8 w-full rounded-md bg-[#1B1B1B] px-4 py-2 outline-none" />
                </div>

                <div className="flex flex-col gap-2 text-white">
                    <p className="text-2xl font-semibold">Your message</p>
                    <textarea name="message" className="max-h-72 min-h-72 w-full rounded-md bg-[#1B1B1B] px-4 py-2 outline-none" />
                </div>

                <div className="flex flex-col gap-2 text-white">
                    <p className="text-2xl font-semibold">Image</p>
                    <input accept="image/jpeg, image/jpg, image/webp, image/gif" id="image" type="file" hidden />
                    <button type="submit" onClick={() => document.getElementById("image")?.click()} className="flex w-full flex-row items-center justify-between gap-2 rounded-md bg-[#1B1B1B] px-4 py-2 md:w-fit">
                        <p>Upload Image</p>
                        <CloudUpload />
                    </button>
                </div>

                <div className="ml-auto flex">
                    <SubmitButton.Primary icon={<Send size={20} />} text="Create Post" />
                </div>
            </form>
        </div>
    );
}
