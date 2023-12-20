import { Telegraf, Scenes, session } from "telegraf";
import { setOtherVideoScene } from "./admin/setOtherVideoScene";

import * as config from "./config";
import { GDBBContext } from "./scenes/interface";

export const bot = new Telegraf<GDBBContext>(config.BOT_TOKEN);
const stage = new Scenes.Stage<GDBBContext>([setOtherVideoScene]);

bot.use(session());
bot.use(stage.middleware());