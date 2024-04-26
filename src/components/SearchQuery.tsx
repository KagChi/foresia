"use client";

import { Search } from "lucide-react";
import { useState } from "react";

export const SearchQuery = () => {
    const [query, setQuery] = useState("");

    return (
        <div className="flex flex-row items-center gap-6 rounded-md bg-[#12372A] px-4 py-3 text-center text-sm text-white opacity-60">
            <a aria-label="Search realm.." href={`/search?query=${encodeURIComponent(query)}`}>
                <Search />
            </a>
            <input onKeyDown={e => {
                if (e.key === "Enter" && query.length) {
                    window.location.replace(`/search?query=${encodeURIComponent(query)}`);
                }
            }} onInput={e => setQuery(e.currentTarget.value)} style={{ all: "unset" }} className="bg-none placeholder:text-lg" placeholder="Search for realm..." />
        </div>
    );
};
