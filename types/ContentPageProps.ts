type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonValue[] | JsonObject;

export interface JsonObject {
    [key: string]: JsonValue;
}

// NOTE: params is a Promise in Next 16 dynamic routes
export interface ContentPageProps {
    params: Promise<{ id: string }>;
}