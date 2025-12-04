/*
General Results page
✔ Search Page (/search)
Uses getSearch.ts to get matching documents:
*/

import { getSearch } from "@/lib/getSearch";

export default async function SearchPage({ searchParams } : any) {
    const params = await searchParams;
    const query = params.q || "";

    const results = await getSearch(query);

    return (
        <main className="px-6 py-10 max-w-3xl mx-auto">
            <h1 className="text-lg text-gray-700 mb-6">
                Results for: <span className="font-semibold">{query}</span>
            </h1>

            <div className="space-y-6">
                {results.map((doc) => (
                    <a
                        key={doc.title}
                        href={`/doc/${doc.title}`}
                        className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                    >
                        <h2 className="text-xl font-semibold">{doc.title}</h2>
                        <p className="text-sm text-gray-600 mt-1">
                            {doc.searchText?.slice(0, 180)}...
                        </p>
                    </a>
                ))}
            </div>

            {results.length === 0 && (
                <p className="text-gray-500 mt-10">No results found.</p>
            )}
        </main>
    );
}
