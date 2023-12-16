import { bot } from "../bot";
import { searchLevels } from "../gd/searchLevels";
import { levelsMarkupBuilder } from "../markups/levels/levels";
import { SearchType } from "../gd/interface";
import { Message } from "telegraf/typings/core/types/typegram";

bot.command("search", async ctx => {
    ctx.reply(`Loading...`)
    .then(msg => sendPage(ctx.from.id, msg.message_id, 0, SearchType.Recent));
});

export async function sendPage(chatId: number, messageIdToEdit: number, page: number, searchType: number): Promise<void> {
    const levels = await searchLevels("", page, searchType);
    const inlineButtons = levelsMarkupBuilder(levels, page, searchType);

    await bot.telegram.editMessageText(chatId, messageIdToEdit, undefined, `type:${SearchType[searchType]}`, { reply_markup: inlineButtons.reply_markup });
}