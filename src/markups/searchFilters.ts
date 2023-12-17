import { Markup } from "telegraf";
import { SearchFilters } from "../database/interface";
import { DifficultyColor } from "../gd/interface";

export const filtersKeyboard = (searchFilters: SearchFilters) => {
    return Markup.inlineKeyboard([
        [Markup.button.callback("Search type:", "none")],
        [
            // row 1
            Markup.button.callback(`${searchFilters.searchType === 2 ? "✅" : ""} Most liked 👍`, `set_searchType_2`),
            Markup.button.callback(`${searchFilters.searchType === 1 ? "✅" : ""} Most Downloaded 📊`, `set_searchType_1`),
            Markup.button.callback(`${searchFilters.searchType === 3 ? "✅" : ""} Trending 📈`, `set_searchType_3`)],

            // row 2
            [Markup.button.callback(`${searchFilters.searchType === 4 ? "✅" : ""} Recent 🕑`, `set_searchType_4`),
            Markup.button.callback(`${searchFilters.searchType === 6 ? "✅" : ""} Featured ⭐`, `set_searchType_6`),
            Markup.button.callback(`${searchFilters.searchType === 7 ? "✅" : ""} Magic ✨`, `set_searchType_7`)
        ],
        [Markup.button.callback("Level difficulty:", "none")],
        [
            // regular difficulties
            Markup.button.callback(`${searchFilters.levelDifficulty.includes(1) ? "✅" : ""} Easy ${DifficultyColor.easy}`, `set_levelDifficulty_1`, (searchFilters.levelDifficulty[0] === -2)),
            Markup.button.callback(`${searchFilters.levelDifficulty.includes(2) ? "✅" : ""} Normal ${DifficultyColor.normal}`, `set_levelDifficulty_2`, (searchFilters.levelDifficulty[0] === -2)),
            Markup.button.callback(`${searchFilters.levelDifficulty.includes(3) ? "✅" : ""} Hard ${DifficultyColor.hard}`, `set_levelDifficulty_3`, (searchFilters.levelDifficulty[0] === -2)),
            Markup.button.callback(`${searchFilters.levelDifficulty.includes(4) ? "✅" : ""} Harder ${DifficultyColor.harder}`, `set_levelDifficulty_4`, (searchFilters.levelDifficulty[0] === -2)),
            Markup.button.callback(`${searchFilters.levelDifficulty.includes(5) ? "✅" : ""} Insane ${DifficultyColor.insane}`, `set_levelDifficulty_5`, (searchFilters.levelDifficulty[0] === -2)),

            // demons
            Markup.button.callback(`${searchFilters.demonFilter === 1 ? "✅" : ""} Easy demons ${DifficultyColor.easy}`, `set_demonFilter_1`, !(searchFilters.levelDifficulty[0] === -2)),
            Markup.button.callback(`${searchFilters.demonFilter === 2 ? "✅" : ""} Medium demons ${DifficultyColor.normal}`, `set_demonFilter_2`, !(searchFilters.levelDifficulty[0] === -2)),
            Markup.button.callback(`${searchFilters.demonFilter === 3 ? "✅" : ""} Hard demons ${DifficultyColor.hard}`, `set_demonFilter_3`, !(searchFilters.levelDifficulty[0] === -2)),
            Markup.button.callback(`${searchFilters.demonFilter === 4 ? "✅" : ""} Insane demons ${DifficultyColor.insane}`, `set_demonFilter_4`, !(searchFilters.levelDifficulty[0] === -2)),
            Markup.button.callback(`${searchFilters.demonFilter === 5 ? "✅" : ""} Extreme demons ${DifficultyColor.demon}`, `set_demonFilter_5`, !(searchFilters.levelDifficulty[0] === -2)),
        ],
        [Markup.button.callback(`${searchFilters.levelDifficulty[0] === -2 ? "✅" : "❌"} Demons ${DifficultyColor.demon}`, "set_levelDifficulty_-2")],

        [Markup.button.callback("Level length:", "none")],
        [
            Markup.button.callback(`${searchFilters.levelLength.includes(0) ? "✅" : ""} Tiny`, `set_levelLength_0`),
            Markup.button.callback(`${searchFilters.levelLength.includes(1) ? "✅" : ""} Short`, `set_levelLength_1`),
            Markup.button.callback(`${searchFilters.levelLength.includes(2) ? "✅" : ""} Medium`, `set_levelLength_2`),
            Markup.button.callback(`${searchFilters.levelLength.includes(3) ? "✅" : ""} Long`, `set_levelLength_3`),
            Markup.button.callback(`${searchFilters.levelLength.includes(4) ? "✅" : ""} XL`, `set_levelLength_4`)
        ],
        [Markup.button.callback("Reset filters", "resetFilters")]
    ])
}