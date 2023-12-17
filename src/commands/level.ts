import { bot } from "../bot";
import { getLevel } from "../gd/searchLevels";
import * as log from "../util/logger";

export async function sendLevel(userId: number, levelId: number, messageIdToEdit: number): Promise<void> {
    getLevel(levelId)
    .then(async levelData => {
        if (levelData.level === null) {
            await bot.telegram.editMessageText(userId, messageIdToEdit, undefined, "пизда");
            return;
        }

        bot.telegram.editMessageText(userId, messageIdToEdit, undefined, `${levelData.level.name} by ${levelData.creator ? levelData.creator.username : "-"}\nID: \`${levelData.level.id}\``, { parse_mode: "MarkdownV2" })
        .catch(err => { log.error(`Failed to edit message ${messageIdToEdit} in chat ${userId}`); console.log(err) });
    })
}
