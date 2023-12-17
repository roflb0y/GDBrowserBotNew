import { Markup } from "telegraf";

export const mainKeyboard = Markup.keyboard(
    [
        [
            Markup.button.text("🔎 Search"), 
            Markup.button.text("⚙ Filters")
        ]
    ]
).resize()