interface GameInfo {

    id: number,
    name: string,
    rating: number,
    artworks: {
        image_id: number
    }[],
    cover: {
        image_id: number,
        url: string,
        game: number
    },
    slug: string,
    storyline: string,
    summary: string,
    first_release_date: number,
    game_modes: {}[],
    genres: igdbGenre[],
    platforms: {}[],
    screenshots: {}[],
    similar_games: {}[],
    tags: {}[],
    themes: {
        name: string,
        slug: string,
    }[],
    videos: {}[]

}

interface igdbGenre {

    id: number,
    created_at: number,
    name: string,
    slug: string,
    updated_at: number,
    url: string,
    checksum: string,

}