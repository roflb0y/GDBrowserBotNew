import { bot } from "../bot";
import { searchLevels } from "../gd/searchLevels";
import { levelsMarkupBuilder } from "../markups/levels/levels";
import { SearchType } from "../gd/interface";
import { getUser } from "../database/database";
import * as log from "../util/logger";
import { SearchFilters } from "../database/interface";

log.info("/search command initialized");

bot.command("search", async ctx => {
    const user = await getUser(ctx.from.id);
    if (!user) {
        ctx.reply("Произошла ошибка. Пропишите /start");
        return;
    }
    ctx.reply(`Loading...`)
    .then(msg => sendPage(ctx.from.id, user.search_settings, msg.message_id, 0));
});

export async function sendPage(userId: number, searchSettings: SearchFilters, messageIdToEdit: number, page: number): Promise<void> {
    log.info(`${userId} searching type ${SearchType[searchSettings.searchType]} on page ${page}`);
    const levels = await searchLevels("", page, searchSettings);
    if (!levels) {
        await bot.telegram.editMessageText(userId, messageIdToEdit, undefined, `Error. Server returned -1`);
        return;
    }
    const inlineButtons = levelsMarkupBuilder(levels, page, searchSettings.searchType);

    await bot.telegram.editMessageText(userId, messageIdToEdit, undefined, `type:${SearchType[searchSettings.searchType]}/${page}`, { reply_markup: inlineButtons.reply_markup });
}