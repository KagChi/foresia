/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { ChevronLeft, CloudUpload, LoaderCircle } from "lucide-react";
import Image from "next/image";
import { createAccount, findAccount } from "../../actions/Account";
import toast from "react-hot-toast";
import { useFormStatus } from "react-dom";
import { useState } from "react";
import { PageSwitchingContext, usePageSwitching } from "@/context/PageSwitching";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseApp, firebaseAuth } from "@/lib/client.firebase";

const SubmitButton = ({ text }: { text: string }) => {
    const { pending } = useFormStatus();

    return (
        <button type="submit" disabled={pending} className={`${pending ? "cursor-no-drop bg-[#12372A65]" : "cursor-pointer bg-[#12372A40]"} ml-auto mt-6 flex h-10 min-w-fit flex-row items-center justify-between gap-2 rounded-md px-4 py-2 text-xs font-bold hover:bg-[#12372A65] md:text-base`}>
            {
                pending ? <LoaderCircle className="animate-spin" /> : <p>{text}</p>
            }
        </button>
    );
};

const Login = () => {
    const { setPage } = usePageSwitching()!;

    return (
        <>
            <div className="container flex w-full max-w-3xl flex-col items-center justify-center gap-2 p-10">
                <form action={p => findAccount(p).then(x => {
                    if (x.success && x.data?.email) {
                        void signInWithEmailAndPassword(firebaseAuth, x.data.email, p.get("password") as string)
                            .catch(reason => {
                                const { message } = reason as { message: string };
                                if (message.includes("invalid")) {
                                    toast.error("Password wrong!");
                                } if (message.includes("to many")) {
                                    toast.error("You are being ratelimited!");
                                } else {
                                    toast.error("Unknown client side error!");
                                }
                            })
                            .then(y => {
                                if (typeof y === "object") {
                                    toast.success(`Logged in as ${y.user.displayName}`);
                                }
                            });
                    } else {
                        toast.error(x.message);
                    }
                })} className="flex w-full flex-col gap-4 rounded-md bg-[#1B1B1B] px-6 py-4 text-white">
                    <a href="/" className="flex flex-row gap-4 py-2 md:items-center">
                        <ChevronLeft size={28} />
                        <p className="text-2xl font-bold">Login</p>
                    </a>

                    <div className="h-0.5 w-full rounded bg-white opacity-10" />

                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2 text-white">
                            <p className="text-lg font-semibold">Username/Email</p>
                            <input required name="user_or_email" className="min-h-8 rounded-md bg-[#12372A40] px-4 py-2 outline-none" />
                        </div>

                        <div className="flex flex-col gap-2 text-white">
                            <p className="text-lg font-semibold">Password</p>
                            <input required name="password" className="min-h-8 rounded-md bg-[#12372A40] px-4 py-2 outline-none" />
                        </div>
                    </div>

                    <div className="flex flex-row items-start">
                        <p onClick={() => setPage("register")} className="mt-auto cursor-pointer">Dont have account? <span className="underline">register now</span></p>
                        <SubmitButton text="Login Now" />
                    </div>
                </form>
            </div>
        </>
    );
};

const Register = () => {
    const { setPage } = usePageSwitching()!;

    return (
        <>
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

                    <div className="flex flex-row">
                        <p onClick={() => setPage("login")} className="mt-auto cursor-pointer">Already have an account? <span className="underline">Login now</span></p>
                        <SubmitButton text="Register Now" />
                    </div>
                </form>
            </div>
        </>
    );
};

const ProfileInfo = () => <>
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

const PageComponent = () => {
    const { page } = usePageSwitching()!;

    if (page === "register") {
        return <Register />;
    }

    return <Login />;
};

export default function Account() {
    const [page, setPage] = useState("login");

    return <PageSwitchingContext.Provider value={{ page, setPage }}>
        <PageComponent />
    </PageSwitchingContext.Provider>;
}
