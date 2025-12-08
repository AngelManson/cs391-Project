/*
Done by Cheyenne Mowatt
Before this, I worked on the turning the PDFs into JSON, inputted them into the collection, and did a lot of research on AtlasSearch. This is what gets the search to actually run. getSearch.ts performs Atlas Search queries across our entire MongoDB documents collection.
While I didn't copy code from the internet, I read a lot of documentation from the Mongodb AtlasSearch website to learn more about it: https://www.mongodb.com/docs/atlas/atlas-search/tutorial/?deployment-type=atlas&language-atlas-only-2=atlas-ui&tck=as_web_get_started
*/
//This is done by Cheyenne Mowatt
"use server";

import getCollection, { PAGES_COLLECTION } from "@/db";

export async function getSearch(query: string) {
    // If user typed nothing, just return nothing
    if (!query.trim()) return [];
    // Get the MongoDB collection that stores all parsed page documents
    const collection = await getCollection(PAGES_COLLECTION);

    //Used this for debugging
    // console.log("QUERY:", query);
    //
    // const count = await collection.countDocuments();
    // console.log("TOTAL DOCS:", count);
    //
    // const sample = await collection.find().limit(1).toArray();
    // console.log("SAMPLE DOC:", sample[0]);

    //Allow searching across multiple Atlas Search indexes.
    const indexes = ["default", "default_1", "default_2"];

    // Collect results from all indexes so we can merge them together
    let all_results : any[] = [];

    // Loop through each index and run the same search query
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
            // Shapes the document returned from Atlas Search.
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
