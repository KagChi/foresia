import { feedCommunityPost } from "@/actions/Community";
import { DefaultContentCard } from "@/components/ContentCard";

export default async function Home() {
    const posts = await feedCommunityPost();

    return (
        <>
            <div className="container relative flex flex-col items-center gap-2 p-10">
                <div className="flex max-w-3xl flex-col gap-4">
                    <>
                        {posts.data.length >= 1 &&
                            posts.data.map((x, i) => <DefaultContentCard
                                key={i}
                                slug={x.slug}
                                user={x.author.nick}
                                community={x.community.name}
                                title={x.title}
                                description={x.message ? `${x.message.length >= 521 ? `${x.message.slice(0, 520)}...` : x.message}` : ""}
                            />)
                        }

                        {
                            posts.data.length <= 0 && <>
                                <p className="mt-4 px-2 text-lg text-white">Its so quite here... create post now!</p>
                            </>
                        }
                    </>
                </div>
            </div>
        </>
    );
}
