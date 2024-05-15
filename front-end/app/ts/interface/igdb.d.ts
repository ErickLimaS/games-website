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
    genres: {
        name: string,
        slug: string,
        checksum: string
    }[],
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