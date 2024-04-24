import { ContentCard } from "@/components/ContentCard";
import { PencilLine } from "lucide-react";

export default function Home() {
    return (
        <>
            <div className="container relative flex w-full flex-col gap-2 p-10 lg:max-w-6xl">
                <a href="/create" className="fixed bottom-4 right-4 z-50 flex items-center rounded-full bg-[#12372A] p-3">
                    <PencilLine color="white" />
                </a>

                <div className="flex flex-col gap-4">
                    <ContentCard
                        avatar="https://cdn.discordapp.com/avatars/597678468280614922/a39daa2dd7e9bea3c68ac80515f3c45a.png?size=1024"
                        user="ArkanDash"
                        community="AskForesia"
                        image="https://cdn.discordapp.com/attachments/1174136474250248204/1231795766776041534/th.png?ex=66384234&is=6625cd34&hm=01c577b8c91847fe94d93f8c5a3055993ba38dd9b73a4f808739341418b300a8&"
                        title="Why does KannaChan is a Cute characters?"
                        description="Kanna Kamui (神凪 カンナ, Kanna Kamui) is a young dragon girl from the world of dragons who becomes Miss Kobayashi adopted daughter.
                                    Kanna has long, white hair with a distinctive ahoge (a single strand of hair that sticks up) and bright blue eyes.
                                    She often wears a school uniform or a casual outfit with a tail accessory. In her dragon form, she has white scales and powerful wings."
                        imageKey="1" />

                    <ContentCard
                        avatar="https://cdn.discordapp.com/avatars/597678468280614922/a39daa2dd7e9bea3c68ac80515f3c45a.png?size=1024"
                        user="ArkanDash"
                        community="BlueArchive"
                        image="https://cdn.discordapp.com/attachments/1174136474250248204/1231799616253722757/artwork.png?ex=663845ca&is=6625d0ca&hm=4fd68774b50b025129bf4a23bfe03c7bbaad99e104aeab24af25dfc8c21056b6&&w=1920&q=75"
                        title="Why does Arisu is a Cute characters?"
                        description="Student of Millennium and member of the Game development club. She was found sleeping inside some ruins. Everything about her is unknown, including her age. Currently, she enjoys playing videogames with Momoi, Midori and Yuzu and has become a serious game maniac. Because she picks up lines from retro games, her speech tends to be hesitant and unnatural."
                        imageKey="2" />
                </div>
            </div>
        </>
    );
}
