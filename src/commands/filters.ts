import { bot } from "../bot";
import * as db from "../database/database";
import { settingsKeyboard } from "../markups/searchFilters";
import * as log from "../util/logger";

log.info("/filters command initialized");

bot.command("filters", async ctx => {
    db.getUser(ctx.from.id)
    .then(async user => {
        if (!user) {
            ctx.reply("Error idk");
            return;
        }

        const keyboard = settingsKeyboard(user.search_settings);
        ctx.reply("Search filters", keyboard);
    })
})