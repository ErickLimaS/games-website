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
function setToken(data: ServerResult) {

    if (data.token) {

        localStorage.setItem('access_token', data.token.access_token)
        localStorage.setItem('expires_in', data.token.expires_in)

    }
    return

}

// will run when theres a fetch error
function errorHandling(error: any) {

    localStorage.getItem('access_token') && localStorage.removeItem('access_token')
    localStorage.getItem('expires_in') && localStorage.removeItem('expires_in')

    console.error(error)

    return {
        success: error.response.data.success || false,
        status: error.response.request.status,
        message: error.response.data.message
    }

}

// standardizes all important data fetched from API
const queryAllFields = 'fields *, expansions.*, dlcs.*, release_dates.*, similar_games.*, similar_games.cover.*, similar_games.themes.*, similar_games.cover, similar_games.involved_companies, similar_games.involved_companies.company.*, videos.*, involved_companies.*, involved_companies.company.*, artworks.*, age_ratings.*, age_ratings.category, age_ratings.rating_cover_url, cover.*, game_modes.*, genres.*, keywords.*, screenshots.*, platforms.*, parent_game.*, parent_game.dlcs.*, parent_game.expansions.*, themes.*;'

export async function fetchHomePageData(genre?: string, platform?: string) {

    try {
        const { data } = await Axios(reqConfig(

            {
                query:
                    `query games "This Month Releases" {
                        ${queryAllFields}
                        where artworks != null & rating > 70 & first_release_date != null;
                        sort first_release_date desc;
                        limit 20;
                    };
                    query games "${genre || `horror`} Genre" {
                        ${queryAllFields}
                        where artworks != null & themes.slug = "${genre || `horror`}";
                        limit 20;
                    };
                    query games "Games to Platform ${platform || `130`}" {
                        ${queryAllFields}
                        where rating > 70 & artworks != null & platforms = ${platform || `130`};
                        sort rating desc;
                        sort rating_count desc;
                    };
                    query themes "Themes Limited To 18" {
                        fields *; 
                        limit 18;
                    };
                    `,
                route: '/multiquery'
            }
        ))

        setToken(data)

        return data.result

    } catch (err) {

        return errorHandling(err)

    }

}

export async function searchGame(gameName: string) {

    try {
        const { data } = await Axios(reqConfig(
            {
                query:
                    `${queryAllFields}
                    search "${gameName}"; 
                    limit 5;
                    `
            }
        ))

        setToken(data)

        return data.result

    } catch (err) {

        return errorHandling(err)

    }

}

// either on Game Page and Expansion Page
export async function fetchGameInfo(gameUrlSlug: string) {

    try {
        const { data } = await Axios(reqConfig(
            {
                query:
                    `${queryAllFields}
                    where slug = "${gameUrlSlug}";
                    `,
                hltbData: true
            }
        ))

        return data.result[0]

    } catch (err) {

        return errorHandling(err)

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
                    sort first_release_date desc;
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

        return errorHandling(err)

    }


}

export async function fetchPlatform(
    platformId: string,
    pagination?: {
        latestReleasePag: number
    }) {

    try {
        const { data } = await Axios(reqConfig(
            {
                query: `
                    query platforms "Platform ${platformId}" {
                        fields *, platform_logo.*, versions.*, versions.platform_version_release_dates.*;
                        where id = ${platformId}; 
                        limit 1;
                    };

                    query games "Exclusives on Platform ${platformId}" {
                        ${queryAllFields}
                        where artworks != null & platforms = ${platformId} & rating > 80;
                        sort first_release_date desc;
                        limit 20;
                    };

                    query games "Highest Rating games from ${platformId}" {
                        ${queryAllFields}
                        where artworks != null & platforms = ${platformId} & rating != null;
                        sort rating desc;
                        limit 60;
                    };

                    query games "Latest Release games from ${platformId}" {
                        ${queryAllFields}
                        where artworks != null & release_dates != null & platforms = ${platformId} & rating != null;
                        sort release_dates desc;
                        limit 8;
                        offset ${pagination ? (pagination?.latestReleasePag * 8) : 0};
                    };`,
                route: '/multiquery'
            }
        ))

        return data.result

    } catch (err) {

        return errorHandling(err)

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

        return errorHandling(err)

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
                        where artworks != null & involved_companies.company.slug = "${companySlug}" & rating > 80;
                        limit 7;
                        sort rating desc;
                    };

                    query games "Latest Release games from ${companySlug}" {
                        ${queryAllFields}
                        where artworks != null & involved_companies.company.slug = "${companySlug}" & rating != null & release_dates != null;
                        sort first_release_date desc;
                    };

                    query games "More games from ${companySlug}" {
                        ${queryAllFields}
                        where artworks != null & involved_companies.company.slug = "${companySlug}" & rating != null;
                    };`,
                route: '/multiquery'
            }
        ))

        return data.result

    }
    catch (err) {

        return errorHandling(err)

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
                        sort first_release_date desc;
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

        return errorHandling(err)

    }

}

export async function fetchLatestReleases() {

    const date = new Date()
    const monthStart = new Date(`${date.getFullYear()}-${date.getMonth() + 1}-01`)
    const monthEnd = new Date(`${date.getFullYear()}-${date.getMonth() + 1}-31`)

    try {
        const { data } = await Axios(reqConfig(

            {
                query:
                    `query games "Releases" {
                        ${queryAllFields}
                        where artworks != null & 
                            rating >= 70 &
                            release_dates.y = ${date.getFullYear()} & 
                            first_release_date >= ${date.getTime()} &
                            release_dates != null & 
                            first_release_date != null &
                            rating != null;
                        sort first_release_date desc;
                    };
                    query games "Not Launch Yet" {
                        ${queryAllFields}
                        where artworks != null &
                            release_dates.m = ${date.getMonth() + 1} & 
                            release_dates.y = ${date.getFullYear()} & 
                            first_release_date <= ${monthEnd.getTime()} &
                            release_dates != null & 
                            first_release_date != null;
                        sort first_release_date desc;
                    };
                    query games "Launched This Month" {
                        ${queryAllFields}
                        where artworks != null &
                            first_release_date <= ${date.getTime()} &
                            release_dates.date != null &
                            rating != null &
                            release_dates != null;
                        sort first_release_date desc;
                    };
                    query games "Best Ratings of The Month" {
                        ${queryAllFields}
                        where artworks != null &
                            first_release_date >= ${monthStart.getTime()} &
                            rating != null & 
                            first_release_date != null;
                        sort rating desc;
                        sort rating_count desc;
                        sort first_release_date desc;
                    };
                    `,
                route: '/multiquery'
            }
        ))
        
        setToken(data)

        return data.result

    } catch (err) {

        return errorHandling(err)

    }

}