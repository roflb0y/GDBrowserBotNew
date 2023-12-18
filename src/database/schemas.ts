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
        type: { type: Number, default: SearchFiltersDefault.type },
        diff: { type: Array<Number>, default: SearchFiltersDefault.diff },
        demonFilter: { type: Number, default: SearchFiltersDefault.demonFilter },
        len: { type: Array<Number>, default: SearchFiltersDefault.len }
    }
})

export const MUser = mongoose.model("users", users);