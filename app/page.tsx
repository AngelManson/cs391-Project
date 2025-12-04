"use client";

import { useState } from "react";

export default function HomePage() {

    const [query, setQuery] = useState("");

    function handleSearch (e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();

        //add navigation to results page with query
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
            {/* Page Title (optional) */}
            <h1 className="text-4xl font-semibold mb-10 text-gray-800">
                CS391 Search
            </h1>

            {/* Search bar */}
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
                    className="mt-6 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg border border-gray-300 transition"
                >
                    Search
                </button>
            </form>
        </main>
    );
}