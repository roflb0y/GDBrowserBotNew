export interface DBUser {
    user_id: number,
    username: string,
    language_code: string,
    joined_at: Date,
    search_settings: SearchSettings
}

export interface SearchSettings {
    searchType: number
}