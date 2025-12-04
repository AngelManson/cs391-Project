/*
this is the page that will dynamically turn every document into page
Uses findOne(),
 */
import client from "@/lib/mongo";
import { ObjectId } from "mongodb";

export default async function DocPage({ params }: any) {
    const db = (await client).db("searchdb");

    const doc = await db.collection("documents").findOne({
        _id: new ObjectId(params.id)
    });

    if (!doc) return <div className="p-10">Document not found.</div>;

    return (
        <main className="p-10 max-w-4xl mx-auto">
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
                                    {block.items.map((it: string, k: number) => (
                                        <li key={k}>{it}</li>
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
