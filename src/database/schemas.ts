import mongoose from "mongoose";

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
    }
})

export const MUser = mongoose.model("users", users);