import Axios from 'axios'
import axiosRetry from 'axios-retry'
import Swal from 'sweetalert2'

const API_BASE = 'https://api.igdb.com/v4'
const CORS_ANYWHERE = 'https://cors-anywhere.herokuapp.com/'
const AUTHORIZATION = localStorage.getItem('token')
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID

//retrys when it catchs a error on requests with status 401 = not authorized
axiosRetry(Axios, {
    retries: 2,
    retryDelay: (retryCount) => {
        window.location.reload()
        return retryCount * 2000; // time interval between retries
    },
    retryCondition: (error) => {
        return error.response.status === 401;
    },
});

// eslint-disable-next-line import/no-anonymous-default-export
export default {

    //gets a new token for authorization
    tokenValidation: async () => {

        const { data } = await Axios({
            method: 'POST',
            url: `https://id.twitch.tv/oauth2/token?client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}&grant_type=client_credentials`,
            headers: {
                'Accept': 'application/json',
            },
        })
        localStorage.setItem('token', data.access_token)
        localStorage.setItem('token_date_inserted', new Date())
        localStorage.setItem('token_expiration', data.expires_in)

    },

    getGameInfo: async (gameId) => {

        let gameInfo = [
            {

                name: '',
                id: '',
                cover: {},
                storyline: '',
                rating: '',
                rating_count: '',
                total_rating: '',
                total_rating_count: '',
                follows: '',
                slug: '',
                age_ratings: {},
                artworks: '',
                screenshots: {},
                videos: {},
                involved_companies: {},
                release_dates: {},
                first_release_date: '',
                genres: {},
                summary: '',
                platforms: {},
                // aggregated_rating: '',
                // aggregated_rating_count: '',
                // alternative_names: {},
                // bundles: '',
                // category: '',
                // checksum: '',
                // collection: '',
                // created_at: '',
                // external_games: {},
                franchises: '',
                game_engines: '',
                game_modes: {},
                // hypes: '',
                // keywords: {},
                multiplayer_modes: {},
                player_perspectives: {},
                // remasters: {},
                similar_games: {},
                // tags: {},
                themes: {},
                // updated_at: '',
                // url: '',
                // websites: {},


            }
        ]

        await Axios({
            url: `${CORS_ANYWHERE}${API_BASE}/multiquery`,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Client-ID': `${CLIENT_ID}`,
                'Authorization': `Bearer ${AUTHORIZATION}`,
            },
            data: `
                query games "Chosed Game"{
                    fields *,genres.*, age_ratings.*, age_ratings.rating_cover_url, age_ratings.content_descriptions.*,   screenshots.*,videos.*,summary,artworks.*,platforms.*,themes.*,similar_games.*,similar_games.cover.*,player_perspectives.*,multiplayer_modes.*,multiplayer_modes.platform.*,game_modes.*,franchises.*,involved_companies.company.*,involved_companies.company.logo.*,release_dates.*,cover.*;
                    where slug = "${gameId}";
                };
            `

        }).then(async (response) => { //all data here

            //get name
            gameInfo[0].name = response.data[0].result[0].name;

            //get id
            gameInfo[0].id = response.data[0].result[0].id;

            //get summary
            gameInfo[0].summary = response.data[0].result[0].summary;

            //get storyline
            gameInfo[0].storyline = response.data[0].result[0].storyline;

            //get genres
            gameInfo[0].genres = response.data[0].result[0].genres;

            //get rating
            gameInfo[0].rating = response.data[0].result[0].rating;

            //get rating count
            gameInfo[0].rating_count = response.data[0].result[0].rating_count;

            //get total rating
            gameInfo[0].total_rating = response.data[0].result[0].total_rating;

            //get total rating count
            gameInfo[0].total_rating_count = response.data[0].result[0].total_rating_count;

            //get follows
            gameInfo[0].follows = response.data[0].result[0].follows;

            //get slug
            gameInfo[0].slug = response.data[0].result[0].slug;

            //get ScreenShots
            gameInfo[0].screenshots = response.data[0].result[0].screenshots

            //get Videos
            gameInfo[0].videos = response.data[0].result[0].videos

            //get Platforms
            gameInfo[0].platforms = response.data[0].result[0].platforms

            //get Game Modes
            gameInfo[0].game_modes = response.data[0].result[0].game_modes

            //get Franchises
            gameInfo[0].franchises = response.data[0].result[0].franchises

            //get Player Perspective
            gameInfo[0].player_perspectives = response.data[0].result[0].player_perspectives

            //get Similar Games
            gameInfo[0].similar_games = response.data[0].result[0].similar_games

            //get Cover
            gameInfo[0].cover = response.data[0].result[0].cover

            //get Themes
            gameInfo[0].themes = response.data[0].result[0].themes

            //get Similar games
            gameInfo[0].similar_games = response.data[0].result[0].similar_games

            //get Platforms
            gameInfo[0].platforms = response.data[0].result[0].platforms

            //get Multi Modes
            gameInfo[0].multiplayer_modes = response.data[0].result[0].multiplayer_modes

            //get Age Rating
            if (response.data[0].result[0].age_ratings) {
                gameInfo[0].age_ratings = await response.data[0].result[0].age_ratings.map(item => {

                    let filter = []

                    filter.id = (item.id)
                    filter.rating = (item.rating)
                    filter.synopsis = (item.synopsis)

                    switch (item.category) {
                        case 1:
                            switch (item.rating) {
                                case 6:
                                    return (filter.rating = 'RP') && (filter.category = 'ESRB') && (filter)
                                case 7:
                                    return (filter.rating = 'EC') && (filter.category = 'ESRB') && (filter)
                                case 8:
                                    return (filter.rating = 'E') && (filter.category = 'ESRB') && (filter)
                                case 9:
                                    return (filter.rating = 'E10') && (filter.category = 'ESRB') && (filter)
                                case 10:
                                    return (filter.rating = 'T') && (filter.category = 'ESRB') && (filter)
                                case 11:
                                    return (filter.rating = 'M') && (filter.category = 'ESRB') && (filter)
                                case 12:
                                    return (filter.rating = 'AO') && (filter.category = 'ESRB') && (filter)
                                default:
                                    return ''
                            }
                        case 2:
                            switch (item.rating) {
                                case 1:
                                    return (filter.rating = 'Three') && (filter.category = 'PEGI') && (filter)
                                case 2:
                                    return (filter.rating = 'Seven') && (filter.category = 'PEGI') && (filter)
                                case 3:
                                    return (filter.rating = 'Twelve') && (filter.category = 'PEGI') && (filter)
                                case 4:
                                    return (filter.rating = 'Sixteen') && (filter.category = 'PEGI') && (filter)
                                case 5:
                                    return (filter.rating = 'Eighteen') && (filter.category = 'PEGI') && (filter)
                                default:
                                    return ''
                            }
                        case 3:
                            switch (item.rating) {
                                case 13:
                                    return (filter.rating = 'CERO_A') && (filter.category = 'CERO') && (filter)
                                case 14:
                                    return (filter.rating = 'CERO_B') && (filter.category = 'CERO') && (filter)
                                case 15:
                                    return (filter.rating = 'CERO_C') && (filter.category = 'CERO') && (filter)
                                case 16:
                                    return (filter.rating = 'CERO_D') && (filter.category = 'CERO') && (filter)
                                case 17:
                                    return (filter.rating = 'CERO_Z') && (filter.category = 'CERO') && (filter)
                                default:
                                    return ''
                            }
                        case 4:
                            switch (item.rating) {
                                case 18:
                                    return (filter.rating = 'USK_0') && (filter.category = 'USK') && (filter)
                                case 19:
                                    return (filter.rating = 'USK_6') && (filter.category = 'USK') && (filter)
                                case 20:
                                    return (filter.rating = 'USK_12') && (filter.category = 'USK') && (filter)
                                case 21:
                                    return (filter.rating = 'USK_18') && (filter.category = 'USK') && (filter)
                                default:
                                    return ''
                            }
                        case 5:
                            switch (item.rating) {
                                case 22:
                                    return (filter.rating = 'GRAC_ALL') && (filter.category = 'GRAC') && (filter)
                                case 23:
                                    return (filter.rating = 'GRAC_Twelve') && (filter.category = 'GRAC') && (filter)
                                case 24:
                                    return (filter.rating = 'GRAC_Fifteen') && (filter.category = 'GRAC') && (filter)
                                case 25:
                                    return (filter.rating = 'GRAC_Eighteen') && (filter.category = 'GRAC') && (filter)
                                case 26:
                                    return (filter.rating = 'GRAC_TESTING') && (filter.category = 'GRAC') && (filter)
                                default:
                                    return ''
                            }
                        case 6:
                            switch (item.rating) {
                                case 27:
                                    return (filter.rating = 'CLASS_IND_L') && (filter.category = 'CLASS_IND') && (filter)
                                case 28:
                                    return (filter.rating = 'CLASS_IND_Ten') && (filter.category = 'CLASS_IND') && (filter)
                                case 29:
                                    return (filter.rating = 'CLASS_IND_Twelve') && (filter.category = 'CLASS_IND') && (filter)
                                case 30:
                                    return (filter.rating = 'CLASS_IND_Fourteen') && (filter.category = 'CLASS_IND') && (filter)
                                case 31:
                                    return (filter.rating = 'CLASS_IND_Sixteen') && (filter.category = 'CLASS_IND') && (filter)
                                case 32:
                                    return (filter.rating = 'CLASS_IND_Eighteen') && (filter.category = 'CLASS_IND') && (filter)
                                default:
                                    return ''
                            }
                        case 7:
                            switch (item.rating) {
                                case 33:
                                    return (filter.rating = 'ACB_G') && (filter.category = 'ACB') && (filter)
                                case 34:
                                    return (filter.rating = 'ACB_PG') && (filter.category = 'ACB') && (filter)
                                case 35:
                                    return (filter.rating = 'ACB_M') && (filter.category = 'ACB') && (filter)
                                case 36:
                                    return (filter.rating = 'ACB_MA15') && (filter.category = 'ACB') && (filter)
                                case 37:
                                    return (filter.rating = 'ACB_R18') && (filter.category = 'ACB') && (filter)
                                case 38:
                                    return (filter.rating = 'ACB_RC') && (filter.category = 'ACB') && (filter)
                                default:
                                    return ''
                            }
                        default:
                            return '';
                    }


                })
            }
            //get Artwork
            gameInfo[0].artworks = response.data[0].result[0].artworks

            //get Involved Companies - need to add Country
            gameInfo[0].involved_companies = response.data[0].result[0].involved_companies

            //get First release date
            gameInfo[0].first_release_date = response.data[0].result[0].release_dates[0].human


        }).catch(err => {
            console.error(err);
            if (err.response.status === 403) {
                Swal.fire({
                    title: 'Ops!',
                    text: 'A API usada tem um limite de teste que é renovada diariamente. Para usar o site entre no link descrito abaixo.',
                    icon: 'info',
                    footer: 'Esse link: https://cors-anywhere.herokuapp.com/corsdemo',
                    confirmButtonText: 'Já Ativei a API',
                    showConfirmButton: 'true',
                    confirmButtonColor: '#5c16c5',
                    backdrop: 'true',
                    width: '90vh',
                    allowOutsideClick: 'false'

                })
            }
            else if (err.response.status === 404) {
                alert(`Error 404: Não Encontrado.`)
            }
            else if (err.response.status === 429) {
                alert(`Problemas com a API. Muitas Requisições ao mesmo tempo. Tente atualizar a página.`)
            }
            console.error(err);
        });

        return gameInfo[0]
    },

    getSearchResults: async (searchedItem) => { // Value = any

        let data = await Axios({
            url: `${CORS_ANYWHERE}${API_BASE}/games/?search=${searchedItem}&fields=*,cover.*,release_dates.*`,
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Client-ID': `${CLIENT_ID}`,
                'Authorization': `Bearer ${AUTHORIZATION}`,
            },
            data: ""

        }
        ).then(response => {

            return response
        }).catch(err => {
            if (err.response.status === 403) {
                Swal.fire({
                    title: 'Ops!',
                    text: 'A API usada tem um limite de teste que é renovada diariamente. Para usar o site entre no link descrito abaixo.',
                    icon: 'info',
                    footer: 'https://cors-anywhere.herokuapp.com/corsdemo',
                    confirmButtonText: 'Já Ativei a API',
                    showConfirmButton: 'true',
                    confirmButtonColor: '#5c16c5',
                    backdrop: 'true',
                    width: '90vh',
                    allowOutsideClick: 'false'

                })
            }
            else if (err.response.status === 404) {
                alert(`Error 404: Não Encontrado.`)
            }
            else if (err.response.status === 429) {
                alert(`Problemas com a API. Muitas Requisições ao mesmo tempo. Tente atualizar a página.`)
            }
            console.error(err)
        })

        return data;

    },

    getMonthRelease: async () => {

        const { data } = await Axios({
            url: `${CORS_ANYWHERE}${API_BASE}/multiquery`,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Client-ID': `${CLIENT_ID}`,
                'Authorization': `Bearer ${AUTHORIZATION}`,
            },
            data: `
                query release_dates "Latest Releases" {
                    fields game.*, game.cover.*, game.artworks.*, game.screenshots.*, game.release_dates.*, game.platforms.*, game.player_perspectives.*, game.involved_companies.*, game.game_modes.*, game.themes.*;
                    where m = ${new Date().getMonth() + 1} & y = ${new Date().getFullYear()};
                    limit 15;
                };
                
            `
        }).catch(err => {
            if (err.response.status === 403) {
                Swal.fire({
                    title: 'Ops!',
                    text: 'A API usada tem um limite de teste que é renovada diariamente. Para usar o site entre no link descrito abaixo.',
                    icon: 'info',
                    footer: 'Esse link: https://cors-anywhere.herokuapp.com/corsdemo',
                    confirmButtonText: 'Já Ativei a API',
                    showConfirmButton: 'true',
                    confirmButtonColor: '#5c16c5',
                    backdrop: 'true',
                    width: '90vh',
                    allowOutsideClick: 'false',
                    didClose: () => {
                        window.location.reload()
                    }
                })
            }
            else if (err.response.status === 404) {
                alert(`Error 404: Não Encontrado.`)
            }
            else if (err.response.status === 429) {
                alert(`Problemas com a API. Muitas Requisições ao mesmo tempo. Tente atualizar a página.`)
            }
            console.error(err);
        })

        return data[0].result;

    },

    getLastMonthHighestRatings: async () => {

        const { data } = await Axios({
            url: `${CORS_ANYWHERE}${API_BASE}/multiquery`,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Client-ID': `${CLIENT_ID}`,
                'Authorization': `Bearer ${AUTHORIZATION}`,
            },
            data: `
                query release_dates "Highest Ratings"{
                    fields game.*, game.screenshots.*, game.artworks.*, game.cover.*, game.rating, game.release_dates.*, game.themes.*;
                    sort game.rating desc;
                    where game.rating != null & m = ${new Date().getMonth() - 1} & y = ${new Date().getFullYear()} ;
                    limit 15;
                };
            `
        }).catch(err => {
            console.error(err);
        })

        return data[0].result;

    },

    getPlatformInfo: async (slug) => {

        const { data } = await Axios({
            url: `${CORS_ANYWHERE}${API_BASE}/multiquery`,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Client-ID': `${CLIENT_ID}`,
                'Authorization': `Bearer ${AUTHORIZATION}`,
            },
            data: ` 
            query platforms "Platform" {
                fields *, platform_family.name, platform_logo.*, versions.*, versions.platform_version_release_dates.*, platform_logo.*, versions.companies.*, versions.platform_logo.* , websites.*;
                where slug = "${slug}";
            };
            
            query games "Games for ${slug}" {
                fields *, artworks.*, screenshots.*, cover.*;
                sort rating desc;
                where platforms.slug = "${slug}" & rating >= 85;
                limit 15;
            };`

        }).then(res => {
            return res;

        }).catch(err => {
            console.error(err)
            if (err.response.status === 403) {
                Swal.fire({
                    title: 'Ops!',
                    text: 'A API usada tem um limite de teste que é renovada diariamente. Para usar o site entre no link descrito abaixo.',
                    icon: 'info',
                    footer: 'Esse link: https://cors-anywhere.herokuapp.com/corsdemo',
                    confirmButtonText: 'Já Ativei a API',
                    showConfirmButton: 'true',
                    confirmButtonColor: '#5c16c5',
                    backdrop: 'true',
                    width: '90vh',
                    allowOutsideClick: 'false'

                })
            }
        })

        return data;
    },

    getGenreInfo: async (slug) => {

        try {

            const { data } = await Axios({
                url: `${CORS_ANYWHERE}${API_BASE}/multiquery`,
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Client-ID': `${CLIENT_ID}`,
                    'Authorization': `Bearer ${AUTHORIZATION}`,
                },
                data: `
                    query games "Games Genre ${slug}" {
                        fields *, genres.*,screenshots.*,videos.*,summary,artworks.*,platforms.*,themes.*,similar_games.*,similar_games.cover.*,player_perspectives.*,multiplayer_modes.*,multiplayer_modes.platform.*,game_modes.*,franchises.*,involved_companies.company.*,involved_companies.company.logo.*,release_dates.*,cover.*;
                        where genres.slug = "${slug}";
                        limit 20;
                    };

                `
            })

            return data[0].result

        } catch (err) {
            console.log(err)
        }

    },

    //list of games from selected genres to show on home
    getGamesFromTheseGenres: async () => {

        try {

            const { data } = await Axios({
                url: `${CORS_ANYWHERE}${API_BASE}/multiquery`,
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Client-ID': `${CLIENT_ID}`,
                    'Authorization': `Bearer ${AUTHORIZATION}`,
                },
                data: `
                    query games "Adventure" {
                        fields *, genres.*,screenshots.*,videos.*,summary,artworks.*,platforms.*,themes.*,similar_games.*,similar_games.cover.*,player_perspectives.*,multiplayer_modes.*,multiplayer_modes.platform.*,game_modes.*,franchises.*,involved_companies.company.*,involved_companies.company.logo.*,release_dates.*,cover.*;
                        sort rating desc;
                        where genres.slug = "adventure" & rating != null;
                        limit 20;
                    };
                    query games "Sport" {
                        fields *, genres.*,screenshots.*,videos.*,summary,artworks.*,platforms.*,themes.*,similar_games.*,similar_games.cover.*,player_perspectives.*,multiplayer_modes.*,multiplayer_modes.platform.*,game_modes.*,franchises.*,involved_companies.company.*,involved_companies.company.logo.*,release_dates.*,cover.*;
                        sort rating desc;
                        where genres.slug = "sport" & rating != null;
                        limit 20;
                    };
                    query games "Shooter" {
                        fields *, genres.*,screenshots.*,videos.*,summary,artworks.*,platforms.*,themes.*,similar_games.*,similar_games.cover.*,player_perspectives.*,multiplayer_modes.*,multiplayer_modes.platform.*,game_modes.*,franchises.*,involved_companies.company.*,involved_companies.company.logo.*,release_dates.*,cover.*;
                        sort rating desc;
                        where genres.slug = "shooter" & rating != null;
                        limit 20;
                    };
                `
            })

            return data

        } catch (err) {
            console.log(err)
        }

    },

    getReleasingGames: async () => {

        const date = new Date()
        const mm = date.getMonth()
        const yyyy = date.getFullYear()

        const { data } = await Axios({
            url: `${CORS_ANYWHERE}${API_BASE}/multiquery`,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Client-ID': `${CLIENT_ID}`,
                'Authorization': `Bearer ${AUTHORIZATION}`,
            },
            data: `
                query games "Releasing"{
                    fields *,genres.*,screenshots.*,videos.*,summary,artworks.*,platforms.*,themes.*,similar_games.*, hypes, similar_games.cover.*,player_perspectives.*,multiplayer_modes.*,multiplayer_modes.platform.*,game_modes.*,franchises.*,involved_companies.company.*,involved_companies.company.logo.*,release_dates.*,cover.*;
                    where status != 0 & release_dates.y > ${yyyy} & release_dates.m > ${mm};
                    limit 15;
                };
                query games "Released"{
                    fields *,genres.*,screenshots.*,videos.*,summary,artworks.*,platforms.*,themes.*,similar_games.*, hypes, similar_games.cover.*,player_perspectives.*,multiplayer_modes.*,multiplayer_modes.platform.*,game_modes.*,franchises.*,involved_companies.company.*,involved_companies.company.logo.*,release_dates.*,cover.*;
                    where release_dates.y = 2022;
                    limit 15;
                };
            `
        })

        return data;

    },

    getMostPopularGames: async () => {

        const { data } = await Axios({
            url: `${CORS_ANYWHERE}${API_BASE}/multiquery`,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Client-ID': `${CLIENT_ID}`,
                'Authorization': `Bearer ${AUTHORIZATION}`,
            },
            data: `
                query games "Games Releasing and Released"{
                    fields *,genres.*,screenshots.*,videos.*,summary,artworks.*,platforms.*,themes.*,similar_games.*, hypes,similar_games.cover.*,player_perspectives.*,multiplayer_modes.*,multiplayer_modes.platform.*,game_modes.*,franchises.*,involved_companies.company.*,involved_companies.company.logo.*,release_dates.*,cover.*;
                    where total_rating >= 80;
                    sort total_rating_count desc;
                    limit 15;
                };
            `
        })

        return data[0].result;

    },

    // NOTIFICATION SYSTEM, get info of all Fav Games to comapare ratings with local storage
    compareRatings: async (gameId) => {

        const { data } = await Axios({
            url: `${CORS_ANYWHERE}${API_BASE}/multiquery`,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Client-ID': `${CLIENT_ID}`,
                'Authorization': `Bearer ${AUTHORIZATION}`,
            },
            data: `query games "Compare Ratings"{
                    fields *, cover.*;
                    where id = (${gameId.map(item => { return item })});
                }; `

        })

        return data[0].result;

    },

    //search for console
    searchPlatform: async (search) => {

        try {

            const { data } = await Axios({
                url: `${CORS_ANYWHERE}${API_BASE}/platforms/`,
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Client-ID': `${CLIENT_ID}`,
                    'Authorization': `Bearer ${AUTHORIZATION}`,
                },
                data: `
                    fields *, platform_logo.*, versions.*, platform_family.* ;
                    search "${search}";
                    `
            })

            return { data };

        }
        catch (error) {

        }
    }

}
