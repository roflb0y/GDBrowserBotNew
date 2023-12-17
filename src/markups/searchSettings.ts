import { Markup } from "telegraf";
import { SearchSettings } from "../database/interface";

export const settingsKeyboard = (searchSettings: SearchSettings) => {
    return Markup.inlineKeyboard([
        [Markup.button.callback("Search type:", "none")],
        [
            // row 1
            Markup.button.callback(`${searchSettings.searchType === 0 ? "✅" : ""} Most liked 👍`, `set_searchType_0`),
            Markup.button.callback(`${searchSettings.searchType === 1 ? "✅" : ""} Most Downloaded 📊`, `set_searchType_1`),
            Markup.button.callback(`${searchSettings.searchType === 3 ? "✅" : ""} Trending 📈`, `set_searchType_3`)],

            // row 2
            [Markup.button.callback(`${searchSettings.searchType === 5 ? "✅" : ""} Featured ⭐`, `set_searchType_5`),
            Markup.button.callback(`${searchSettings.searchType === 7 ? "✅" : ""} Magic ✨`, `set_searchType_7`)
        ]
    ])
}