
export function readJsonToObjectArray<T>(jsonString: string): T[] {
    return JSON.parse(jsonString) as Array<T>;
}
