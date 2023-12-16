export interface GDLevelData {
    id: string
    name: string
    author: string
    difficultyColor: string
}

export enum SearchType {
    MostDownloaded = 1,
    MostLiked = 2,
    Trending = 3,
    Recent = 4,
    Magic = 7,
    Awarded = 11
}

export enum DifficultyColor {
    na = "⚪",
    easy = "🔵",
    normal = "🟢",
    hard = "🟡",
    harder = "🟠",
    insane = "🟣",
    demon = "🔴",
    auto = "🟡 (a)"
}
