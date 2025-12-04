/*
getSearch.ts is ONLY for searching
getSearch.ts performs Atlas Search queries across your entire documents collection.
It’s meant for:
Finding all documents matching a query
Ranking them
Returning search snippets
Powering /search?q=...
It is NOT meant to fetch a single document by ID.
 */
"use server";

import getCollection, { PAGES_COLLECTION } from "@/db";

export async function getSearch(query: string) {
    if (!query.trim()) return [];

    const collection = await getCollection(PAGES_COLLECTION);

    return await collection.aggregate([
        {
            $search: {
                index: "default",
                text: {
                    query,
                    path: ["title", "searchText"]
                }
            }
        },
        {
            $project: {
                title: 1,
                searchText: 1,
                score: { $meta: "searchScore" }
            }
        },
        { $limit: 20 }
    ]).toArray();
}
