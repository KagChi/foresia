"use client";

import { Share2 } from "lucide-react";
import toast from "react-hot-toast";

export const ShareButtonComponent = () => <button onClick={() => {
    void navigator.clipboard.writeText(window.location.href).then(() => toast.success("Successfully copied share url !"));
}} className="flex size-10 items-center justify-center gap-1 rounded-full bg-[#1B1B1B] p-2 text-white">
    <Share2 size={20} />
</button>;
