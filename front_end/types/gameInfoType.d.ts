interface GameInfo {

    id: number,
    name: string,
    rating: number,
    storyline: string,
    summary: string,
    rating_count: number,
    expansions: [{
        name: string,
        slug: string,
        first_release_date: number,
        rating: number
    }]
    age_ratings: [AgeRating],
    game_modes: [
        {
            name: string,
            slug: string
        }
    ],
    involved_companies: [{
        company: {
            name: string,
            slug: string
        }
    }],
    cover: {
        url: string | undefined,
        image_id: string | undefined
    },
    screenshots: [
        {
            image_id: string,
            url: string | undefined
        }
    ]
    artworks: [
        {
            image_id: string,
            url: string | undefined
        }
    ]
    slug: string,
    first_release_date: number,
    genres: [Genres],
    themes: [Themes],
    videos: [Videos],
    platforms: [Platforms]
    similar_games: [SimilarGames]

}

interface Themes {

    name: string,
    slug: string

}

interface Genres {

    name: string,
    slug: string

}

interface AgeRating {
    category: number,
    rating: number
}

interface Videos {
    id: number,
    video_id: string,
    name: string,
    url: string | undefined
}

interface Platforms {

    name: string,
    slug: string,
    id: number,

}

interface SimilarGames extends GameInfo {
    slug: string,
    cover: {
        url: string | undefined,
        image_id: string | undefined
    },
    first_release_date: number,
    involved_companies: [{
        company: {
            name: string,
            slug: string
        }
    }],
    themes: [
        {
            name: string,
            slug: string
        }
    ],
    id: number,
    name: string,
    rating: number,
}