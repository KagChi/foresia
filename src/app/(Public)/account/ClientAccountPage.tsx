/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { ChevronLeft, CloudUpload } from "lucide-react";
import { createAccount, findAccount, updateAccount } from "../../../actions/Account";
import toast from "react-hot-toast";
import { pageSwitchingState, usePageSwitchingSnapshot } from "@/context/PageSwitching";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseApp, firebaseAuth } from "@/lib/client.firebase";
import * as SubmitButton from "@/components/SubmitButton";
import { createSession } from "@/actions/Auth";
import { deleteCookie } from "cookies-next";
import Image from "next/image";
import { useState } from "react";

const Login = () => <>
    <div className="container flex w-full max-w-5xl flex-col items-center justify-center gap-2 p-4">
        <form action={p => {
            const toastId = toast.loading("Signin in...");
            void findAccount(p).then(x => {
                if (x.success && x.data?.email) {
                    void signInWithEmailAndPassword(firebaseAuth, x.data.email, p.get("password") as string)
                        .catch(reason => {
                            const { message } = reason as { message: string };
                            if (message.includes("invalid")) {
                                toast.error("Password wrong!", { id: toastId });
                                return;
                            } if (message.includes("to many")) {
                                toast.error("You are being ratelimited!", { id: toastId });
                                return;
                            }

                            toast.error("Unknown client side error!", { id: toastId });
                        })
                        .then(y => {
                            if (typeof y === "object") {
                                void y.user.getIdToken().then(sessionToken => {
                                    void createSession(sessionToken).then(() => {
                                        toast.success(`Logged in as ${y.user.displayName}`, { id: toastId });
                                        window.location.reload();
                                    });
                                });
                            }
                        });
                } else {
                    toast.error(x.message, { id: toastId });
                }
            });
        }} className="flex w-full flex-col gap-4 rounded-md bg-[#1B1B1B] px-6 py-4 text-white md:w-4/5">
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
                    <input type="password" required name="password" className="min-h-8 rounded-md bg-[#12372A40] px-4 py-2 outline-none" />
                </div>
            </div>

            <div className="flex flex-row items-start justify-between">
                <p onClick={() => pageSwitchingState.set("register")} className="mt-auto cursor-pointer">Dont have account? <span className="underline">register now</span></p>
                <SubmitButton.Secondary text="Login Now" />
            </div>
        </form>
    </div>
</>;

const Register = () => <>
    <div className="container flex w-full max-w-5xl flex-col items-center justify-center gap-2 p-4">
        <form action={p => {
            const toastId = toast.loading("Creating account...");
            void createAccount(p).then(x => {
                if (x.success) {
                    toast.success(x.message, { id: toastId });
                    pageSwitchingState.set("login");
                } else {
                    toast.error(x.message, { id: toastId });
                }
            });
        }} className="flex w-full flex-col gap-4 rounded-md bg-[#1B1B1B] px-6 py-4 text-white md:w-4/5">
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
                    <input accept="image/jpeg, image/jpg" id="avatar" name="avatar" type="file" hidden />
                    <button type="button" onClick={() => document.getElementById("avatar")?.click()} className="flex w-full flex-row items-center justify-between gap-2 rounded-md bg-[#12372A40] px-4 py-2 md:w-fit">
                        <p>Upload Avatar</p>
                        <CloudUpload />
                    </button>
                </div>
            </div>

            <div className="flex flex-row justify-between">
                <p onClick={() => pageSwitchingState.set("login")} className="mt-auto cursor-pointer">Already have an account? <span className="underline">Login now</span></p>
                <SubmitButton.Secondary text="Register Now" />
            </div>
        </form>
    </div>
</>;

