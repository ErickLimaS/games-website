import Axios from 'axios'

// const API_BASE = 'http://localhost:9000/api'
const API_BASE = process.env.API_RENDER_URL || `http://localhost:9000/api`

function reqConfig(body?: object) {

    // provided by the API, expires after some time
    const TOKEN: any = typeof window !== "undefined" && localStorage.getItem('access_token') ? localStorage.getItem('access_token') : null

    // let EXPIRATION: any = typeof window !== "undefined" && localStorage.getItem('expires_in') ? localStorage.getItem('expires_in') : null

    if (!TOKEN) {

        return {

            method: 'POST',
            url: `${API_BASE}/data`,
            data: body || null

        }

    }

    return {

        method: 'POST',
        url: `${API_BASE}/data`,
        headers: {
            'Authorization': `Bearer ${TOKEN}`
        },
        data: body || null

    }
}

// if client browser doesnt have a valid token, it stores a new working token
function setToken(data: { result: object[], success: boolean, token?: { access_token: string, expires_in: string } | null }) {

    if (data.token) {

        localStorage.setItem('access_token', data.token.access_token)
        localStorage.setItem('expires_in', data.token.expires_in)

    }
    return

}

// standardizes all important data fetched from API
const queryAllFields = 'fields *, expansions.*, similar_games.*, similar_games.cover.*, similar_games.themes.*, similar_games.cover, similar_games.involved_companies, similar_games.involved_companies.company.*, videos.*, involved_companies.*, involved_companies.company.*, artworks.*, age_ratings.*, age_ratings.category, age_ratings.rating_cover_url,  cover.*, game_modes.*, genres.*, keywords.*, screenshots.*, platforms.*, themes.*;'

export async function homePageGames() {

    try {
        const { data } = await Axios(reqConfig(

            {
                query:
                    `${queryAllFields}
                where artworks != null & rating > 80 & release_dates.m = ${new Date().getMonth() + 1} & release_dates.y = ${new Date().getFullYear()};
                sort release_dates.date desc;
                limit 20;`
            }
        ))

        setToken(data)

        return data.result

    } catch (err) {

        localStorage.removeItem('access_token')
        localStorage.removeItem('expires_in')

    }

}

export async function searchGame(gameName: string) {

    try {
        const { data } = await Axios(reqConfig(
            {
                query:
                    `${queryAllFields} search "${gameName}"; limit 5;`
            }
        ))

        return data.result

    } catch (err) {

        localStorage.removeItem('access_token')
        localStorage.removeItem('expires_in')

    }

}

export async function fetchGameInfo(gameUrlSlug: string) {

    try {
        const { data } = await Axios(reqConfig({ query: `${queryAllFields} where slug = "${gameUrlSlug}";` }))

        return data.result[0]

    } catch (err) {

        localStorage.removeItem('access_token')
        localStorage.removeItem('expires_in')

    }

}

export async function fetchGamesByGenre(genreSlug: string) {

    try {
        const { data } = await Axios(reqConfig(
            {
                query: `
                query themes "Genre ${genreSlug}" {
                    fields *;
                    where slug = "${genreSlug}";
                };
                query games "Game Ratings on ${genreSlug} genre" {
                    ${queryAllFields} 
                    where themes.slug = "${genreSlug}" & rating != null;
                    sort rating desc;
                    limit 15;
                };
                query games "Latest Releases on ${genreSlug} genre" {
                    ${queryAllFields} 
                    where themes.slug = "${genreSlug}";
                    sort first_release_date.date desc;
                    limit 15;
                };
                query games "More Games on ${genreSlug} genre" {
                    ${queryAllFields} 
                    where themes.slug = "${genreSlug}";
                    limit 15;
                };`,
                route: '/multiquery'
            }
        ))

        return data.result

    } catch (err) {

        localStorage.removeItem('access_token')
        localStorage.removeItem('expires_in')

    }


}

export async function fetchGamesByPlatform(platform: string) {

    try {
        const { data } = await Axios(reqConfig(
            {
                query: `${queryAllFields} where artworks != null & platforms.id = (${platform});`
            }
        ))

        return data.result

    } catch (err) {

        localStorage.removeItem('access_token')
        localStorage.removeItem('expires_in')

    }


}

export async function fetchUpcomingGamesRelease() {

    try {
        const date = new Date()
        const yyyy = date.getFullYear()
        const mm = date.getMonth()

        const { data } = await Axios(reqConfig({ query: `fields *; where hypes != null & status != 0 & release_dates.y = ${yyyy} & release_dates.m = ${mm};` }))

        return data.result

    } catch (err) {

        localStorage.removeItem('access_token')
        localStorage.removeItem('expires_in')

    }
}

export async function fetchThemes() {

    try {

        const { data } = await Axios(reqConfig({ query: `fields *; limit 18;`, route: '/themes' }))

        return data.result

    }
    catch (err) {

        localStorage.removeItem('access_token')
        localStorage.removeItem('expires_in')

    }

}

export async function fetchCompany(
    companySlug: string,
    pagination?: {
        latestReleasePag: number
    }) {

    try {

        const { data } = await Axios(reqConfig(
            {
                query: `
                    query companies "Company ${companySlug}" {
                        fields *, description, developed.*, published.*, logo.*;
                        where slug = "${companySlug}"; 
                        limit 1;
                    };

                    query games "Highest Rating games from ${companySlug}" {
                        ${queryAllFields}
                        where artworks != null & involved_companies.company.slug = "${companySlug}" & rating != null;
                        sort rating desc;
                        limit 6;
                    };

                    query games "Latest Release games from ${companySlug}" {
                        ${queryAllFields}
                        where artworks != null & involved_companies.company.slug = "${companySlug}";
                        sort release_dates.human desc;
                        limit 8;
                        offset ${pagination ? (pagination?.latestReleasePag * 8) : 0};
                    };`,
                route: '/multiquery'
            }
        ))

        return data.result

    }
    catch (err) {

        localStorage.removeItem('access_token')
        localStorage.removeItem('expires_in')

    }

}

export async function fetchGameMode(
    gameModeSlug: string,
    pagination?: {
        latestReleasePag: number
    }) {

    try {

        const { data } = await Axios(reqConfig(
            {
                query: `
                    query game_modes "Game Mode ${gameModeSlug}" {
                        fields *;
                        where slug = "${gameModeSlug}"; 
                        limit 1;
                    };

                    query games "Highest Rating games from ${gameModeSlug} mode" {
                        ${queryAllFields}
                        where artworks != null & game_modes.slug = "${gameModeSlug}" & rating != null;
                        sort rating desc;
                        limit 6;
                    };

                    query games "Latest Release games from ${gameModeSlug} mode" {
                        ${queryAllFields}
                        where artworks != null & game_modes.slug = "${gameModeSlug}";
                        sort release_dates.human desc;
                        limit 8;
                        offset ${pagination ? (pagination?.latestReleasePag * 8) : 0};
                    };
                    
                    query games "More Games on ${gameModeSlug} mode" {
                        ${queryAllFields} 
                        where game_modes.slug = "${gameModeSlug}";
                        limit 15;
                    };`,
                route: '/multiquery'
            }
        ))

        return data.result

    }
    catch (err) {

        localStorage.removeItem('access_token')
        localStorage.removeItem('expires_in')

    }

}