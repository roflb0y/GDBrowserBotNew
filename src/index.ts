import { bot } from "./bot";
import mongoose from "mongoose";
import * as log from "./util/logger";
import * as config from "./config";

import * as db from "./database/database";

import "./commands/init";
import "./handlers/init";

(async () => {
    mongoose
        .connect(config.MONGODB_URL, {
            user: config.MONGODB_USER, 
            pass: config.MONGODB_PASS, 
            dbName: config.MONGODB_DBNAME 
        })
        .then(async(res) => {
            log.info("Connected to db")
            bot.launch();

            const me = await bot.telegram.getMe();
            log.info(`Bot started as @${me.username}`);
        })
        .catch((err) => log.error(err))
    
})()