type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonValue[] | JsonObject;

export interface JsonObject {
    [key: string]: JsonValue;
}

export interface ContentPageProps {
    params: Promise<{ id: string }>;
}