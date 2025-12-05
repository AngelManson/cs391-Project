"use client";
import Image from "next/image";
import logo from "@/src/logo.png";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {

    const [query, setQuery] = useState("");
    const router = useRouter();   //added for routing to search

    function handleSearch (e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!query.trim()) return;

        // Navigate to /search?q=your-query
        router.push(`/search?q=${encodeURIComponent(query)}`);
    };

    return (
        <main className="flex flex-col items-center justify-center w-full bg-white px-4">

                <Image
                    src={logo}
                    alt="our website logo"
                    className="!mb-8"
           />



            <form
                onSubmit={handleSearch}
                className="w-full max-w-xl flex flex-col items-center"
            >
                <div className="w-full flex items-center border border-gray-300 rounded-full px-6 py-3 shadow-sm hover:shadow-md transition">
                    <input
                        type="text"
                        placeholder="Search lectures, slides, concepts..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="flex-grow outline-none text-lg"
                    />
                </div>

                <button
                    type="submit"
                    className="!mt-6 bg-blue-900 hover:bg-blue-800 text-white px-6 py-2 rounded-lg border border-gray-300 transition cursor-pointer"
                >
                    Search
                </button>
            </form>
        </main>
    );

}