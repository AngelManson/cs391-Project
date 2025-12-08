"use client";
import Image from "next/image";
import logo from "@/src/logo.png";
import { useState } from "react";
import { useRouter } from "next/navigation";
// Completed by: Esraa Sabr
// Spoke to Professor Davoodi about using useRouter & was told it's okay to use.
// What useRouter does: useRouter is used to redirect user to '/search?q=...' after they submit a query.
// Why we needed it: we needed useRouter to connect the user's search input to the database.
// The database query happens on the `/search` page, so I needed a way to send the user there with their typed keyword.
// Source: Next.js Official Docs on useRouter: https://nextjs.org/docs/app/api-reference/functions/use-router
// How it relates to the rest of my code:
//    I store the user's input using React state (`useState`), when the user clicks the search button, `handleSearch`
//    reads the input and uses `router.push()` to go to `/search?q=<the user’s query>`. The Search page then reads that
//    `q` value from the URL and uses it to fetch results from the MongoDB database.

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