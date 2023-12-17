import { Markup } from "telegraf";
import { SearchFilters } from "../database/interface";
import { DifficultyColor } from "../gd/interface";

export const settingsKeyboard = (searchSettings: SearchFilters) => {
    return Markup.inlineKeyboard([
        [Markup.button.callback("Search type:", "none")],
        [
            // row 1
            Markup.button.callback(`${searchSettings.searchType === 2 ? "✅" : ""} Most liked 👍`, `set_searchType_2`),
            Markup.button.callback(`${searchSettings.searchType === 1 ? "✅" : ""} Most Downloaded 📊`, `set_searchType_1`),
            Markup.button.callback(`${searchSettings.searchType === 3 ? "✅" : ""} Trending 📈`, `set_searchType_3`)],

            // row 2
            [Markup.button.callback(`${searchSettings.searchType === 4 ? "✅" : ""} Recent 🕑`, `set_searchType_4`),
            Markup.button.callback(`${searchSettings.searchType === 6 ? "✅" : ""} Featured ⭐`, `set_searchType_6`),
            Markup.button.callback(`${searchSettings.searchType === 7 ? "✅" : ""} Magic ✨`, `set_searchType_7`)
        ],
        [Markup.button.callback("Level difficulty:", "none")],
        [
            // regular difficulties
            Markup.button.callback(`${searchSettings.levelDifficulty.includes(1) ? "✅" : ""} Easy ${DifficultyColor.easy}`, `set_levelDifficulty_1`, (searchSettings.levelDifficulty[0] === -2)),
            Markup.button.callback(`${searchSettings.levelDifficulty.includes(2) ? "✅" : ""} Normal ${DifficultyColor.normal}`, `set_levelDifficulty_2`, (searchSettings.levelDifficulty[0] === -2)),
            Markup.button.callback(`${searchSettings.levelDifficulty.includes(3) ? "✅" : ""} Hard ${DifficultyColor.hard}`, `set_levelDifficulty_3`, (searchSettings.levelDifficulty[0] === -2)),
            Markup.button.callback(`${searchSettings.levelDifficulty.includes(4) ? "✅" : ""} Harder ${DifficultyColor.harder}`, `set_levelDifficulty_4`, (searchSettings.levelDifficulty[0] === -2)),
            Markup.button.callback(`${searchSettings.levelDifficulty.includes(5) ? "✅" : ""} Insane ${DifficultyColor.insane}`, `set_levelDifficulty_5`, (searchSettings.levelDifficulty[0] === -2)),

            // demons
            Markup.button.callback(`${searchSettings.demonFilter === 1 ? "✅" : ""} Easy demons ${DifficultyColor.easy}`, `set_demonFilter_1`, !(searchSettings.levelDifficulty[0] === -2)),
            Markup.button.callback(`${searchSettings.demonFilter === 2 ? "✅" : ""} Medium demons ${DifficultyColor.normal}`, `set_demonFilter_2`, !(searchSettings.levelDifficulty[0] === -2)),
            Markup.button.callback(`${searchSettings.demonFilter === 3 ? "✅" : ""} Hard demons ${DifficultyColor.hard}`, `set_demonFilter_3`, !(searchSettings.levelDifficulty[0] === -2)),
            Markup.button.callback(`${searchSettings.demonFilter === 4 ? "✅" : ""} Insane demons ${DifficultyColor.insane}`, `set_demonFilter_4`, !(searchSettings.levelDifficulty[0] === -2)),
            Markup.button.callback(`${searchSettings.demonFilter === 5 ? "✅" : ""} Extreme demons ${DifficultyColor.demon}`, `set_demonFilter_5`, !(searchSettings.levelDifficulty[0] === -2)),
        ],
        [Markup.button.callback(`${searchSettings.levelDifficulty[0] === -2 ? "✅" : "❌"} Demons ${DifficultyColor.demon}`, "set_levelDifficulty_-2")],

        [Markup.button.callback("Level length:", "none")],
        [
            Markup.button.callback(`${searchSettings.levelLength.includes(0) ? "✅" : ""} Tiny`, `set_levelLength_0`),
            Markup.button.callback(`${searchSettings.levelLength.includes(1) ? "✅" : ""} Short`, `set_levelLength_1`),
            Markup.button.callback(`${searchSettings.levelLength.includes(2) ? "✅" : ""} Medium`, `set_levelLength_2`),
            Markup.button.callback(`${searchSettings.levelLength.includes(3) ? "✅" : ""} Long`, `set_levelLength_3`),
            Markup.button.callback(`${searchSettings.levelLength.includes(4) ? "✅" : ""} XL`, `set_levelLength_4`)
        ],
        [Markup.button.callback("Reset filters", "none")]
    ])
}