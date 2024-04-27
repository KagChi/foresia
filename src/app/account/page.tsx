"use client";

import { ChevronLeft, CloudUpload, LoaderCircle } from "lucide-react";
import Image from "next/image";
import { createAccount } from "../actions/Account";
import toast from "react-hot-toast";
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

export const Login = () => <>
    <div className="container flex w-full max-w-3xl flex-col items-center justify-center gap-2 p-10">
        <div className="flex w-full flex-col gap-4 rounded-md bg-[#1B1B1B] px-6 py-4 text-white">
            <a href="/" className="flex flex-row gap-4 py-2 md:items-center">
                <ChevronLeft size={28} />
                <p className="text-2xl font-bold">Login</p>
            </a>

            <div className="h-0.5 w-full rounded bg-white opacity-10" />

            <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2 text-white">
                    <p className="text-lg font-semibold">Username</p>
                    <input className="min-h-8 rounded-md bg-[#12372A40] px-4 py-2 outline-none" />
                </div>

                <div className="flex flex-col gap-2 text-white">
                    <p className="text-lg font-semibold">Nickname</p>
                    <input className="min-h-8 rounded-md bg-[#12372A40] px-4 py-2 outline-none" />
                </div>

                <div className="flex flex-col gap-2 text-white">
                    <p className="text-lg font-semibold">Email</p>
                    <input className="min-h-8 rounded-md bg-[#12372A40] px-4 py-2 outline-none" />
                </div>
            </div>

            <button onClick={() => document.getElementById("image")?.click()} className="ml-auto mt-6 flex h-10 min-w-fit flex-row items-center justify-between gap-2 rounded-md bg-[#12372A40] px-4 py-2 text-xs font-bold md:text-base">
                <p>Login Now</p>
            </button>
        </div>
    </div>
</>;

export const Register = () => <>
    <div className="container flex w-full max-w-3xl flex-col items-center justify-center gap-2 p-10">
        <form action={p => {
            void createAccount(p).then(x => {
                if (x.success) {
                    toast.success(x.message);
                } else {
                    toast.error(x.message);
                }
            });
        }} className="flex w-full flex-col gap-4 rounded-md bg-[#1B1B1B] px-6 py-4 text-white">
            <a href="/" className="flex flex-row gap-4 py-2 md:items-center">
                <ChevronLeft size={28} />
                <p className="text-2xl font-bold">Register</p>
            </a>

            <div className="h-0.5 w-full rounded bg-white opacity-10" />

            <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2 text-white">
                    <p className="text-lg font-semibold">Username</p>
                    <input required name="username" className="min-h-8 rounded-md bg-[#12372A40] px-4 py-2 outline-none" />
                </div>

                <div className="flex flex-col gap-2 text-white">
                    <p className="text-lg font-semibold">Nickname</p>
                    <input required name="displayName" className="min-h-8 rounded-md bg-[#12372A40] px-4 py-2 outline-none" />
                </div>

                <div className="flex flex-col gap-2 text-white">
                    <p className="text-lg font-semibold">Email</p>
                    <input required type="email" name="email" className="min-h-8 rounded-md bg-[#12372A40] px-4 py-2 outline-none" />
                </div>

                <div className="flex flex-col gap-2 text-white">
                    <p className="text-lg font-semibold">Password</p>
                    <input required type="password" name="password" className="min-h-8 rounded-md bg-[#12372A40] px-4 py-2 outline-none" />
                </div>

                <div className="flex flex-col gap-2 text-white">
                    <p className="text-2xl font-semibold">Avatar</p>
                    <input accept="image/jpeg, image/jpg, image/webp, image/gif" id="avatar" type="file" hidden />
                    <button type="button" onClick={() => document.getElementById("avatar")?.click()} className="flex w-full flex-row items-center justify-between gap-2 rounded-md bg-[#12372A40] px-4 py-2 md:w-fit">
                        <p>Upload Avatar</p>
                        <CloudUpload />
                    </button>
                </div>
            </div>

            <SubmitButton text="Register Now" />
        </form>
    </div>
</>;

export const ProfileInfo = () => <>
    <div className="container flex w-full max-w-3xl flex-col items-center justify-center gap-2 p-10">
        <div className="flex w-full flex-col gap-4 rounded-md bg-[#1B1B1B] px-6 py-4 text-white">
            <a href="/" className="flex flex-row gap-4 py-2 md:items-center">
                <ChevronLeft size={28} />
                <p className="text-2xl font-bold">Profile Info</p>
            </a>

            <div className="h-0.5 w-full rounded bg-white opacity-10" />

            <div className="mt-4 flex flex-row items-center justify-between">
                <div className="flex flex-col gap-4 md:flex-row md:items-center">
                    <Image className="size-12 rounded-full" width={512} height={512} src={"https://cdn.discordapp.com/avatars/499021389572079620/3aff1ea56f6f1d87e0578642db2853dc.png?size=1024"} alt={"Avatar"} />
                    <p>Profile Picture</p>
                </div>

                <button onClick={() => document.getElementById("image")?.click()} className="flex h-10 min-w-fit flex-row items-center justify-between gap-2 rounded-md bg-[#12372A40] px-4 py-2 text-xs md:text-base">
                    <p>Upload Image</p>
                    <CloudUpload />
                </button>
            </div>

            <div className="h-0.5 w-full rounded bg-white opacity-10" />

            <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2 text-white">
                    <p className="text-lg font-semibold">Username</p>
                    <input className="min-h-8 rounded-md bg-[#12372A40] px-4 py-2 outline-none" />
                </div>

                <div className="flex flex-col gap-2 text-white">
                    <p className="text-lg font-semibold">Nickname</p>
                    <input className="min-h-8 rounded-md bg-[#12372A40] px-4 py-2 outline-none" />
                </div>

                <div className="flex flex-col gap-2 text-white">
                    <p className="text-lg font-semibold">Email</p>
                    <input className="min-h-8 rounded-md bg-[#12372A40] px-4 py-2 outline-none" />
                </div>
            </div>

            <button onClick={() => document.getElementById("image")?.click()} className="ml-auto mt-6 flex h-10 min-w-fit flex-row items-center justify-between gap-2 rounded-md bg-[#12372A40] px-4 py-2 text-xs font-bold md:text-base">
                <p>Save Changes</p>
            </button>
        </div>
    </div>
</>;


export default function Account() {
    return <Register />;
}
