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

import client from "./mongo";

export async function getSearch(query: string) {
    if (!query.trim()) return [];

    const db = (await client).db("searchdb");

    return await db.collection("documents").aggregate([
        {
            $search: {
                index: "default",
                text: { query, path: ["title", "searchText"] }
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
