/*
  Dynamic content page for a single lecture/resource.
  Completed by: Esraa Sabr
  This page is responsible for displaying the full content of whatever search result
  the user clicks.
  When the user selects a result, the page receives its ID from the URL. I use that ID to query our MongoDB
  database and retrieve the full document.
  Once the document is found, the page extracts the title and all the content fields. Then I render each section using
  a custom RenderValue component that can display text, lists, and nested objects.
*/

import getCollection, { PAGES_COLLECTION } from "@/db";
import Header from "@/components/Header";
import {auth} from "@/auth";

import {ContentPageProps} from "@/types/ContentPageProps";
import {JsonObject} from "@/types/ContentPageProps";
import RenderValue from "@/components/RenderValue";



export default async function ContentPage({ params }: ContentPageProps) {

    // turn "css_introduction" -> "Css introduction"
    // Makes section titles readable.
    function formatKeyLabel(key: string): string {
        return key
            .replace(/_/g, " ")
            .replace(/\s+/g, " ")
            .trim()
            .replace(/^\w/, (c) => c.toUpperCase());
    }

    const session = await auth();

    // Route params are a promise so have to await it.
    const { id } = await params;
    console.log("ContentPage id =", id);

    const collection = await getCollection(PAGES_COLLECTION);

    //Try fetching document using string _id first since our DB mainly uses string ids
    let doc = (await collection.findOne({ _id: id } as any)) as JsonObject | null;

    // Fallback: If some documents still use ObjectId _id’s, try querying that way.
    // We wrote this in case the dataset isn’t fully normalized.
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
    // If no document is found, display a "Document not found" page.
    if (!doc) {
        return (
            <main className="min-h-screen bg-slate-100 px-4 py-10 flex items-center justify-center">
                <div className="rounded-2xl bg-white px-8 py-6 shadow-sm">
                    <p className="text-slate-600">Document not found.</p>
                </div>
            </main>
        );
    }

    // Page title. Use source_document, then title if not source_document, then ID itself otherwise.
    const title =
        (doc.source_document as string | undefined) ??
        (doc.title as string | undefined) ??
        id;

    // filter out meta fields
    const entries = Object.entries(doc).filter(
        ([key]) =>
            key !== "_id" &&
            key !== "source_document" &&
            key !== "title" &&
            key !== "searchText"
    );

    return (
        <>
            <Header user={session?.user ?? null} />
            <main className="min-h-screen bg-slate-50 px-4 py-10 flex justify-center">
                <div className="w-full max-w-4xl rounded-2xl bg-white px-8 py-8 shadow-sm">

                    <h1 className="!mb-4 text-3xl font-bold text-blue-900">
                        {title}
                    </h1>

                    <div className="!mb-6 h-px w-full bg-slate-200" />

                    {entries.map(([key, value]) => (
                        <section key={key} className="pt-6 mb-16">

                        <h2 className="!mb-3 text-xl font-semibold text-blue-900">
                                {formatKeyLabel(key)}
                            </h2>
                            <RenderValue value={value} />
                        </section>
                    ))}
                </div>
            </main>
        </>
    );

}

