export interface DBUser {
    user_id: number,
    username: string,
    language_code: string,
    joined_at: Date,
    search_filters: SearchFilters
}

export interface SearchFilters {
    type: number,
    diff: Array<Number>,
    demonFilter: number,
    len: Array<Number>,
}

export const SearchFiltersDefault: SearchFilters = { 
    type: 2,
    diff: [],
    demonFilter: 3,
    len: []
}