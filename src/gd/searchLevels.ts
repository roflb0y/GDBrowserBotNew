import GD, { GDRequestParams, SearchedLevel, User } from "gd.js";
import * as parser from "./parser";
import { GDLevelData, SearchType } from "./interface";
import * as log from "../util/logger";
import { SearchFilters } from "../database/interface";

const gd = new GD({
    logLevel: 1
});

// еее свой реквест потому что в gd.js нельзя искать уровни на конкретной странице блять это пиздец
export async function searchLevels(query: string, page: number, searchSettings: SearchFilters): Promise<GDLevelData[] | undefined> {
    const params = new GDRequestParams({ 
        gameVersion: 21, 
        binaryVersion: 35, 
        type: searchSettings.searchType,
        gdw: 0, 
        str: query, 
        page: page, 
        demonFilter: searchSettings.demonFilter,
        diff: searchSettings.levelDifficulty.length > 0 ? searchSettings.levelDifficulty.join(",") : "-",
        len: searchSettings.levelLength.length > 0 ? searchSettings.levelLength.join(",") : "-",
        secret: "Wmfd2893gb7"
    });

    log.debug(`Request to GD servers with parameters ${JSON.stringify(params)}`)
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
    //console.log(data);
    return levels_parsed;
}

export async function getLevel(id: number): Promise<{"level": SearchedLevel | null, "creator": User | null}> {
    const level = await gd.levels.get(id, true);
    if (level === null) return { "level": null, "creator": null };

    const creator = level.creator.accountID ? await gd.users.getByAccountID(level.creator.accountID) : null;
    console.log(level);
    return { "level": level, "creator": creator }
}
