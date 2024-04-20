import { SearchQuery } from "@/components/SearchQuery";
import Image from "next/image";

export default function Home() {
    return (
        <>
            <div className="flex flex-col py-4 px-8 w-1/5 gap-10 bg-[#1B1B1B] min-h-screen">
                <div className="flex flex-row gap-4 items-center text-white">
                    <Image className="size-12 rounded-full" height={512} width={512} alt="Logo" src={"/Logo.png"} />
                    <p className="font-bold text-xl ">Foresia</p>
                </div>

                <SearchQuery />

                <div className="flex flex-col gap-4">
                    <p className="flex gap-2 items-center font-bold text-lg text-white">
                        <i className="fa-solid fa-home" />
                        Home
                    </p>
                    <div>
                        <p className="text-gray-400 font-medium">Popular subreddits</p>
                        <p className="text-gray-400 font-medium">Help & Settings</p>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <p className="flex gap-2 items-center font-bold text-white">
                        <i className="fa-solid fa-paper-plane" />
                        Topics
                    </p>
                    <div>
                        <p className="flex justify-between items-center text-gray-400">
                            <span className="flex gap-2 items-center">
                                <i className="fa-solid fa-gamepad w-6" />
                                Gaming
                            </span>

                            <i className="fa-solid fa-chevron-down" />
                        </p>
                        <p className="flex justify-between items-center text-gray-400">
                            <span className="flex gap-2 items-center">
                                <i className="fa-brands fa-bitcoin w-6" />
                                Crypto
                            </span>

                            <i className="fa-solid fa-chevron-down" />
                        </p>
                        <p className="flex justify-between items-center text-gray-400">
                            <span className="flex gap-2 items-center">
                                <i className="fa-solid fa-chart-line w-6" />
                                Business
                            </span>

                            <i className="fa-solid fa-chevron-down" />
                        </p>
                        <p className="flex justify-between items-center text-gray-400">
                            <span className="flex gap-2 items-center">
                                <i className="fa-solid fa-baseball w-6" />
                                Sports
                            </span>

                            <i className="fa-solid fa-chevron-down" />
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <p className="flex gap-2 items-center font-bold text-lg text-white">
                        <i className="fa-solid fa-comments" />
                        My Communities
                    </p>
                    <div>
                        <p className="text-gray-400 font-medium">fs/AskReddit</p>
                        <p className="text-gray-400 font-medium">fs/BlueArchive</p>
                        <p className="text-gray-400 font-medium">fs/DankMemes</p>
                        <p className="text-gray-400 font-medium">fs/Indonesia</p>
                        <p className="text-gray-400 font-medium">fs/GenshinImpact</p>
                    </div>
                </div>
            </div>
        </>
    );
}
