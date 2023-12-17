import { bot } from "../bot";
import { getUser, resetFilters } from "../database/database";
import { callbackQuery } from "telegraf/filters";
import { setFilter } from "../database/database";
import { filtersKeyboard } from "../markups/searchFilters";
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
        const [sosni, filter, value] = ctx.callbackQuery.data.split("_");

        const updatedUser = await setFilter(ctx.from.id, filter, Number(value));
    
        if (!updatedUser) {
            ctx.answerCbQuery("Error sdfkjbnsdfjkfs");
            return;
        }
    
        const keyboard = filtersKeyboard(updatedUser.search_filters);
        ctx.editMessageReplyMarkup(keyboard.reply_markup)
        .then(() => ctx.answerCbQuery())
        .catch(() => {});
    })
});

bot.action("resetFilters", async ctx => {
    if (!ctx.has(callbackQuery("data"))) return;
    if (!ctx.from) return;

    const updatedUser = await resetFilters(ctx.from.id);
    
    if (!updatedUser) {
        ctx.answerCbQuery("Error sdfkjbnsdfjkfs");
        return;
    }
    
    const keyboard = filtersKeyboard(updatedUser.search_filters);
    ctx.editMessageReplyMarkup(keyboard.reply_markup)
    .then(() => ctx.answerCbQuery("All filters have been reset"))
    .catch(() => {});
})