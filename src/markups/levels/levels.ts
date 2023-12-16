import { Markup } from "telegraf";
import { InlineKeyboardButton, InlineKeyboardMarkup } from "telegraf/typings/core/types/typegram";
import { GDLevelData } from "../../gd/interface";

export function levelsMarkupBuilder(levels: GDLevelData[], page: number): Markup.Markup<InlineKeyboardMarkup> {
    let levelsButtons: InlineKeyboardButton.CallbackButton[][] = [];
    
    for (const [index, level] of levels.entries()) {
        levelsButtons.push([Markup.button.callback(`${index + 1}. ${level.difficultyColor} ${level.name} by ${level.author}`, `level_${level.id}`)])
    }

    levelsButtons.push([
        Markup.button.callback(page === 0 ? " " : "←", `page_${page - 1}`),
        Markup.button.callback((page + 1).toString(), "none"),
        Markup.button.callback("→", `page_${page + 1}`)
    ])

    return Markup.inlineKeyboard(levelsButtons)
}