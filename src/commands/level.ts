import * as sendCheckVideos from "../admin/sendCheckVideos";
import { bot } from "../bot";
import { getLevel } from "../gd/searchLevels";
import * as log from "../util/logger";
import * as utils from "../util/utils";
import { getVideoFromCache } from "../yt/cache";

export async function sendLevel(userId: number, levelId: number, messageIdToEdit: number): Promise<void> {
    getLevel(levelId)
    .then(async levelData => {
        if (levelData.level === null) {
            await bot.telegram.editMessageText(userId, messageIdToEdit, undefined, "пизда");
            return;
        }

        const nameAndCreator = `${levelData.level.name} by ${levelData.creator ? levelData.creator.username : "-"}`;
        const video = getVideoFromCache(levelData.level.id);

        let videoStr = "";
        if (video) {
            videoStr = utils.prepareString(`\n\nVideo: ${video}`);
        } else { 
            sendCheckVideos.sendVideos(levelData.level.id, nameAndCreator);
        };
        
        bot.telegram.editMessageText(userId, messageIdToEdit, undefined, `${utils.prepareString(nameAndCreator)}\nID: \`${levelData.level.id}\`${videoStr}`, { parse_mode: "MarkdownV2" })
        .catch(err => { log.error(`Failed to edit message ${messageIdToEdit} in chat ${userId}`); console.log(err) });
    })
}
