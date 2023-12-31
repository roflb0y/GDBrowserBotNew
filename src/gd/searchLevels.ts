import GD, { GDRequestParams, SearchedLevel, User } from "gd.js";
import * as parser from "./parser";
import { GDLevelData, SearchType } from "./interface";
import * as log from "../util/logger";
import { QuerySearchFilters, SearchFilters } from "../database/interface";
import * as cache from "../util/cache";
import * as utils from "../util/utils";

const gd = new GD({
    logLevel: 1
});

// еее свой реквест потому что в gd.js нельзя искать уровни на конкретной странице блять это пиздец
export async function searchLevels(page: number, searchFilters: QuerySearchFilters): Promise<GDLevelData[] | undefined> {
    const cachedSearchResult = cache.getSearchCache(utils.createPath(searchFilters, page));
    if (cachedSearchResult) {
        log.debug(`Returning cached result for ${JSON.stringify(searchFilters)}`);
        return cachedSearchResult;
    }

    const params = new GDRequestParams({ 
        gameVersion: 21, 
        binaryVersion: 35, 
        type: searchFilters.str ? 0 : searchFilters.type,
        gdw: 0, 
        str: searchFilters.str && searchFilters.str !== "" ? searchFilters.str : "", 
        page: page, 
        demonFilter: searchFilters.demonFilter,
        diff: searchFilters.diff.length > 0 ? searchFilters.diff.join(",") : "-",
        len: searchFilters.len.length > 0 ? searchFilters.len.join(",") : "-",
        secret: "Wmfd2893gb7"
    });

    log.debug(`Searching levels with parameters ${JSON.stringify(params)}`)
    const data = await gd.req("/getGJLevels21.php", { 
        method: "POST", 
        body: params
    });
    if (data === "-1") {
        log.error(`GD server returned -1. Params: ${JSON.stringify(params)}`)
        return undefined;
    }
    
    const [levels, creators, songs] = data.split("#");
    const levels_parsed = parser.parseLevels(levels, creators);

    cache.updateSearchCache(utils.createPath(searchFilters, page), levels_parsed);
    //console.log(data);
    return levels_parsed;
}

export async function getLevel(id: number): Promise<{"level": SearchedLevel | null, "creator": User | null}> {
    log.debug(`Fetching level ${id}`);
    const level = await gd.levels.get(id, true);
    if (level === null) return { "level": null, "creator": null };

    const creator = level.creator.accountID ? await gd.users.getByAccountID(level.creator.accountID) : null;
    return { "level": level, "creator": creator }
}
