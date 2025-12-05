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

    // console.log("QUERY:", query);
    //
    // const count = await collection.countDocuments();
    // console.log("TOTAL DOCS:", count);
    //
    // const sample = await collection.find().limit(1).toArray();
    // console.log("SAMPLE DOC:", sample[0]);

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
                    _id: "$_id",
                    title: "$source_document",
                    // searchText: 1,
                    // rawDoc: "$$ROOT", //for testing
                    // searchText: {
                    //     $meta: "searchHighlights"
                    // },
                    searchText: 1,
                    score: {$meta: "searchScore"}
                }
            },
            {$limit: 20}
        ]).toArray();

        //logs for testing
        // console.log("rawDoc", result[0].rawDoc)
        // console.log("searchText", result[0].searchText)
        all_results = all_results.concat(result);
    }

    // //made a function to retrieve all the words from nested fields
    // function flattenText(obj: any): string {
    //     const fin_val: string[] = [];
    //
    //     function recurse(value: any) {
    //         if (value == null) return;
    //
    //         // If string then just store it
    //         if (typeof value === "string") {
    //             fin_val.push(value);
    //         }
    //
    //         // If array then process each element
    //         else if (Array.isArray(value)) {
    //             value.forEach((v) => recurse(v));
    //         }
    //
    //         // If object then process each key
    //         else if (typeof value === "object") {
    //             Object.values(value).forEach((v) => recurse(v));
    //         }
    //     }
    //
    //     recurse(obj);
    //     return fin_val.join(" ");
    // }

    // // return all_results
    // all_results = all_results.map(doc => {
    //     return {
    //         ...doc,
    //         // searchText: Object.values(doc)
    //         //     .flat()
    //         //     .join(" ")
    //         searchText: flattenText(doc)
    //     };
    // });

    return all_results;
}
