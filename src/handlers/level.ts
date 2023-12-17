import { bot } from "../bot";
import { callbackQuery } from "telegraf/filters";
import { getLevel } from "../gd/searchLevels";
import * as log from "../util/logger";
import { sendLevel } from "../commands/level";

log.info("level.ts handler initialized");

bot.action(/level_/, async ctx => {
    if (!ctx.has(callbackQuery("data"))) return;
    
    const [shit, level_id] = ctx.callbackQuery.data.split("_");

    ctx.reply("Loading...")
    .then(async msg => { 
        if (!ctx.from) return;
        await sendLevel(ctx.from.id, Number(level_id), msg.message_id);
        ctx.answerCbQuery();
    })
})