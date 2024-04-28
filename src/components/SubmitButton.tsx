import { LoaderCircle } from "lucide-react";
import { useFormStatus } from "react-dom";

export const SubmitButton = ({ text }: { text: string }) => {
    const { pending } = useFormStatus();

    return (
        <button type="submit" disabled={pending} className={`${pending ? "cursor-no-drop bg-[#12372A65]" : "cursor-pointer bg-[#12372A40]"} ml-auto mt-6 flex h-10 min-w-fit flex-row items-center justify-between gap-2 rounded-md px-4 py-2 text-xs font-bold hover:bg-[#12372A65] md:text-base`}>
            {
                pending ? <LoaderCircle className="animate-spin" /> : <p>{text}</p>
            }
        </button>
    );
};
