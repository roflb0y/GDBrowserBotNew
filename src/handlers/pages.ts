import { callbackQuery } from "telegraf/filters";
import { bot } from "../bot";
import { sendPage } from "../commands/search";
import * as log from "../util/logger";
import { getUser } from "../database/database";

log.info("pages.ts handler initialized");

bot.action(/page_/, async ctx => {
    if (!ctx.has(callbackQuery("data"))) return;
    if (!ctx.from) return;

    getUser(ctx.from.id)
    .then(async user => {
        if (!user) return;
        if (!ctx.callbackQuery.message) return;
        const [adfsafsdgfds, searchType, newpage] = ctx.callbackQuery.data.split("_");

        sendPage(user.user_id, {
            searchType: Number(searchType),
            levelDifficulty: [],
            demonFilter: 0,
            levelLength: []
        }, ctx.callbackQuery.message.message_id, Number(newpage));
    })
})