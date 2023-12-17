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
    Featured = 6,
    Magic = 7,
    Awarded = 11
}

export enum LevelDiffuculty {
    Auto = -3,
    Easy = 1,
    Normal = 2,
    Hard = 3, 
    Harder = 4,
    Insane = 5,
    Demon = -2
}

export enum DemonFilter {
    EasyDemon = 1,
    MediumDemon = 2,
    HardDemon = 3,
    InsaneDemon = 4,
    ExtremeDemon = 5
}

export enum LevelLength {
    Tiny = 0,
    Short = 1,
    Medium = 2,
    Long = 3,
    XL = 4
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
