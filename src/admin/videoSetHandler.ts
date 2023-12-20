import { bot } from "../bot";
import { callbackQuery } from "telegraf/filters";
import { setCache } from "../yt/cache";

bot.action(/setvideo/, async ctx => {
    if (!ctx.has(callbackQuery("data"))) return;

    const [sdifhgbsdjhfb, levelId, videoId] = ctx.callbackQuery.data.split("|");

    if (videoId === "0") {
        ctx.scene.enter("SET_OTHER_VIDEO_SCENE");
        return;
    }

    setCache(Number(levelId), videoId);

    ctx.editMessageText(`Video ${videoId} saved for ${levelId}`, { reply_markup: undefined });
})