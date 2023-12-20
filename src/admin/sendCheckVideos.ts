import { SearchedLevel, User } from "gd.js";
import { bot } from "../bot";
import { ADMINS_ID } from "../config";
import { videosMarkupBuilder } from "../markups/checkVideos";
import { YTVideo } from "../yt/interface";
import { searchVideos } from "../yt/searchVideo";

export async function sendVideos(levelId: number, nameAndCreator: string): Promise<void> {
    const videos = await searchVideos(`Geometry Dash ${nameAndCreator}`);
    if (!videos) return;

    const inlineButtons = videosMarkupBuilder(videos, levelId);
    let msg = "";

    for (const [index, video] of videos.entries()) {
        msg += `${index + 1}. ${video.title} | ${video.url}\n`;
    };

    ADMINS_ID.forEach(async chatid => {
        bot.telegram.sendMessage(chatid, `Check videos for level ${levelId}\n${msg}`, inlineButtons);
    });
}