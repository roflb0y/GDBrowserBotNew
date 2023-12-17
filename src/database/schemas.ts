import mongoose from "mongoose";
import { SearchFiltersDefault } from "./interface";

const users = new mongoose.Schema({
    user_id: {
        type: Number,
        unique: true,
        default: 0
    },

    username: {
        type: String,
        default: ""
    },
    language_code: {
        type: String,
        default: "en"
    },

    joined_at: {
        type: Date,
        default: () => new Date().setHours(new Date().getHours() + 3)
    },

    search_filters: {
        searchType: { type: Number, default: SearchFiltersDefault.searchType },
        levelDifficulty: { type: Array<Number>, default: SearchFiltersDefault.levelDifficulty },
        demonFilter: { type: Number, default: SearchFiltersDefault.demonFilter },
        levelLength: { type: Array<Number>, default: SearchFiltersDefault.levelLength }
    }
})

export const MUser = mongoose.model("users", users);