/*
Done by Angel Manson
This file renders the results provided by MongoDB Altas Search
It will render each individual result similar to how Google showcases the results
*/

import { getSearch } from "@/lib/getSearch";
import Link from "next/link";
import Header from "@/components/Header";
import {auth} from "@/auth";

// had to use any as the type due to our jsons being different for each lecture slide
export default async function SearchPage({ searchParams } : any) {
    // for authentication
    const session = await auth();
    // retrieve the params and get query from the params using .q
    const params = await searchParams;
    const query = params.q || "";

    // get the results from Atlas Search
    const results = await getSearch(query);

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-8 flex justify-center">
            <div className="w-full max-w-3xl">
                {/*for authentication */}
                <div className="flex justify-center">
                    <Header user={session?.user ?? null} />
                </div>

                <h1 className="!mt-6 !mb-6 text-lg text-center text-slate-500">
                    Results for: <span className="font-semibold text-blue-900">{query}</span>
                </h1>

                <div className="space-y-4">
                    {/* if there are results then for each we will display the title and a portion of the data from
                    the document in Mongo which is stored under the searchText field in each document */}
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

                {/*if there are no results we will instead return this: */}
                {results.length === 0 && (
                    <p className="!mt-10 text-center text-slate-500">
                        No results found. Try another keyword.
                    </p>
                )}
            </div>
        </main>
    );
}
