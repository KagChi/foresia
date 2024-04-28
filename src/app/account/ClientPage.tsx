/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { ChevronLeft, CloudUpload } from "lucide-react";
import { createAccount, findAccount } from "../../actions/Account";
import toast from "react-hot-toast";
import { useState } from "react";
import { PageSwitchingContext, usePageSwitching } from "@/context/PageSwitching";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "@/lib/client.firebase";
import { setCookie } from "cookies-next";
import { SubmitButton } from "@/components/SubmitButton";

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
                                    return;
                                } if (message.includes("to many")) {
                                    toast.error("You are being ratelimited!");
                                    return;
                                }

                                toast.error("Unknown client side error!");
                            })
                            .then(y => {
                                if (typeof y === "object") {
                                    void y.user.getIdToken().then(sessionToken => {
                                        setCookie("session", sessionToken);
                                        toast.success(`Logged in as ${y.user.displayName}`);
                                        window.location.reload();
                                    });
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
                            <input type="password" required name="password" className="min-h-8 rounded-md bg-[#12372A40] px-4 py-2 outline-none" />
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
                            setPage("login");
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

const PageComponent = () => {
    const { page } = usePageSwitching()!;

    if (page === "register") {
        return <Register />;
    }

    return <Login />;
};

export default function ClientAccountPage() {
    const [page, setPage] = useState("login");

    return <PageSwitchingContext.Provider value={{ page, setPage }}>
        <PageComponent />
    </PageSwitchingContext.Provider>;
}
