interface GameInfo {
    id: number,
    name: string,
    rating: number,
    storyline: string,
    summary: string,
    rating_count: number,
    expansions: ExpansionsAndDlcs[],
    dlcs: ExpansionsAndDlcs[],
    age_ratings: [AgeRating],
    game_modes: GameModes[],
    involved_companies: [InvolvedCompanies],
    cover: {
        url: string | undefined,
        image_id: string | undefined
    },
    screenshots: ArtworksAndScreenshots[],
    artworks: ArtworksAndScreenshots[],
    parent_game: GameInfo,
    slug: string,
    first_release_date: number,
    genres: [Genres],
    themes: [Themes],
    videos: [Videos],
    platforms: [Platforms]
    similar_games: [SimilarGames],
    hltb: {
        main: string,
        mainExtra: string,
        completionist: string
    }

}

interface InvolvedCompanies {
    publisher: boolean,
    developer: boolean,
    company: Company
}

interface GameModes {
    name: string,
    slug: string
}

interface ExpansionsAndDlcs {

    name: string,
    slug: string,
    first_release_date: number,
    rating: number | null

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

interface ArtworksAndScreenshots {
    image_id: string,
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
