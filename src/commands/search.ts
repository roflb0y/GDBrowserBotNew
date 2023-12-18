import { bot } from "../bot";
import { searchLevels } from "../gd/searchLevels";
import { levelsMarkupBuilder } from "../markups/levels/levels";
import { SearchType } from "../gd/interface";
import { getUser } from "../database/database";
import * as log from "../util/logger";
import { QuerySearchFilters, SearchFilters } from "../database/interface";
import * as utils from "../util/utils";

log.info("/search command initialized");

bot.command("search", async ctx => {
    const user = await getUser(ctx.from.id);
    if (!user) {
        ctx.reply("Произошла ошибка. Пропишите /start");
        return;
    }

    const searchQuery = ctx.message.text.split(" ").slice(1).join(" ");
    let searchFilters: QuerySearchFilters = { ...user.search_filters, str: searchQuery };

    ctx.reply(`Loading...`)
    .then(msg => sendPage(ctx.from.id, searchFilters, msg.message_id, 0));
});

export async function sendPage(userId: number, searchFilters: QuerySearchFilters, messageIdToEdit: number, page: number): Promise<void> {
    log.info(`${userId} searching with type ${SearchType[searchFilters.type]} on page ${page}`);
    const levels = await searchLevels(page, searchFilters);
    if (!levels) {
        await bot.telegram.editMessageText(userId, messageIdToEdit, undefined, `Error. Server returned -1`);
        return;
    }
    const inlineButtons = levelsMarkupBuilder(levels, page, searchFilters.type);
    const path = utils.createPath(searchFilters, page);
    //console.log(path);

    bot.telegram.editMessageText(userId, messageIdToEdit, undefined, `\`${utils.prepareString(path)}\``, { reply_markup: inlineButtons.reply_markup, parse_mode: "MarkdownV2" })
    .catch(err => { log.error(`Failed to edit message ${messageIdToEdit} in chat ${userId}`); console.log(err) });
}