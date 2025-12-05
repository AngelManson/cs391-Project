import { MongoClient } from "mongodb";

const uri = "mongodb+srv://aom_db_user:4atWckBJRFDApXln@project.wh4nqix.mongodb.net/?appName=Project"; // Atlas connection string
const client = new MongoClient(uri);

function flatten(obj) {
    let text = "";

    function helper(v) {
        if (typeof v === "string") text += v + " ";
        else if (Array.isArray(v)) v.forEach(helper);
        else if (v && typeof v === "object") Object.values(v).forEach(helper);
    }

    helper(obj);
    return text.trim();
}

async function run() {
    try {
        await client.connect();
        const db = client.db("cs391-final-project");
        const collection = db.collection("pages");

        const docs = await collection.find().toArray();

        for (const doc of docs) {
            const { _id, source_document, ...rest } = doc;
            const searchText = flatten(rest);

            await collection.updateOne(
                { _id },
                { $set: { searchText } }
            );
        }

        console.log("Done!");
    } finally {
        await client.close();
    }
}

run().catch(console.dir);
