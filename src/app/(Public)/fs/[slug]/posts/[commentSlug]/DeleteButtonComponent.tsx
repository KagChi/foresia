"use client";

import { deletePost } from "@/actions/Community";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export const DeleteButtonComponent = ({ homeSlug, slug }: { homeSlug: string; slug: string }) => <button onClick={() => {
    void deletePost(slug).then(() => {
        toast.success("Successfully deleted post!");
        const url = new URL(window.location.href);
        url.pathname = `fs/${homeSlug}`;

        window.location.replace(url);
    });
}} className="flex size-10 items-center justify-center gap-1 rounded-full bg-[#1B1B1B] p-2 text-white">
    <Trash2 size={20} />
</button>;
