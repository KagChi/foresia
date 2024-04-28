"use client";

import { LoaderCircle } from "lucide-react";
import React from "react";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
    text: string;
    icon?: React.ReactNode;
}

const Primary: React.FC<SubmitButtonProps> = ({ text, icon }) => {
    const { pending } = useFormStatus();

    return (
        <button type="submit" disabled={pending} className={`${pending ? "cursor-no-drop bg-[#1B1B1B65]" : "cursor-pointer bg-[#1B1B1B]"} ml-auto mt-6 flex h-10 min-w-fit flex-row items-center justify-between gap-2 rounded-md px-4 py-2 text-xs font-bold text-white hover:bg-[#1B1B1B65] md:text-base`}>
            {
                pending
                    ? <LoaderCircle className="animate-spin" />
                    : <p className="flex flex-row items-center gap-4">
                        {text}

                        {icon && icon}
                    </p>
            }
        </button>
    );
};

const Secondary: React.FC<SubmitButtonProps> = ({ text, icon }) => {
    const { pending } = useFormStatus();

    return (
        <button type="submit" disabled={pending} className={`${pending ? "cursor-no-drop bg-[#12372A65]" : "cursor-pointer bg-[#12372A40]"} ml-auto mt-6 flex h-10 min-w-fit flex-row items-center justify-between gap-2 rounded-md px-4 py-2 text-xs font-bold text-white hover:bg-[#12372A65] md:text-base`}>
            {
                pending
                    ? <LoaderCircle className="animate-spin" />
                    : <p className="flex flex-row items-center gap-4">
                        {text}

                        {icon && icon}
                    </p>
            }
        </button>
    );
};


export {
    Primary,
    Secondary
};
