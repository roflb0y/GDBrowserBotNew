import { Scenes } from "telegraf";
import { callbackQuery } from "telegraf/filters";
import { GDBBContext } from "../scenes/interface";
import { Message } from "telegraf/typings/core/types/typegram";
import { setCache } from "../yt/cache";

export const setOtherVideoScene = new Scenes.WizardScene<GDBBContext>("SET_OTHER_VIDEO_SCENE", 
    async ctx => {
        if (!ctx.has(callbackQuery("data"))) { ctx.scene.leave(); return }

        const [sdifhgbsdjhfb, levelId, videoId] = ctx.callbackQuery.data.split("|");

        ctx.scene.session.levelId = levelId;
        ctx.reply("Send video id");

        ctx.wizard.next();
    },
    async ctx => {
        if (ctx.callbackQuery) return;

        const videoId = (ctx.message as Message.TextMessage).text;
        setCache(ctx.scene.session.levelId, videoId);
        ctx.reply(`Video ${videoId} saved for ${ctx.scene.session.levelId}`);
        
        ctx.scene.leave();
    }
);