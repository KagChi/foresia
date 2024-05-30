"use client";

import { useCommunity } from "@/context/Community";
import * as SubmitButton from "@/components/SubmitButton";
import { deleteCommunity, updateCommunity } from "@/actions/Community";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { CircleX, CloudUpload, Equal, Plus } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function ClientPage() {
    const community = useCommunity()!;
    const router = useRouter();

    const [rules, setRules] = useState(community.rules.map(x => ({ text: x, id: (Math.random() + 1).toString(36).substring(7) })));

    const [iconFile, setIconFile] = useState<File | null>(null);
    const [bannerFile, setBannerFile] = useState<File | null>(null);

    const handleIconFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputFile = event.target.files?.[0] ?? null;
        if (inputFile && inputFile.size < 1024 * 1024 * 20) {
            if (!["image/jpeg"].includes(inputFile.type)) {
                return toast.error("Only images format accepted !");
            }


            setIconFile(inputFile);
        } else {
            toast.error("File must be fewer than 20MB!");
        }
    };

    const handleBannerFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputFile = event.target.files?.[0] ?? null;
        if (inputFile && inputFile.size < 1024 * 1024 * 20) {
            if (!["image/jpeg"].includes(inputFile.type)) {
                return toast.error("Only images format accepted !");
            }

            setBannerFile(inputFile);
        } else {
            toast.error("File must be fewer than 20MB!");
        }
    };

    return (
        <>
            <div className="px-6 py-4">
                <form className="flex flex-col gap-2" action={p => {
                    const toastId = toast.loading("updating community...");

                    p.set("rules", JSON.stringify(rules));

                    void updateCommunity(p, community.id).then(x => {
                        if (x.success) {
                            toast.success(x.message, { id: toastId });
                        } else {
                            toast.error(x.message, { id: toastId });
                        }
                    });
                }}>
                    <div className="flex flex-col gap-2 text-white">
                        <p className="text-xl font-semibold">Name<span className="text-red-500">*</span></p>
                        <input defaultValue={community.name} name="name" required className="min-h-8 w-full rounded-md bg-[#1B1B1B] px-4 py-2 outline-none" />
                    </div>
                    <div className="flex flex-col gap-2 text-white">
                        <p className="text-xl font-semibold">Description<span className="text-red-500">*</span></p>
                        <textarea defaultValue={community.description} name="description" required className="max-h-72 min-h-72 w-full rounded-md bg-[#1B1B1B] px-4 py-2 outline-none" />
                    </div>

                    <div className="flex flex-col gap-2 text-white">
                        <p className="text-xl font-semibold">Rules<span className="text-red-500">*</span></p>
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
                        <input onChange={handleIconFileInputChange} accept="image/jpeg" id="icon" name="icon" type="file" hidden />
                        <button type="button" onClick={() => document.getElementById("icon")?.click()} className="flex w-full flex-row items-center justify-between gap-2 rounded-md bg-[#1B1B1B] px-4 py-2 md:w-fit">
                            <p>Upload Icon</p>
                            <CloudUpload />
                        </button>

                        {iconFile && <Image unoptimized className="size-16 rounded-full object-cover" width={512} height={512} alt="Avatar" src={URL.createObjectURL(iconFile)} />}
                    </div>

                    <div className="flex flex-col gap-2 text-white">
                        <p className="text-2xl font-semibold">Banner</p>
                        <input onChange={handleBannerFileInputChange} accept="image/jpeg" id="banner" name="banner" type="file" hidden />
                        <button type="button" onClick={() => document.getElementById("banner")?.click()} className="flex w-full flex-row items-center justify-between gap-2 rounded-md bg-[#1B1B1B] px-4 py-2 md:w-fit">
                            <p>Upload Banner</p>
                            <CloudUpload />
                        </button>

                        {bannerFile && <Image unoptimized className="h-auto w-full rounded-md object-cover" width={1280} height={1080} alt="Avatar" src={URL.createObjectURL(bannerFile)} />}
                    </div>

                    <div>
                        <SubmitButton.Primary text="Save changes" />
                    </div>
                </form>

                <form action={() => {
                    const toastId = toast.loading("Deleting community...");
                    void deleteCommunity(community.name)
                        .then(x => {
                            if (x.success) {
                                toast.success(x.message, { id: toastId });
                                router.push("/");
                            } else {
                                toast.error(x.message, { id: toastId });
                            }
                        });
                }}>
                    <SubmitButton.Danger text="Delete Community" />
                </form>
            </div>
        </>
    );
}
