import fs from "fs";
import { YTVideo } from "./interface";
import * as log from "../util/logger";

export function getVideoFromCache(levelId: number | string): string | undefined {
    const cache = JSON.parse(fs.readFileSync("videos.json", { encoding: "utf-8" }));

    if (cache[levelId.toString()]) return "https://www.youtube.com/watch?v=" + cache[levelId.toString()];

    return undefined;
}

export function setCache(levelId: number | string, videoId: string): void {
    const cache = JSON.parse(fs.readFileSync("videos.json", { encoding: "utf-8" }));

    if (cache[levelId.toString()]) return;
    log.debug(`Video for ${levelId} set to ${videoId}`);

    cache[levelId.toString()] = videoId;
    fs.writeFileSync("videos.json", JSON.stringify(cache));
}