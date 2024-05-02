"use client";

import { voteCommunityPost } from "@/actions/Community";
import { formatNumber } from "@/app/util/formatNumber";
import { ChevronUp, ChevronDown } from "lucide-react";
import toast from "react-hot-toast";

export const VoteComponent = ({ slug, voteCount }: { slug: string; voteCount: number }) => <>
    <ChevronUp onClick={() => {
        const toastId = toast.loading("Posting vote...");
        void voteCommunityPost(slug, "UPVOTE")
            .then(x => {
                if (x.success) {
                    toast.success(x.message, { id: toastId });
                } else {
                    toast.error(x.message, { id: toastId });
                }
            });
    }} className="cursor-pointer hover:opacity-65" strokeWidth={3} color="#5da35d" />
    <p>{formatNumber(voteCount)}</p>
    <ChevronDown onClick={() => {
        const toastId = toast.loading("Posting vote...");
        void voteCommunityPost(slug, "DOWNVOTE")
            .then(x => {
                if (x.success) {
                    toast.success(x.message, { id: toastId });
                } else {
                    toast.error(x.message, { id: toastId });
                }
            });
    }} className="cursor-pointer hover:opacity-65" strokeWidth={3} color="#b32b2b" />
</>;
