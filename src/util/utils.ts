import { fstat } from "fs";
import { QuerySearchFilters, SearchFilters } from "../database/interface";
import { SearchType } from "../gd/interface";
import { dumpSearchFilters } from "../gd/parser";

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

export function isSearchFilters(obj: any): obj is QuerySearchFilters {
    return obj.type && obj.diff && obj.demonFilter && obj.len;
}

export function createPath(searchFilters: SearchFilters, page: number): string {
    return `${SearchType[searchFilters.type]}:${dumpSearchFilters(searchFilters)}:${page}`;
}

export function prepareString(s: string) {
    if(s) return s.toString().replace(/\_/g, '\\_')
        .replace(/\*/g, '\\*')
        .replace(/\[/g, '\\[')
        .replace(/\]/g, '\\]')
        .replace(/\(/g, '\\(')
        .replace(/\)/g, '\\)')
        .replace(/\~/g, '\\~')
        .replace(/\`/g, '\\`')
        .replace(/\>/g, '\\>')
        .replace(/\#/g, '\\#')
        .replace(/\+/g, '\\+')
        .replace(/\-/g, '\\-')
        .replace(/\=/g, '\\=')
        .replace(/\|/g, '\\|')
        .replace(/\{/g, '\\{')
        .replace(/\}/g, '\\}')
        .replace(/\./g, '\\.')
        .replace(/\!/g, '\\!')
    else return "null";
}

export function getTimeSince(timestamp: number): number {
    const currentTime = Date.now();
    const timeSince = currentTime - timestamp;
    const minutesSince = timeSince / 1000 / 60;
    return minutesSince;
}