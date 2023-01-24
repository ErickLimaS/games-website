interface GameInfo {

    id: number,
    name: string,
    rating: number,
    storyline: string,
    summary: string,
    expansions: [{
        name: string,
        slug: string,
        first_release_date: number,
        rating: number
    }]
    age_ratings: [{
        category: number,
        rating: number,
    }],
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
    themes: [
        {
            name: string,
            slug: string
        }
    ],
    videos: [Videos],
    platforms: [Platforms]
    similar_games: [SimilarGames]

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

interface SimilarGames {
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