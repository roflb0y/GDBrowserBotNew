import fs from "fs";
import { GDLevelData } from "../gd/interface";
import * as log from "../util/logger";
import * as utils from "../util/utils";
import * as config from "../config";

export function updateSearchCache(key: string, levels: GDLevelData[]): void {
    let cacheFile = JSON.parse(fs.readFileSync("cache.json",{ encoding: "utf-8" }));
    cacheFile["searchCache"][key] = { data: JSON.stringify(levels), createdAt: Date.now() };
    //console.log(cacheFile);
    fs.writeFileSync("cache.json", JSON.stringify(cacheFile));
    log.debug(`Updated cache for ${key}`);
}

export function getSearchCache(key: string): GDLevelData[] | undefined {
    let cacheFile = JSON.parse(fs.readFileSync("cache.json",{ encoding: "utf-8" }));
    const cacheData = cacheFile["searchCache"][key];

    if (!cacheData) return undefined;

    const timeSince = utils.getTimeSince(cacheData.createdAt);

    if (timeSince < config.CACHE_SEARCHING_TTL) {
        const cachedLevels: GDLevelData[] = JSON.parse(cacheData.data);
        return cachedLevels;
    } else { 
        return undefined 
    }
}