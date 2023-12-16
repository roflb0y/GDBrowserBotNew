import { bot } from "../bot";
import * as db from "../database/database";

bot.start(async ctx => {
    db.addUser(ctx.from);
    ctx.reply("sup");
});