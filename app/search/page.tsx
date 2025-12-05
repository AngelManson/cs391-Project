/*
General Results page
✔ Search Page (/search)
Uses getSearch.ts to get matching documents:
*/

import { getSearch } from "@/lib/getSearch";
import Link from "next/link";
import Header from "@/components/Header";
import {auth} from "@/auth";


export default async function SearchPage({ searchParams } : any) {
    const session = await auth();
    const params = await searchParams;
    const query = params.q || "";

    const results = await getSearch(query);

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-8 flex justify-center">
            <div className="w-full max-w-3xl">
                <div className="flex justify-center">
                    <Header user={session?.user ?? null} />
                </div>

                <h1 className="!mt-6 !mb-6 text-lg text-center text-slate-500">
                    Results for:{" "}
                    <span className="font-semibold text-blue-900">{query}</span>
                </h1>

                <div className="space-y-4">
                    {results.map((doc: any) => (
                        <Link
                            key={doc._id}
                            href={`/page/${doc._id}`}
                            className="block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:shadow-md"
                        >
                            <h2 className="text-lg font-semibold text-blue-900">
                                {doc.title}
                            </h2>
                            <p className="!mt-1 text-sm text-slate-600">
                                {doc.searchText?.slice(0, 220)}...
                            </p>
                        </Link>
                    ))}
                </div>

                {results.length === 0 && (
                    <p className="!mt-10 text-center text-slate-500">
                        No results found. Try another keyword.
                    </p>
                )}
            </div>
        </main>
    );
}
