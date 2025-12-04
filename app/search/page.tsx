/*
General Results page
✔ Search Page (/search)
Uses getSearch.ts to get matching documents:
 */

"use client";

import { useEffect, useState } from "react";
import { getSearch } from "@/lib/getSearch";

export default function SearchResultsPage({ searchParams }: any) {
    const query = searchParams.q || "";
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchResults() {
            if (!query.trim()) return;
            const res = await getSearch(query);
            setResults(res);
            setLoading(false);
        }
        fetchResults();
    }, [query]);

    return (
        <main className="px-6 py-10 max-w-3xl mx-auto">
            <h1 className="text-lg text-gray-700 mb-6">
                Search results for: <span className="font-semibold">{query}</span>
            </h1>

            {loading && <p className="text-gray-500">Loading...</p>}

            <div className="space-y-6">
                {results.map((r) => (
                    <a
                        key={r._id}
                        href={`/doc/${r._id}`}
                        className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                    >
                        <h2 className="text-xl font-semibold">{r.title}</h2>
                        <p className="text-gray-600 text-sm mt-1">
                            {r.searchText?.slice(0, 160)}...
                        </p>
                    </a>
                ))}
            </div>

            {!loading && results.length === 0 && (
                <p className="text-gray-500 mt-6">No results found.</p>
            )}
        </main>
    );
}
