import { bot } from "../bot";
import { searchLevels } from "../gd/searchLevels";
import { levelsMarkupBuilder } from "../markups/levels/levels";
import { SearchType } from "../gd/interface";
import { getUser } from "../database/database";
import * as log from "../util/logger";

log.info("/search command initialized");

bot.command("search", async ctx => {
    const user = await getUser(ctx.from.id);
    if (!user) {
        ctx.reply("Произошла ошибка. Пропишите /start");
        return;
    }
    ctx.reply(`Loading...`)
    .then(msg => sendPage(ctx.from.id, msg.message_id, 0, user.search_settings.searchType));
});

export async function sendPage(userId: number, messageIdToEdit: number, page: number, searchType: number): Promise<void> {
    log.info(`${userId} searching type ${SearchType[searchType]} on page ${page}`);
    const levels = await searchLevels("", page, searchType);
    const inlineButtons = levelsMarkupBuilder(levels, page, searchType);

    await bot.telegram.editMessageText(userId, messageIdToEdit, undefined, `type:${SearchType[searchType]}/${page}`, { reply_markup: inlineButtons.reply_markup });
}