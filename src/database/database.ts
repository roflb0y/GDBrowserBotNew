import { MUser } from "./schemas";
import { User } from "telegraf/typings/core/types/typegram";
import { DBUser, SearchFiltersDefault } from "./interface";
import * as log from "../util/logger";
import { toggleArrayValue } from "../util/utils";

function defaultUser(user: any): DBUser {
    return {
        user_id: user.user_id,
        username: user.username,
        language_code: user.language_code,
        joined_at: user.joined_at,
        search_filters: user.search_filters
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

export async function setFilter(userId: number, filter: string, value: number): Promise<DBUser | undefined> {
    const user = await getUser(userId);
    if (!user) return;

    let newFilter;

    if (filter === "levelDifficulty" || filter === "levelLength") {
        const filterToUpdate = user.search_filters[filter];
        newFilter = toggleArrayValue(filterToUpdate, value, true);
        if (newFilter.includes(-2)) newFilter = [newFilter[0]];
    } else {
        newFilter = value;
    }
    const updatedSettingsUser = await MUser.findOneAndUpdate({ user_id: userId }, { [`search_filters.${filter}`]: newFilter }, { returnDocument: "after" });

    if (!updatedSettingsUser) return undefined;
    log.db(`${userId} updated settings - ${filter} = ${newFilter}`);
    return defaultUser(updatedSettingsUser);
}

export async function resetFilters(userId: number) {
    const updatedFiltersUser = await MUser.findOneAndUpdate({ user_id: userId }, { "search_filters": SearchFiltersDefault }, { returnDocument: "after" });

    if (!updatedFiltersUser) return undefined;
    log.db(`${userId} reset settings to default`);
    return defaultUser(updatedFiltersUser);
}