"use client";

import { postComment } from "@/actions/Community";
import * as SubmitButton from "@/components/SubmitButton";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CommentComponent({ params }: { params: { slug: string; commentSlug: string } }) {
    const [opened, setOpened] = useState(false);
    const router = useRouter();

    return (
        <form action={p => {
            const toastId = toast.loading("Posting comment...");
            void postComment(p, params.commentSlug)
                .then(x => {
                    if (x.success) {
                        toast.success(x.message, { id: toastId });
                        setTimeout(() => router.refresh(), 3000);
                    } else {
                        toast.error(x.message, { id: toastId });

                        if (x.message.includes("auth")) {
                            router.push("/account");
                        }
                    }
                });
        }} className="flex flex-col gap-2 rounded-md bg-[#1B1B1B] p-2 text-white">
            <textarea onClick={(() => setOpened(true))} placeholder="Add comments" name="message" className="max-h-72 min-h-20 w-full bg-transparent px-4 py-2 outline-none" />
            {
                opened && <div className="ml-auto flex flex-row gap-4">
                    <button onClick={() => setOpened(!opened)} type="button" className="mt-6 flex h-10 min-w-fit flex-row items-center justify-between gap-2 rounded-full bg-[#b32b2b] px-4 py-2 text-xs font-bold text-white hover:bg-[#b32b2b60] md:text-base">
                        <p className="flex flex-row items-center gap-4">
                                Cancel
                        </p>
                    </button>

                    <SubmitButton.Secondary roundedStyle="rounded-full" text="Comment" />
                </div>
            }
        </form>
    );
}
