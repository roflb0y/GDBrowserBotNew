import { bot } from "../bot";
import { sendPage } from "../commands/search";
import * as db from "../database/database";
import { filtersKeyboard } from "../markups/searchFilters";

bot.hears("🔎 Search", async ctx => {
    const user = await db.addUser(ctx.from);
    if (!user) {
        ctx.reply("error. send /start");
        return;
    }

    ctx.reply(`Loading...`)
    .then(msg => sendPage(ctx.from.id, user.search_filters, msg.message_id, 0));
});

bot.hears("⚙ Filters", async ctx => {
    const user = await db.addUser(ctx.from);
    if (!user) {
        ctx.reply("error. send /start");
        return;
    }

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