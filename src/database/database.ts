import { MUser } from "./schemas";
import { User } from "telegraf/typings/core/types/typegram";
import { DBUser } from "./interface";
import * as log from "../util/logger";

export async function addUser(tguser: User): Promise<DBUser> {
    const user = await getUser(tguser.id);

    if (user) return user;
    const res = await new MUser({user_id: tguser.id, username: tguser.username, language_code: tguser.language_code}).save();
    log.info(`Inserted new user ${tguser.id}`);

    return res;
}

export async function getUser(userId: number): Promise<DBUser | undefined> {
    const user = await MUser.findOne({ user_id: userId })
    console.log(user);
    if (user === null) return undefined;

    return {
        user_id: user.user_id,
        username: user.username,
        language_code: user.language_code,
        joined_at: user.joined_at
    };
}