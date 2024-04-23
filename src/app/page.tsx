import { SearchQuery } from "@/components/SearchQuery";
import { Bitcoin, ChevronDown, ChevronUp, Dumbbell, Gamepad2, LineChart, MessageCircleMore, Navigation, UsersRound } from "lucide-react";
import Image from "next/image";

export default function Home() {
    return (
        <>
            <div className="flex flex-row overflow-x-hidden">
                <div className="flex min-h-screen w-full flex-col gap-10 bg-[#1B1B1B] px-8 py-4 md:w-80">
                    <div className="flex flex-row items-center gap-4 text-white">
                        <Image className="size-12 rounded-full" height={512} width={512} alt="Logo" src={"/Logo.png"} />
                        <p className="text-xl font-bold ">Foresia</p>
                    </div>

                    <SearchQuery />

                    <div className="flex flex-col gap-4">
                        <p className="flex items-center gap-2 text-lg font-bold text-white">
                            <Navigation strokeWidth={3} />
                        Navigation
                        </p>
                        <div className="font-medium">
                            <p className="font-medium text-gray-400">Popular Subrealms</p>
                            <p className="font-medium text-gray-400">Help & Settings</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <p className="flex items-center gap-2 font-bold text-white">
                            <UsersRound strokeWidth={3} />
                        Topics
                        </p>
                        <div>
                            <p className="flex items-center justify-between font-medium text-gray-400">
                                <span className="flex items-center gap-2">
                                    <Gamepad2 size={16} />
                                Gaming
                                </span>

                                <ChevronDown />
                            </p>
                            <p className="flex items-center justify-between font-medium text-gray-400">
                                <span className="flex items-center gap-2">
                                    <Bitcoin size={16} />
                                Crypto
                                </span>

                                <ChevronDown />
                            </p>
                            <p className="flex items-center justify-between font-medium text-gray-400">
                                <span className="flex items-center gap-2">
                                    <LineChart size={16} />
                                Business
                                </span>

                                <ChevronDown />
                            </p>
                            <p className="flex items-center justify-between font-medium text-gray-400">
                                <span className="flex items-center gap-2">
                                    <Dumbbell size={16} />
                                Sports
                                </span>

                                <ChevronDown />
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <p className="flex items-center gap-2 text-lg font-bold text-white">
                            <MessageCircleMore strokeWidth={3} />
                        My Communities
                        </p>
                        <div>
                            <p className="font-medium text-gray-400">fs/AskForesia</p>
                            <p className="font-medium text-gray-400">fs/BlueArchive</p>
                            <p className="font-medium text-gray-400">fs/DankMemes</p>
                            <p className="font-medium text-gray-400">fs/Indonesia</p>
                            <p className="font-medium text-gray-400">fs/GenshinImpact</p>
                        </div>
                    </div>
                </div>

                <div className="container flex max-w-6xl flex-col p-10">
                    <div className="flex h-fit flex-col gap-4 rounded-md pb-6 xl:hidden">
                        <p className="text-4xl font-bold uppercase text-white">Popular Communities</p>

                        <div className="flex gap-2 overflow-x-auto">
                            <div className="flex shrink-0 flex-row items-center gap-4 rounded-t-md bg-[#1B1B1B] px-6 py-4">
                                <Image width={512} height={512} className="size-10 rounded-full" alt="Realm Icon" src={"https://cdn.discordapp.com/icons/1174136473038102528/def89269b0dc43e9d942dafc7c0a2ba4.png?size=1024"} />
                                <p className="flex flex-col text-gray-400">
                                    <span className="font-semibold">fs/Kakushin</span>
                                    <span className="-mt-2">6,000,000 Members</span>
                                </p>
                            </div>

                            <div className="flex shrink-0 flex-row items-center gap-4 rounded-t-md bg-[#1B1B1B] px-6 py-4">
                                <Image width={512} height={512} className="size-10 rounded-full" alt="Realm Icon" src={"https://cdn.discordapp.com/icons/1083698573272678400/d50dc82723fce54f50a83a4719306836.png?size=512"} />
                                <p className="flex flex-col text-gray-400">
                                    <span className="font-semibold">fs/GTID</span>
                                    <span className="-mt-2">6,000,000 Members</span>
                                </p>
                            </div>

                            <div className="flex shrink-0 flex-row items-center gap-4 rounded-t-md bg-[#1B1B1B] px-6 py-4">
                                <Image width={512} height={512} className="size-10 rounded-full" alt="Realm Icon" src={"https://cdn.discordapp.com/icons/785715968608567297/a_805876822ec4a131b8ee55942dac073f.png?size=1024"} />
                                <p className="flex flex-col text-gray-400">
                                    <span className="font-semibold">fs/NezukoChanTavern</span>
                                    <span className="-mt-2">6,000,000 Members</span>
                                </p>
                            </div>

                            <div className="flex shrink-0 flex-row items-center gap-4 rounded-t-md bg-[#1B1B1B] px-6 py-4">
                                <Image width={512} height={512} className="size-10 rounded-full" alt="Realm Icon" src={"https://cdn.discordapp.com/icons/226636368258924544/9c2c36dc953c421f807608935de5a15e.png"} />
                                <p className="flex flex-col text-gray-400">
                                    <span className="font-semibold">fs/TerrariaMagyarul</span>
                                    <span className="-mt-2">6,000,000 Members</span>
                                </p>
                            </div>

                            <div className="flex shrink-0 flex-row items-center gap-4 rounded-t-md bg-[#1B1B1B] px-6 py-4">
                                <Image width={512} height={512} className="size-10 rounded-full" alt="Realm Icon" src={"https://cdn.discordapp.com/icons/226636368258924544/9c2c36dc953c421f807608935de5a15e.png"} />
                                <p className="flex flex-col text-gray-400">
                                    <span className="font-semibold">fs/TerrariaMagyarul</span>
                                    <span className="-mt-2">6,000,000 Members</span>
                                </p>
                            </div>

                            <div className="flex shrink-0 flex-row items-center gap-4 rounded-t-md bg-[#1B1B1B] px-6 py-4">
                                <Image width={512} height={512} className="size-10 rounded-full" alt="Realm Icon" src={"https://cdn.discordapp.com/icons/226636368258924544/9c2c36dc953c421f807608935de5a15e.png"} />
                                <p className="flex flex-col text-gray-400">
                                    <span className="font-semibold">fs/TerrariaMagyarul</span>
                                    <span className="-mt-2">6,000,000 Members</span>
                                </p>
                            </div>

                            <div className="flex shrink-0 flex-row items-center gap-4 rounded-t-md bg-[#1B1B1B] px-6 py-4">
                                <Image width={512} height={512} className="size-10 rounded-full" alt="Realm Icon" src={"https://cdn.discordapp.com/icons/226636368258924544/9c2c36dc953c421f807608935de5a15e.png"} />
                                <p className="flex flex-col text-gray-400">
                                    <span className="font-semibold">fs/TerrariaMagyarul</span>
                                    <span className="-mt-2">6,000,000 Members</span>
                                </p>
                            </div>

                            <div className="flex shrink-0 flex-row items-center gap-4 rounded-t-md bg-[#1B1B1B] px-6 py-4">
                                <Image width={512} height={512} className="size-10 rounded-full" alt="Realm Icon" src={"https://cdn.discordapp.com/icons/226636368258924544/9c2c36dc953c421f807608935de5a15e.png"} />
                                <p className="flex flex-col text-gray-400">
                                    <span className="font-semibold">fs/TerrariaMagyarul</span>
                                    <span className="-mt-2">6,000,000 Members</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="relative flex w-full flex-row gap-4">
                        <div className="size-full max-w-4xl gap-4">
                            <div className="flex cursor-pointer flex-row gap-6 rounded-md p-4 hover:bg-[#12372A40]">
                                <div className="flex flex-col items-center text-xl text-white">
                                    <ChevronUp size={36} strokeWidth={3} />
                                    <p>2.5K</p>
                                    <ChevronDown size={36} strokeWidth={3} />
                                </div>

                                <div className="flex flex-col gap-3">
                                    <div className="flex h-12 flex-row gap-2">
                                        <Image width={512} height={512} className="size-10 rounded-full" alt="User" src={"https://cdn.discordapp.com/avatars/597678468280614922/a39daa2dd7e9bea3c68ac80515f3c45a.png?size=1024"} />
                                        <p className="flex flex-col text-white">
                                            <span className="font-bold">fs/AskForesia</span>
                                            <span className="-mt-1 text-gray-400">Posted by ArkanDash</span>
                                        </p>
                                    </div>
                                    <p className="text-white">
                                        <span className="line-clamp-1 text-2xl font-bold">
                                        Why does KannaChan is a Cute characters?
                                        </span>
                                        <span className="line-clamp-3 text-sm text-gray-400">
                                    Kanna Kamui (神凪 カンナ, Kanna Kamui) is a young dragon girl from the world of dragons who becomes Miss Kobayashi adopted daughter.
                                    Kanna has long, white hair with a distinctive ahoge (a single strand of hair that sticks up) and bright blue eyes.
                                    She often wears a school uniform or a casual outfit with a tail accessory. In her dragon form, she has white scales and powerful wings.
                                        </span>
                                    </p>
                                    <Image height={1920} width={1280} className="h-[22rem] rounded-lg object-cover" alt="Content" src={"https://cdn.discordapp.com/attachments/1174136474250248204/1231795766776041534/th.png?ex=66384234&is=6625cd34&hm=01c577b8c91847fe94d93f8c5a3055993ba38dd9b73a4f808739341418b300a8&"} />
                                </div>
                            </div>

                            <div className="flex cursor-pointer flex-row gap-6 rounded-md p-4 hover:bg-[#12372A40]">
                                <div className="flex flex-col items-center text-xl text-white">
                                    <ChevronUp size={36} strokeWidth={3} />
                                    <p>1.5K</p>
                                    <ChevronDown size={36} strokeWidth={3} />
                                </div>

                                <div className="flex flex-col gap-3">
                                    <div className="flex h-12 flex-row gap-2">
                                        <Image width={512} height={512} className="size-10 rounded-full" alt="User" src={"https://cdn.discordapp.com/avatars/597678468280614922/a39daa2dd7e9bea3c68ac80515f3c45a.png?size=1024"} />
                                        <p className="flex flex-col text-white">
                                            <span className="font-bold">fs/BlueArchive</span>
                                            <span className="-mt-1 text-gray-400">Posted by ArkanDash</span>
                                        </p>
                                    </div>
                                    <p className="text-white">
                                        <span className="line-clamp-1 text-2xl font-bold">
                                        Why does Arisu is a Cute characters?
                                        </span>
                                        <span className="line-clamp-3 text-sm text-gray-400">
                                    Student of Millennium and member of the Game development club.
                                    She was found sleeping inside some ruins. Everything about her is unknown, including her age.
                                    Currently, she enjoys playing videogames with Momoi, Midori and Yuzu and has become a serious game maniac.
                                    Because she picks up lines from retro games, her speech tends to be hesitant and unnatural.
                                        </span>
                                    </p>
                                    <Image height={1920} width={1280} className="h-[22rem] rounded-lg object-cover" alt="Content" src={"https://cdn.discordapp.com/attachments/1174136474250248204/1231799616253722757/artwork.png?ex=663845ca&is=6625d0ca&hm=4fd68774b50b025129bf4a23bfe03c7bbaad99e104aeab24af25dfc8c21056b6&"} />
                                </div>
                            </div>
                        </div>

                        <div className="sticky right-0 top-0 z-10 hidden h-fit w-96 flex-col gap-4 rounded-md bg-[#1B1B1B] p-4 xl:flex">
                            <p className="font-bold uppercase text-gray-400">Popular Communities</p>

                            <div className="flex flex-col gap-2">
                                <div className="flex flex-row items-center gap-4">
                                    <Image width={512} height={512} className="size-10 rounded-full" alt="Realm Icon" src={"https://cdn.discordapp.com/icons/1174136473038102528/def89269b0dc43e9d942dafc7c0a2ba4.png?size=1024"} />
                                    <p className="flex flex-col text-gray-400">
                                        <span className="font-semibold">fs/Kakushin</span>
                                        <span className="-mt-2">6,000,000 Members</span>
                                    </p>
                                </div>

                                <div className="flex flex-row items-center gap-4">
                                    <Image width={512} height={512} className="size-10 rounded-full" alt="Realm Icon" src={"https://cdn.discordapp.com/icons/1083698573272678400/d50dc82723fce54f50a83a4719306836.png?size=512"} />
                                    <p className="flex flex-col text-gray-400">
                                        <span className="font-semibold">fs/GTID</span>
                                        <span className="-mt-2">6,000,000 Members</span>
                                    </p>
                                </div>

                                <div className="flex flex-row items-center gap-4">
                                    <Image width={512} height={512} className="size-10 rounded-full" alt="Realm Icon" src={"https://cdn.discordapp.com/icons/785715968608567297/a_805876822ec4a131b8ee55942dac073f.png?size=1024"} />
                                    <p className="flex flex-col text-gray-400">
                                        <span className="font-semibold">fs/NezukoChanTavern</span>
                                        <span className="-mt-2">6,000,000 Members</span>
                                    </p>
                                </div>

                                <div className="flex flex-row items-center gap-4">
                                    <Image width={512} height={512} className="size-10 rounded-full" alt="Realm Icon" src={"https://cdn.discordapp.com/icons/226636368258924544/9c2c36dc953c421f807608935de5a15e.png"} />
                                    <p className="flex flex-col text-gray-400">
                                        <span className="font-semibold">fs/TerrariaMagyarul</span>
                                        <span className="-mt-2">6,000,000 Members</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
