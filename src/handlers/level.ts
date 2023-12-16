import { bot } from "../bot";
import { callbackQuery } from "telegraf/filters";
import { getLevel } from "../gd/searchLevels";

bot.action(/level_/, async ctx => {
    if (!ctx.has(callbackQuery("data"))) return;
    const [shit, level_id] = ctx.callbackQuery.data.split("_");

    getLevel(Number(level_id))
    .then(async levelData => {
        if (levelData.level === null) {
            ctx.reply("пизда");
            return;
        }

        ctx.reply(`${levelData.level.name} by ${levelData.creator ? levelData.creator.username : "-"}`);
        console.log(levelData.level.song.isCustom ? levelData.level.song.url : "fuck");
        ctx.answerCbQuery();
    })
})