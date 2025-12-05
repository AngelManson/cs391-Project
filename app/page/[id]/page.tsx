/*
  Dynamic content page for a single lecture/resource.
  Route: /page/[id]
*/

import getCollection, { PAGES_COLLECTION } from "@/db";
import Header from "@/components/Header";
import {auth} from "@/auth";

type JsonPrimitive = string | number | boolean | null;
type JsonValue = JsonPrimitive | JsonValue[] | JsonObject;

interface JsonObject {
    [key: string]: JsonValue;
}

// NOTE: params is a Promise in Next 16 dynamic routes
interface ContentPageProps {
    params: Promise<{ id: string }>;
}

// turn "css_introduction" -> "Css introduction"
function formatKeyLabel(key: string): string {
    return key
        .replace(/_/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .replace(/^\w/, (c) => c.toUpperCase());
}

// recursively render any JSON shape (string, array, object)
function RenderValue({ value }: { value: JsonValue }) {
    if (
        typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean"
    ) {
        return <p className="mb-2 leading-relaxed">{String(value)}</p>;
    }

    if (value === null) {
        return <p className="mb-2 text-gray-500">null</p>;
    }

    if (Array.isArray(value)) {
        return (
            <ul className="list-disc pl-6 mb-3">
                {value.map((item, i) => (
                    <li key={i}>
                        <RenderValue value={item} />
                    </li>
                ))}
            </ul>
        );
    }

    // object
    return (
        <div className="ml-4 border-l border-gray-200 pl-4 space-y-3">
            {Object.entries(value).map(([k, v]) => (
                <div key={k}>
                    <h3 className="font-semibold mb-1">{formatKeyLabel(k)}</h3>
                    <RenderValue value={v} />
                </div>
            ))}
        </div>
    );
}

export default async function ContentPage({ params }: ContentPageProps) {
    const session = await auth();
    // 🔹 1) UNWRAP params (this fixes the warning)
    const { id } = await params;
    console.log("ContentPage id =", id);

    const collection = await getCollection(PAGES_COLLECTION);

    // 🔹 2) Try string _id first (what your docs look like in Compass)
    let doc = (await collection.findOne({ _id: id } as any)) as JsonObject | null;

    // Optional: fallback if this collection still has ObjectId _id’s
    if (!doc) {
        try {
            const { ObjectId } = await import("mongodb");
            if (ObjectId.isValid(id)) {
                console.log("Trying ObjectId path for id =", id);
                doc = (await collection.findOne(
                    { _id: new ObjectId(id) } as any
                )) as JsonObject | null;
            }
        } catch (e) {
            console.error("Error while trying ObjectId fallback:", e);
        }
    }

    console.log("ContentPage doc =", doc);

    if (!doc) {
        return <main className="p-10">Document not found.</main>;
    }

    // pick a nice title: source_document if present, otherwise the id
    const title =
        (doc.source_document as string | undefined) ??
        (doc.title as string | undefined) ??
        id;

    // filter out meta fields you don't want as sections
    const entries = Object.entries(doc).filter(
        ([key]) =>
            key !== "_id" &&
            key !== "source_document" &&
            key !== "title" &&
            key !== "searchText"
    );

    return (
        <main className="p-10 max-w-4xl mx-auto">
            <Header user={session?.user ?? null}/>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">{title}</h1>

            {entries.map(([key, value]) => (
                <section key={key} className="mb-8">
                    <h2 className="text-xl font-semibold mb-3">
                        {formatKeyLabel(key)}
                    </h2>
                    <RenderValue value={value} />
                </section>
            ))}
        </main>
    );
}

