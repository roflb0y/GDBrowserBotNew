import { Markup } from "telegraf";
import { InlineKeyboardButton } from "telegraf/typings/core/types/typegram";
import { YTVideo } from "../yt/interface";

export const videosMarkupBuilder = (videos: YTVideo[], levelId: number) => {
    let videosButtons: InlineKeyboardButton.CallbackButton[][] = [];

    for (const [index, video] of videos.entries()) {
        videosButtons.push([Markup.button.callback(`${index + 1}`, `setvideo|${levelId}|${video.id.videoId}`)]);
    }

    videosButtons.push([Markup.button.callback(`Set other video`, `setvideo|${levelId}|0`)]);

    return Markup.inlineKeyboard(videosButtons);
}