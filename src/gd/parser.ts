import { QuerySearchFilters, SearchFilters, SearchFiltersDefault } from "../database/interface";
import { GDLevelData, DifficultyColor, SearchType } from "./interface";

function getDifficultyColor(diffDenominator: number, diffNumerator: number, isAuto: boolean, isDemon: boolean): string {
    if (diffDenominator === 0) { return DifficultyColor.na };
    if (isAuto) { return DifficultyColor.auto };

    const difficultyNum = diffNumerator/diffDenominator;

    if (!isDemon) {
        switch (difficultyNum) {
            case 1: return DifficultyColor.easy
            case 2: return DifficultyColor.normal
            case 3: return DifficultyColor.hard
            case 4: return DifficultyColor.harder
            case 5: return DifficultyColor.insane
        }
    }
    else {
        switch (difficultyNum) {
            case 1: return DifficultyColor.demon + " (" + DifficultyColor.easy + ")"
            case 2: return DifficultyColor.demon + " (" + DifficultyColor.normal + ")"
            case 3: return DifficultyColor.demon + " (" + DifficultyColor.hard + ")"
            case 4: return DifficultyColor.demon + " (" + DifficultyColor.insane + ")"
            case 5: return DifficultyColor.demon + " (" + DifficultyColor.demon + ")"
        }
    }

    return DifficultyColor.na;
}

export function parseLevels(levels: string, creators: string, splitter: string = ":"): GDLevelData[] {
    const levels_splitted = levels.split("|");
    const creators_splitted = creators.split("|");

    let res: GDLevelData[] = [];
    let creators_parsed: { [playerID: string]: string } = {};

    creators_splitted.forEach(item => {
        const [playerID, username, accountID] = item.split(":");
        creators_parsed[playerID] = username;
    })

    levels_splitted.forEach(item => {
        let levelData: { [key: string]: string } = {};
        
        const level = item.split(":");
        for (let i = 0; i <= level.length; i += 2) {
            if (!level[i]) break;
            levelData[level[i]] = level[i + 1];
        }
        //console.log(levelData);
        res.push({
            id: levelData["1"],
            name: levelData["2"],
            author: creators_parsed[levelData["6"]] || "-",
            difficultyColor: getDifficultyColor(Number(levelData["8"]), Number(levelData["9"]), (levelData["25"] === "1"), (levelData["17"] === "1"))
        });
    })
    
    return res;
}

export function dumpSearchFilters(searchFilters: QuerySearchFilters): string {
    let params: string[] = [];

    //params.push(`type=${searchFilters.searchType}`);
    if (searchFilters.diff[0] === -2) params.push(`demonFilter=${searchFilters.demonFilter}`);
    if (searchFilters.diff[0] !== -2) params.push(`diff=${searchFilters.diff.length > 0 ? searchFilters.diff.join(",") : "-"}`);
    params.push(`len=${searchFilters.diff.length > 0 ? searchFilters.len.join(",") : "-"}`);
    params.push(`str=${searchFilters.str || ""}`)
    return params.join(";");
}

// это самая худшая функция которую я написал за свою жизнь
export function parseSearchFilters(data: string): QuerySearchFilters | string {
    let errors: string[] = [];
    let res: QuerySearchFilters = { ...SearchFiltersDefault, str: "" };

    const [searchType, dumpedFilters, page] = data.split(":");
    res.type = Number(SearchType[searchType as keyof typeof SearchType]);
    if (Number.isNaN(Number(SearchType[searchType as keyof typeof SearchType]))) {
        return `${searchType} is not a valid search type`;
    }

    let filters: { [key: string]: number | number[] | string | undefined } = {};
    dumpedFilters.split(";").forEach(filter => {
        const [filterName, value] = filter.split("=");
        if (!res[filterName as keyof QuerySearchFilters] && res[filterName as keyof QuerySearchFilters] !== "") { errors.push(`${filterName} is not a valid filter`) }

        if (value === "-") {
            filters[filterName] = undefined;
        }
        else if (filterName === "diff" || filterName === "len") {
            filters[filterName] = value.split(",").map(val => Number(val));
        } 
        else if (filterName === "str") {
            filters[filterName] = value || "";
        }
        else {
            filters[filterName] = Number(value);
        }
        
    })

    if(errors.length > 0) return errors.join("; ");

    if(!filters.diff && filters.demonFilter) filters.diff = [-2];

    if(filters.diff) res.diff = filters.diff as Number[];
    if(filters.demonFilter) res.demonFilter = Number(filters.demonFilter);
    if(filters.len) res.len = filters.len as Number[];
    if(filters.str) res.str = filters.str as string;    

    return res;
}