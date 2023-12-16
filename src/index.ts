import { bot } from "./bot";
import * as log from "./util/logger";

import "./commands/init";
import "./handlers/init";

(async () => {
    bot.launch();

    const me = await bot.telegram.getMe();
    log.info(`Bot started as @${me.username}`);
})()