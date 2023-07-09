export function filterNulls<T>(xs: (T | null | undefined)[]): T[] {
    return xs.filter(x => x != null) as T[]
}