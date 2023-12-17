import { bot } from "../bot";
import * as db from "../database/database";
import { filtersKeyboard } from "../markups/searchFilters";
import * as log from "../util/logger";

log.info("/filters command initialized");

bot.command("filters", async ctx => {
    db.getUser(ctx.from.id)
    .then(async user => {
        if (!user) {
            ctx.reply("Error idk");
            return;
        }

        const keyboard = filtersKeyboard(user.search_filters);
        ctx.reply("Search filters", keyboard);
    })
})