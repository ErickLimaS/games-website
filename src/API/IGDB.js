import Axios, { AxiosError } from 'axios'
import axiosRetry from 'axios-retry'


const API_BASE = 'https://api.igdb.com/v4'
const CORS_ANYWHERE = 'https://cors-anywhere.herokuapp.com/'
const AUTHORIZATION = 'mab75j9dznfoin00g89z34x7offpqo'
const CLIENT_ID = 'iabefriibnfuksd1j23hqr2qm1cdez'

// eslint-disable-next-line import/no-anonymous-default-export
export default {


    getGameInfo: async (gameId) => {
        axiosRetry(Axios, { retries: 100 });

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
            // url: `${CORS_ANYWHERE}${API_BASE}/games/732?fields=*`, 
            url: `${CORS_ANYWHERE}${API_BASE}/games/${gameId}?fields=*,genres.*,screenshots.*,videos.*,summary,artworks.*,platforms.*,themes.*,similar_games.*,similar_games.cover.*,player_perspectives.*,multiplayer_modes.*,multiplayer_modes.platform.*,game_modes.*,franchises.*,involved_companies.company.*,involved_companies.company.logo.*,release_dates.*,cover.*`,
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Client-ID': `${CLIENT_ID}`,
                'Authorization': `Bearer ${AUTHORIZATION}`,
            },
            data: ""

        }).then(async (response) => { //all data here

            console.log(response)

            //get name
            gameInfo[0].name = response.data[0].name;

            //get id
            gameInfo[0].id = response.data[0].id;

            //get summary
            gameInfo[0].summary = response.data[0].summary;

            //get storyline
            gameInfo[0].storyline = response.data[0].storyline;

            //get genres
            gameInfo[0].genres = response.data[0].genres;

            //get rating
            gameInfo[0].rating = response.data[0].rating;

            //get rating count
            gameInfo[0].rating_count = response.data[0].rating_count;

            //get total rating
            gameInfo[0].total_rating = response.data[0].total_rating;

            //get total rating count
            gameInfo[0].total_rating_count = response.data[0].total_rating_count;

            //get follows
            gameInfo[0].follows = response.data[0].follows;

            //get slug
            gameInfo[0].slug = response.data[0].slug;

            //get ScreenShots
            gameInfo[0].screenshots = response.data[0].screenshots

            //get Videos
            gameInfo[0].videos = response.data[0].videos

            //get Platforms
            gameInfo[0].platforms = response.data[0].platforms

            //get Game Modes
            gameInfo[0].game_modes = response.data[0].game_modes

            //get Franchises
            gameInfo[0].franchises = response.data[0].franchises

            //get Player Perspective
            gameInfo[0].player_perspectives = response.data[0].player_perspectives

            //get Similar Games
            gameInfo[0].similar_games = response.data[0].similar_games

            //get Cover
            gameInfo[0].cover = response.data[0].cover

            //get Themes
            gameInfo[0].themes = response.data[0].themes

            //get Similar games
            gameInfo[0].similar_games = response.data[0].similar_games

            //get Platforms
            gameInfo[0].platforms = response.data[0].platforms

            //get Multi Modes
            gameInfo[0].multiplayer_modes = response.data[0].multiplayer_modes

            //get Age Rating
            if (response.data[0].age_ratings) {
                gameInfo[0].age_ratings = await response.data[0].age_ratings.map(item => {

                    let results = [];
                    let filter = []

                    Axios({
                        url: `${CORS_ANYWHERE}${API_BASE}/age_ratings/${item}?fields=*`,
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Client-ID': `${CLIENT_ID}`,
                            'Authorization': `Bearer ${AUTHORIZATION}`,
                        }
                    }).then(response => {

                        results.push(response.data[0])

                        filter.id = (results[0].id)
                        filter.rating = (results[0].rating)
                        filter.synopsis = (results[0].synopsis)

                        switch (results[0].category) {
                            case 1:
                                switch (results[0].rating) {
                                    case 6:
                                        return (filter.rating = 'RP') && (filter.category = 'ESRB')
                                    case 7:
                                        return (filter.rating = 'EC') && (filter.category = 'ESRB')
                                    case 8:
                                        return (filter.rating = 'E') && (filter.category = 'ESRB')
                                    case 9:
                                        return (filter.rating = 'E10') && (filter.category = 'ESRB')
                                    case 10:
                                        return (filter.rating = 'T') && (filter.category = 'ESRB')
                                    case 11:
                                        return (filter.rating = 'M') && (filter.category = 'ESRB')
                                    case 12:
                                        return (filter.rating = 'AO') && (filter.category = 'ESRB')
                                    default:
                                        return ''
                                }
                            case 2:
                                switch (results[0].rating) {
                                    case 1:
                                        return (filter.rating = 'Three') && (filter.category = 'PEGI')
                                    case 2:
                                        return (filter.rating = 'Seven') && (filter.category = 'PEGI')
                                    case 3:
                                        return (filter.rating = 'Twelve') && (filter.category = 'PEGI')
                                    case 4:
                                        return (filter.rating = 'Sixteen') && (filter.category = 'PEGI')
                                    case 5:
                                        return (filter.rating = 'Eighteen') && (filter.category = 'PEGI')
                                    default:
                                        return ''
                                }
                            case 3:
                                switch (results[0].rating) {
                                    case 13:
                                        return (filter.rating = 'CERO_A') && (filter.category = 'CERO')
                                    case 14:
                                        return (filter.rating = 'CERO_B') && (filter.category = 'CERO')
                                    case 15:
                                        return (filter.rating = 'CERO_C') && (filter.category = 'CERO')
                                    case 16:
                                        return (filter.rating = 'CERO_D') && (filter.category = 'CERO')
                                    case 17:
                                        return (filter.rating = 'CERO_Z') && (filter.category = 'CERO')
                                    default:
                                        return ''
                                }
                            case 4:
                                switch (results[0].rating) {
                                    case 18:
                                        return (filter.rating = 'USK_0') && (filter.category = 'USK')
                                    case 19:
                                        return (filter.rating = 'USK_6') && (filter.category = 'USK')
                                    case 20:
                                        return (filter.rating = 'USK_12') && (filter.category = 'USK')
                                    case 21:
                                        return (filter.rating = 'USK_18') && (filter.category = 'USK')
                                    default:
                                        return ''
                                }
                            case 5:
                                switch (results[0].rating) {
                                    case 22:
                                        return (filter.rating = 'GRAC_ALL') && (filter.category = 'GRAC')
                                    case 23:
                                        return (filter.rating = 'GRAC_Twelve') && (filter.category = 'GRAC')
                                    case 24:
                                        return (filter.rating = 'GRAC_Fifteen') && (filter.category = 'GRAC')
                                    case 25:
                                        return (filter.rating = 'GRAC_Eighteen') && (filter.category = 'GRAC')
                                    case 26:
                                        return (filter.rating = 'GRAC_TESTING') && (filter.category = 'GRAC')
                                    default:
                                        return ''
                                }
                            case 6:
                                switch (results[0].rating) {
                                    case 27:
                                        return (filter.rating = 'CLASS_IND_L') && (filter.category = 'CLASS_IND')
                                    case 28:
                                        return (filter.rating = 'CLASS_IND_Ten') && (filter.category = 'CLASS_IND')
                                    case 29:
                                        return (filter.rating = 'CLASS_IND_Twelve') && (filter.category = 'CLASS_IND')
                                    case 30:
                                        return (filter.rating = 'CLASS_IND_Fourteen') && (filter.category = 'CLASS_IND')
                                    case 31:
                                        return (filter.rating = 'CLASS_IND_Sixteen') && (filter.category = 'CLASS_IND')
                                    case 32:
                                        return (filter.rating = 'CLASS_IND_Eighteen') && (filter.category = 'CLASS_IND')
                                    default:
                                        return ''
                                }
                            case 7:
                                switch (results[0].rating) {
                                    case 33:
                                        return (filter.rating = 'ACB_G') && (filter.category = 'ACB')
                                    case 34:
                                        return (filter.rating = 'ACB_PG') && (filter.category = 'ACB')
                                    case 35:
                                        return (filter.rating = 'ACB_M') && (filter.category = 'ACB')
                                    case 36:
                                        return (filter.rating = 'ACB_MA15') && (filter.category = 'ACB')
                                    case 37:
                                        return (filter.rating = 'ACB_R18') && (filter.category = 'ACB')
                                    case 38:
                                        return (filter.rating = 'ACB_RC') && (filter.category = 'ACB')
                                    default:
                                        return ''
                                }
                            default:
                                return ''
                        }
                    })

                    return filter
                })
            }
            //get Artwork
            gameInfo[0].artworks = response.data[0].artworks

            //get Involved Companies - need to add Country
            gameInfo[0].involved_companies = response.data[0].involved_companies

            //get First release date
            const unix_gameReleaseDate = response.data[0].first_release_date
            const date = new Date(unix_gameReleaseDate * 1000)
            gameInfo[0].first_release_date = date
            gameInfo[0].first_release_date.yyyy = date.getFullYear()
            gameInfo[0].first_release_date.mm = date.getMonth()
            gameInfo[0].first_release_date.dd = date.getDate()


            // console.log(response.data);
            // console.log(gameInfo[0]);


        }).catch(err => {
            console.error(err);
            if (err.response.status === 403) {
                alert(`Erro da URL da API! Entre nesse link para ativar o funcionamento integral do site: ${CORS_ANYWHERE}`)
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
            url: `${CORS_ANYWHERE}${API_BASE}/games/?search=${searchedItem}&fields=*,cover.*`,
            // url: `${CORS_ANYWHERE}${API_BASE}/games/?search=zelda&fields=*`, TEST
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
                alert(`Erro da URL da API! Entre nesse link para ativar o funcionamento integral do site: ${CORS_ANYWHERE}`)
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
                    where m = ${new Date().getMonth()} & y = ${new Date().getFullYear()};
                };
                
            `
        }).catch(error => {
            console.error(error)
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
                    fields game.*, game.screenshots.*, game.artworks.*, game.cover.*;
                    sort game.rating asc;
                    where game.rating >= 85 & m = ${new Date().getMonth() - 1} & y = ${new Date().getFullYear()} ;
                    limit 10;
                };
            `
        }).catch(error => {
            console.error(error)
        })


        console.log(data[0].result)

        return data[0].result;

    }

}
