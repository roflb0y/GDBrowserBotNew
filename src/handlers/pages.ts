import { callbackQuery } from "telegraf/filters";
import { bot } from "../bot";
import { sendPage } from "../commands/search";
import * as log from "../util/logger";
import { getUser } from "../database/database";
import { Message } from "telegraf/typings/core/types/typegram";
import { parseSearchFilters } from "../gd/parser";
import { SearchFilters } from "../database/interface";
import { isSearchFilters } from "../util/utils";

log.info("pages.ts handler initialized");

bot.action(/page_/, async ctx => {
    if (!ctx.has(callbackQuery("data"))) return;
    if (!ctx.from) return;

    getUser(ctx.from.id)
    .then(async user => {
        if (!user) return;
        if (!ctx.callbackQuery.message) return;
        const dumpedFilters = (ctx.callbackQuery.message as Message.TextMessage).text;
        const filters = parseSearchFilters(dumpedFilters);

        if (!isSearchFilters(filters)) return;

        const [adfsafsdgfds, searchType, newpage] = ctx.callbackQuery.data.split("_");

        sendPage(user.user_id, filters, ctx.callbackQuery.message.message_id, Number(newpage));
    })
})