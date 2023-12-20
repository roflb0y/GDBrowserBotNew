import { bot } from "./bot";
import mongoose from "mongoose";
import * as log from "./util/logger";
import * as config from "./config";

log.info("Launching the bot...");

import "./commands/init";
import "./handlers/init";
import "./admin/videoSetHandler";

(async () => {
    log.info("Connecting to db...");
    mongoose
        .connect(config.MONGODB_URL, {
            user: config.MONGODB_USER, 
            pass: config.MONGODB_PASS, 
            dbName: config.MONGODB_DBNAME 
        })
        .then(async(res) => {
            log.info("Connected to db");
            log.info("Starting long polling...");
            bot.launch();

            const me = await bot.telegram.getMe();
            log.info("");
            log.info(`Bot started as @${me.username}`);
        })
        .catch((err) => log.error(err))
    
})()