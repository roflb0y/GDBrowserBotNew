import { bot } from "../bot";
import * as log from "../util/logger";
import { parseSearchFilters } from "../gd/parser";
import { isSearchFilters } from "../util/utils";
import { sendPage } from "./search";

log.info("/path command initialized");

bot.command("path", async ctx => {
    const splittedCmd = ctx.message.text.split(" ");
    splittedCmd.shift();
    const path = splittedCmd[0];

    if (!path) {
        ctx.reply("No valid path was provided");
        return;
    }

    const parsedPath = parseSearchFilters(path);
    if (!parsedPath) {
        ctx.reply("Error while parsing the path");
        return;
    }

    if (!isSearchFilters(parsedPath)) {
        ctx.reply(`Error while parsing: ${parsedPath}`);
        return;
    }

    const page = Number(path.split(":").slice(-1));

    if (Number.isNaN(page)) {
        ctx.reply(`Error while parsing: page is invalid`);
        return;
    }

    ctx.reply("Loading...")
    .then(async msg => sendPage(ctx.from.id, parsedPath, msg.message_id, page))
})