export const LogOut = () => <button
    type="button"
    onClick={() => {
        const toastId = toast.loading("Loggin out...");
        void getAuth(firebaseApp).signOut().then(() => {
            deleteCookie("session");
            toast.success("Successfully logged out!", { id: toastId });
            window.location.reload();
        })
            .catch(() => {
                toast.error("There was an error while logging out", { id: toastId });
            });
    }} className="mt-6 flex h-10 min-w-fit flex-row items-center justify-between gap-2 rounded-md bg-[#b32b2b] px-4 py-2 text-xs font-bold text-white hover:bg-[#b32b2b65] md:text-base">

    <p className="flex flex-row items-center gap-4">
                Log out
    </p>
</button>;


export const Info = ({ user }: { user: {
    email: string;
    username: string;
    nick: string;
    avatar: string | null;
}; }) => {
    const [avatarFile, setAvatarFile] = useState<File | null>(null);

    const handleAvatarFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputFile = event.target.files?.[0] ?? null;
        if (inputFile && inputFile.size < 1024 * 1024 * 20) {
            if (!["image/jpeg"].includes(inputFile.type)) {
                return toast.error("Only images format accepted !");
            }

            setAvatarFile(inputFile);
        } else {
            toast.error("File must be fewer than 20MB!");
        }
    };

    return (
        <form action={p => {
            const toastId = toast.loading("updating account...");
            void updateAccount(p).then(x => {
                if (x.success) {
                    toast.success(x.message, { id: toastId });
                } else {
                    toast.error(x.message, { id: toastId });
                }
            });
        }} className="flex w-full flex-col gap-4 rounded-md bg-[#1B1B1B] px-6 py-4 text-white md:w-4/5">
            <a href="/" className="flex flex-row gap-4 py-2 md:items-center">
                <ChevronLeft size={28} />
                <p className="text-2xl font-bold">Profile Info</p>
            </a>

            <div className="h-0.5 w-full rounded bg-white opacity-10" />

            <div className="mt-4 flex flex-row items-center justify-between">
                <div className="flex flex-col gap-4 md:flex-row md:items-center">
                    <Image unoptimized className="size-12 rounded-full" width={512} height={512} src={
                        avatarFile
                            ? URL.createObjectURL(avatarFile)
                            : user.avatar
                                ? `https://s3.tebi.io/foresia/assets/avatars/${user.avatar}.jpg`
                                : `https://ui-avatars.com/api/?name=${user.nick}&size=16`
                    } alt={"Avatar"} />
                    <p>Profile Picture</p>
                </div>

                <button
                    type="button"
                    onClick={() => document.getElementById("avatar")?.click()} className="flex h-10 min-w-fit flex-row
                                        items-center justify-between gap-2 rounded-md bg-[#12372A40] px-4 py-2 text-xs md:text-base">
                    <p>Upload Image</p>
                    <CloudUpload />
                </button>
            </div>

            <div className="h-0.5 w-full rounded bg-white opacity-10" />

            <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2 text-white">
                    <p className="text-lg font-semibold">Username</p>
                    <input type="text" name="username" required defaultValue={user.username} className="min-h-8 rounded-md bg-[#12372A40] px-4 py-2 outline-none" />
                </div>

                <div className="flex flex-col gap-2 text-white">
                    <p className="text-lg font-semibold">Nickname</p>
                    <input type="text" required name="displayName" defaultValue={user.nick} className="min-h-8 rounded-md bg-[#12372A40] px-4 py-2 outline-none" />
                </div>

                <div className="flex flex-col gap-2 text-white">
                    <p className="text-lg font-semibold">Email</p>
                    <input type="email" required name="email" defaultValue={user.email} className="min-h-8 rounded-md bg-[#12372A40] px-4 py-2 outline-none" />
                </div>

                <input onChange={handleAvatarFileInputChange} accept="image/jpeg" id="avatar" name="avatar" type="file" hidden />
            </div>

            <div className="flex flex-row justify-between">
                <LogOut />

                <SubmitButton.Secondary text="Save Changes" />
            </div>
        </form>
    );
};


export default function ClientAccountPage() {
    const page = usePageSwitchingSnapshot();

    if (page === "register") {
        return <Register />;
    }

    return <Login />;
}
