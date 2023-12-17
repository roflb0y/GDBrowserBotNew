import { bot } from "../bot";
import * as db from "../database/database";
import { settingsKeyboard } from "../markups/searchSettings";

bot.command("settings", async ctx => {
    db.getUser(ctx.from.id)
    .then(async user => {
        if (!user) {
            ctx.reply("Error idk");
            return;
        }

        const keyboard = settingsKeyboard(user.search_settings);
        ctx.reply("Search settings", keyboard);
    })
})