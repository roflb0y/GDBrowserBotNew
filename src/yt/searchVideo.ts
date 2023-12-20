import * as yt from 'youtube-search-without-api-key';
import * as log from "../util/logger";
import { YTVideo } from './interface';

export async function searchVideos(query: string): Promise<YTVideo[] | undefined> {
    log.debug(`Searching YT videos with query: ${query}`);
    const videos = await yt.search(query);
    log.debug(`Found ${videos.length} videos for query: ${query}`);

    return videos.length > 0 ? videos.slice(0, 10) : undefined;
}