import { Markup } from "telegraf";
import { SearchFilters } from "../database/interface";
import { DifficultyColor } from "../gd/interface";

export const filtersKeyboard = (searchFilters: SearchFilters) => {
    return Markup.inlineKeyboard([
        [Markup.button.callback("Search type:", "none")],
        [
            // row 1
            Markup.button.callback(`${searchFilters.type === 2 ? "✅" : ""} Most liked 👍`, `set_type_2`),
            Markup.button.callback(`${searchFilters.type === 1 ? "✅" : ""} Most Downloaded 📊`, `set_type_1`),
            Markup.button.callback(`${searchFilters.type === 3 ? "✅" : ""} Trending 📈`, `set_type_3`)],

            // row 2
            [Markup.button.callback(`${searchFilters.type === 4 ? "✅" : ""} Recent 🕑`, `set_type_4`),
            Markup.button.callback(`${searchFilters.type === 6 ? "✅" : ""} Featured ⭐`, `set_type_6`),
            Markup.button.callback(`${searchFilters.type === 7 ? "✅" : ""} Magic ✨`, `set_type_7`)
        ],
        [Markup.button.callback("Level difficulty:", "none")],
        [
            // regular difficulties
            Markup.button.callback(`${searchFilters.diff.includes(1) ? "✅" : ""} Easy ${DifficultyColor.easy}`, `set_diff_1`, (searchFilters.diff[0] === -2)),
            Markup.button.callback(`${searchFilters.diff.includes(2) ? "✅" : ""} Normal ${DifficultyColor.normal}`, `set_diff_2`, (searchFilters.diff[0] === -2)),
            Markup.button.callback(`${searchFilters.diff.includes(3) ? "✅" : ""} Hard ${DifficultyColor.hard}`, `set_diff_3`, (searchFilters.diff[0] === -2)),
            Markup.button.callback(`${searchFilters.diff.includes(4) ? "✅" : ""} Harder ${DifficultyColor.harder}`, `set_diff_4`, (searchFilters.diff[0] === -2)),
            Markup.button.callback(`${searchFilters.diff.includes(5) ? "✅" : ""} Insane ${DifficultyColor.insane}`, `set_diff_5`, (searchFilters.diff[0] === -2)),

            // demons
            Markup.button.callback(`${searchFilters.demonFilter === 1 ? "✅" : ""} Easy demons ${DifficultyColor.easy}`, `set_demonFilter_1`, !(searchFilters.diff[0] === -2)),
            Markup.button.callback(`${searchFilters.demonFilter === 2 ? "✅" : ""} Medium demons ${DifficultyColor.normal}`, `set_demonFilter_2`, !(searchFilters.diff[0] === -2)),
            Markup.button.callback(`${searchFilters.demonFilter === 3 ? "✅" : ""} Hard demons ${DifficultyColor.hard}`, `set_demonFilter_3`, !(searchFilters.diff[0] === -2)),
            Markup.button.callback(`${searchFilters.demonFilter === 4 ? "✅" : ""} Insane demons ${DifficultyColor.insane}`, `set_demonFilter_4`, !(searchFilters.diff[0] === -2)),
            Markup.button.callback(`${searchFilters.demonFilter === 5 ? "✅" : ""} Extreme demons ${DifficultyColor.demon}`, `set_demonFilter_5`, !(searchFilters.diff[0] === -2)),
        ],
        [Markup.button.callback(`${searchFilters.diff[0] === -2 ? "✅" : "❌"} Demons ${DifficultyColor.demon}`, "set_diff_-2")],

        [Markup.button.callback("Level length:", "none")],
        [
            Markup.button.callback(`${searchFilters.len.includes(0) ? "✅" : ""} Tiny`, `set_len_0`),
            Markup.button.callback(`${searchFilters.len.includes(1) ? "✅" : ""} Short`, `set_len_1`),
            Markup.button.callback(`${searchFilters.len.includes(2) ? "✅" : ""} Medium`, `set_len_2`),
            Markup.button.callback(`${searchFilters.len.includes(3) ? "✅" : ""} Long`, `set_len_3`),
            Markup.button.callback(`${searchFilters.len.includes(4) ? "✅" : ""} XL`, `set_len_4`)
        ],
        [Markup.button.callback("Reset filters", "resetFilters")]
    ])
}