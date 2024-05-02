"use client";

import { useCommunity } from "@/context/Community";
import * as SubmitButton from "@/components/SubmitButton";
import { deleteCommunity } from "@/actions/Community";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ClientPage() {
    const community = useCommunity()!;
    const router = useRouter();

    return (
        <>
            <div className="px-6 py-4">
                <form className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2 text-white">
                        <p className="text-xl font-semibold">Name<span className="text-red-500">*</span></p>
                        <input name="description" required className="min-h-8 w-full rounded-md bg-[#1B1B1B] px-4 py-2 outline-none" />
                    </div>
                    <div className="flex flex-col gap-2 text-white">
                        <p className="text-xl font-semibold">Description<span className="text-red-500">*</span></p>
                        <textarea name="description" required className="max-h-72 min-h-72 w-full rounded-md bg-[#1B1B1B] px-4 py-2 outline-none" />
                    </div>

                    <div className="flex flex-col gap-2 text-white">
                        <p className="text-xl font-semibold">Rules<span className="text-red-500">*</span></p>
                        <input id="rule" type="text" className="min-h-8 w-full rounded-md bg-[#1B1B1B] px-4 py-2 outline-none" />
                    </div>

                    <div>
                        <SubmitButton.Primary text="Save changes" />
                    </div>
                </form>

                <form action={() => {
                    void deleteCommunity(community.name)
                        .then(x => {
                            if (x.success) {
                                toast.success(x.message);
                                router.push("/");
                            } else {
                                toast.error(x.message);
                            }
                        });
                }}>
                    <SubmitButton.Danger text="Delete Community" />
                </form>
            </div>
        </>
    );
}