/*
this is the page that will dynamically turn every document into page
Uses findOne(),
 */
import getCollection, { PAGES_COLLECTION } from "@/db";
// import { ObjectId } from "mongodb"; don't think we need

export default async function ContentPage({params} : {params: Promise<{id:any}>}) {
    const collection = await getCollection(PAGES_COLLECTION);
    const {id} = await params;

    const doc = await collection.findOne({ _id: id });

    if (!doc) {
        return <main className="p-10">Document not found.</main>;
    }

    return (
        <main className="p-10 max-w-4xl mx-auto">

            {/*test title to see if the doc is even being rendered*/}
            <h1 className="text-3xl font-bold text-gray-900">YES</h1>
            {/*This shows that it is being rendered but the code below is incorrect and fails to pull info from
            the data ...*/}

            <h1 className="text-4xl font-bold mb-8">{doc.title}</h1>

            {doc.pages?.map((page: any, i: number) => (
                <section key={i} className="mb-10">
                    <h2 className="text-gray-500 text-sm mb-4">Page {page.number}</h2>

                    {page.content.map((block: any, j: number) => {
                        if (block.type === "heading") {
                            return (
                                <h3 key={j} className="text-2xl font-semibold mt-6 mb-2">
                                    {block.text}
                                </h3>
                            );
                        }

                        if (block.type === "paragraph") {
                            return (
                                <p key={j} className="leading-relaxed mb-4">
                                    {block.text}
                                </p>
                            );
                        }

                        if (block.type === "list") {
                            return (
                                <ul key={j} className="list-disc pl-6 mb-4">
                                    {block.items.map((item: string, k: number) => (
                                        <li key={k}>{item}</li>
                                    ))}
                                </ul>
                            );
                        }

                        return null;
                    })}
                </section>
            ))}
        </main>
    );
}
