export default function Create() {
    return (
        <>
            <div className="container flex w-full flex-col gap-2 p-10 lg:max-w-6xl">
                <p className="text-4xl font-bold text-white">Create new post</p>

                <div className="mt-12 flex flex-col gap-2">
                    <div className="flex flex-col gap-2 text-white">
                        <p className="text-2xl font-semibold">Post title<span className="text-red-500">*</span></p>
                        <input className="min-h-8 w-full rounded-md bg-[#1B1B1B] p-2 outline-none md:w-4/5" />
                    </div>

                    <div className="flex flex-col gap-2 text-white">
                        <p className="text-2xl font-semibold">Your message<span className="text-red-500">*</span></p>
                        <textarea className="max-h-72 min-h-72 w-full rounded-md bg-[#1B1B1B] p-2 outline-none md:w-4/5" />
                    </div>

                    <div className="flex flex-col gap-2 text-white">
                        <p className="text-2xl font-semibold">Community<span className="text-red-500">*</span></p>
                        <textarea className="max-h-72 min-h-72 w-full rounded-md bg-[#1B1B1B] p-2 outline-none md:w-4/5" />
                    </div>
                </div>
            </div>
        </>
    );
}
