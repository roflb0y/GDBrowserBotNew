import { callbackQuery } from "telegraf/filters";
import { bot } from "../bot";
import { sendPage } from "../commands/search";

bot.action(/page_/, async ctx => {
    if (!ctx.has(callbackQuery("data"))) return;
    if (!ctx.from) return;
    if (!ctx.callbackQuery.message) return;

    const [adfsafsdgfds, newpage] = ctx.callbackQuery.data.split("_");

    sendPage(ctx.from.id, ctx.callbackQuery.message.message_id, Number(newpage));
})