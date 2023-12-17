import { bot } from "../bot";
import { searchLevels } from "../gd/searchLevels";
import { levelsMarkupBuilder } from "../markups/levels/levels";
import { SearchType } from "../gd/interface";
import { getUser } from "../database/database";
import * as log from "../util/logger";

bot.command("search", async ctx => {
    ctx.reply(`Loading...`)
    .then(msg => sendPage(ctx.from.id, msg.message_id, 0, SearchType.Recent));
});

export async function sendPage(userId: number, messageIdToEdit: number, page: number, searchType: number): Promise<void> {
    const user = await getUser(userId);
    if (!user) {
        bot.telegram.sendMessage(userId, "Error dfgokjhndfg");
        return;
    }

    log.debug(`Searching type ${SearchType[user.search_settings.searchType]}`);
    const levels = await searchLevels("", page, user.search_settings.searchType);
    const inlineButtons = levelsMarkupBuilder(levels, page, user.search_settings.searchType);

    await bot.telegram.editMessageText(userId, messageIdToEdit, undefined, `type:${SearchType[user.search_settings.searchType]}`, { reply_markup: inlineButtons.reply_markup });
}