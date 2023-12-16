import { bot } from "../bot";
import { searchLevels } from "../gd/searchLevels";
import { levelsMarkupBuilder } from "../markups/levels/levels";
import { SearchType } from "../gd/interface";
import { Message } from "telegraf/typings/core/types/typegram";

bot.command("search", async ctx => {
    ctx.reply(`Loading...`)
    .then(msg => sendPage(ctx.from.id, msg.message_id, 0));
});

export async function sendPage(chatId: number, messageIdToEdit: number, page: number): Promise<void> {
    const levels = await searchLevels("", page, SearchType.MostLiked);
    const inlineButtons = levelsMarkupBuilder(levels, page);

    await bot.telegram.editMessageText(chatId, messageIdToEdit, undefined, SearchType[2], { reply_markup: inlineButtons.reply_markup });
}