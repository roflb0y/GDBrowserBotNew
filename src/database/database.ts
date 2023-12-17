import { MUser } from "./schemas";
import { User } from "telegraf/typings/core/types/typegram";
import { DBUser, SearchSettings } from "./interface";
import * as log from "../util/logger";

function defaultUser(user: any): DBUser {
    return {
        user_id: user.user_id,
        username: user.username,
        language_code: user.language_code,
        joined_at: user.joined_at,
        search_settings: user.search_settings || { searchType: 0 }
    };
}

export async function addUser(tguser: User): Promise<DBUser | undefined> {
    const user = await getUser(tguser.id);

    if (user) return user;
    const res = await new MUser({user_id: tguser.id, username: tguser.username, language_code: tguser.language_code}).save();
    log.db(`Inserted new user ${tguser.id}`);

    if (!res) return undefined;
    console.log(res);

    return defaultUser(res);
}

export async function getUser(userId: number): Promise<DBUser | undefined> {
    const user = await MUser.findOne({ user_id: userId })
    if (user === null) return undefined;

    return defaultUser(user);
}

export async function setSetting(userId: number, setting: string, value: number): Promise<DBUser | undefined> {
    const user = await MUser.findOneAndUpdate({ user_id: userId }, { [`search_settings.${setting}`]: value }, { returnDocument: "after" });

    if (!user) return undefined;
    log.db(`${userId} updated settings - ${setting} = ${value}`)
    return defaultUser(user);
}