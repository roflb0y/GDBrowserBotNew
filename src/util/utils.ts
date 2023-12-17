export function toggleArrayValue<T>(arr: Array<T>, value: T, sort?: true): Array<T> {
    if (arr.includes(value)) {
        const index = arr.indexOf(value);
        arr.splice(index, 1);
        return arr;
    } else {
        arr.push(value);
        if (sort) arr.sort((a: T, b: T) => Number(a) - Number(b));
        return arr
    }
}

export function isNumber(str: string): boolean {
    return !isNaN(Number(str));
}