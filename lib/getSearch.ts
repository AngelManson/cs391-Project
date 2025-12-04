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

    console.log("QUERY:", query);

    const count = await collection.countDocuments();
    console.log("TOTAL DOCS:", count);

    const sample = await collection.find().limit(1).toArray();
    console.log("SAMPLE DOC:", sample[0]);

    const indexes = ["default", "default_1", "default_2"];

    let all_results : any[] = [];

    for (const index of indexes) {
        const result = await collection.aggregate([
            {
                $search: {
                    index: index,
                    text: {
                        query,
                        // path: ["title", "searchText"]
                        path: {
                            wildcard: "*" //to allow search through every field
                        }
                    }
                }
            },
            {
                $project: {
                    title: "$_id",
                    // searchText: 1,
                    searchText: {
                        $meta: "searchHighlights"  // highlight matched text
                    },
                    score: {$meta: "searchScore"}
                }
            },
            {$limit: 20}
        ]).toArray();

        all_results = all_results.concat(result);
    }

    return all_results
}
