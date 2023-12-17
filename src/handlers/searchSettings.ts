import { bot } from "../bot";
import { getUser } from "../database/database";
import { callbackQuery } from "telegraf/filters";
import { setSetting } from "../database/database";
import { settingsKeyboard } from "../markups/searchSettings";
import * as log from "../util/logger";

log.info("searchSettings.ts handler initialized");

bot.action(/set_/, async ctx => {
    if (!ctx.has(callbackQuery("data"))) return;
    if (!ctx.from) return;

    getUser(ctx.from.id)
    .then(async user => {
        if (!user) {
            ctx.answerCbQuery("Error sdfkjbnsdfjkfs");
            return;
        }

        if (!ctx.from) return;
        const [sosni, setting, value] = ctx.callbackQuery.data.split("_");

        const updatedUser = await setSetting(ctx.from.id, setting, Number(value));
    
        if (!updatedUser) {
            ctx.answerCbQuery("Error sdfkjbnsdfjkfs");
            return;
        }
    
        const keyboard = settingsKeyboard(updatedUser.search_settings);
        ctx.editMessageReplyMarkup(keyboard.reply_markup)
        .catch(() => {});
    })
})