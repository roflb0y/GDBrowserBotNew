import { bot } from "../bot";
import * as db from "../database/database";
import { mainKeyboard } from "../markups/mainKeyboard";
import * as log from "../util/logger";

log.info("/start command initialized");

bot.start(async ctx => {
    db.addUser(ctx.from);
    ctx.reply("sup", mainKeyboard);
});