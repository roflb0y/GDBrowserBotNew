export interface DBUser {
    user_id: number,
    username: string,
    language_code: string,
    joined_at: Date,
    search_settings: SearchFilters
}

export interface SearchFilters {
    searchType: number,
    levelDifficulty: Array<Number>,
    demonFilter: number,
    levelLength: Array<Number>,
}

export const SearchFiltersDefault: SearchFilters = { 
    searchType: 2,
    levelDifficulty: [],
    demonFilter: 3,
    levelLength: []
}