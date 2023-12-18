import { bot } from "../bot";
import { searchLevels } from "../gd/searchLevels";
import { levelsMarkupBuilder } from "../markups/levels/levels";
import { SearchType } from "../gd/interface";
import { getUser } from "../database/database";
import * as log from "../util/logger";
import { SearchFilters } from "../database/interface";
import { dumpSearchFilters } from "../gd/parser";

log.info("/search command initialized");

bot.command("search", async ctx => {
    const user = await getUser(ctx.from.id);
    if (!user) {
        ctx.reply("Произошла ошибка. Пропишите /start");
        return;
    }
    ctx.reply(`Loading...`)
    .then(msg => sendPage(ctx.from.id, user.search_filters, msg.message_id, 0));
});

export async function sendPage(userId: number, searchFilters: SearchFilters, messageIdToEdit: number, page: number): Promise<void> {
    log.info(`${userId} searching type ${SearchType[searchFilters.type]} on page ${page}`);
    const levels = await searchLevels("", page, searchFilters);
    if (!levels) {
        await bot.telegram.editMessageText(userId, messageIdToEdit, undefined, `Error. Server returned -1`);
        return;
    }
    const inlineButtons = levelsMarkupBuilder(levels, page, searchFilters.type);
    const path = dumpSearchFilters(searchFilters);
    //console.log(path);

    bot.telegram.editMessageText(userId, messageIdToEdit, undefined, `\`${SearchType[searchFilters.type]}\\:${path}\\:${page}\``, { reply_markup: inlineButtons.reply_markup, parse_mode: "MarkdownV2" })
    .catch(err => { log.error(`Failed to edit message ${messageIdToEdit} in chat ${userId}`); console.log(err) });
}