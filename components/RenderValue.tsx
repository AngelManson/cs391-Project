import {JsonValue} from "@/types/ContentPageProps";

export default function RenderValue({ value }: { value: JsonValue }) {

    function formatKeyLabel(key: string): string {
        return key
            .replace(/_/g, " ")
            .replace(/\s+/g, " ")
            .trim()
            .replace(/^\w/, (c) => c.toUpperCase());
    }

    if (
        typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean"
    ) {
        return <p className="!mb-4 leading-relaxed text-slate-800">{String(value)}</p>;

    }

    if (value === null) {
        return <p className="!mb-4 text-slate-400">null</p>;
    }

    if (Array.isArray(value)) {
        return (
            <ul className="!mb-4 list-disc pl-6 space-y-2 text-slate-800">
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
        <div className="!ml-4 border-slate-200 pl-4 space-y-4">
            {Object.entries(value).map(([k, v]) => (
                <div key={k}>
                    <h3 className="!mb-1 text-xs font-semibold uppercase tracking-wide text-blue-800">
                        {formatKeyLabel(k)}
                    </h3>
                    <RenderValue value={v} />
                </div>
            ))}
        </div>
    );
}