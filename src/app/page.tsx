import { SearchQuery } from "@/components/SearchQuery";
import Image from "next/image";

export default function Home() {
    return (
        <>
            <div className="flex min-h-screen w-full flex-col gap-10 bg-[#1B1B1B] px-8 py-4 md:w-fit">
                <div className="flex flex-row items-center gap-4 text-white">
                    <Image className="size-12 rounded-full" height={512} width={512} alt="Logo" src={"/Logo.png"} />
                    <p className="text-xl font-bold ">Foresia</p>
                </div>

                <SearchQuery />

                <div className="flex flex-col gap-4">
                    <p className="flex items-center gap-2 text-lg font-bold text-white">
                        <i className="fa-solid fa-home" />
                        Home
                    </p>
                    <div className="font-medium">
                        <p className="font-medium text-gray-400">Popular subreddits</p>
                        <p className="font-medium text-gray-400">Help & Settings</p>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <p className="flex items-center gap-2 font-bold text-white">
                        <i className="fa-solid fa-paper-plane" />
                        Topics
                    </p>
                    <div>
                        <p className="flex items-center justify-between font-medium text-gray-400">
                            <span className="flex items-center gap-2">
                                <i className="fa-solid fa-gamepad w-6" />
                                Gaming
                            </span>

                            <i className="fa-solid fa-chevron-down" />
                        </p>
                        <p className="flex items-center justify-between font-medium text-gray-400">
                            <span className="flex items-center gap-2">
                                <i className="fa-brands fa-bitcoin w-6" />
                                Crypto
                            </span>

                            <i className="fa-solid fa-chevron-down" />
                        </p>
                        <p className="flex items-center justify-between font-medium text-gray-400">
                            <span className="flex items-center gap-2">
                                <i className="fa-solid fa-chart-line w-6" />
                                Business
                            </span>

                            <i className="fa-solid fa-chevron-down" />
                        </p>
                        <p className="flex items-center justify-between font-medium text-gray-400">
                            <span className="flex items-center gap-2">
                                <i className="fa-solid fa-baseball w-6" />
                                Sports
                            </span>

                            <i className="fa-solid fa-chevron-down" />
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <p className="flex items-center gap-2 text-lg font-bold text-white">
                        <i className="fa-solid fa-comments" />
                        My Communities
                    </p>
                    <div>
                        <p className="font-medium text-gray-400">fs/AskReddit</p>
                        <p className="font-medium text-gray-400">fs/BlueArchive</p>
                        <p className="font-medium text-gray-400">fs/DankMemes</p>
                        <p className="font-medium text-gray-400">fs/Indonesia</p>
                        <p className="font-medium text-gray-400">fs/GenshinImpact</p>
                    </div>
                </div>
            </div>
        </>
    );
}
