import Axios, { AxiosError } from 'axios'

const API_BASE = 'https://api.igdb.com/v4'
const CORS_ANYWHERE = 'https://cors-anywhere.herokuapp.com/'
const AUTHORIZATION = 'mab75j9dznfoin00g89z34x7offpqo'
const CLIENT_ID = 'iabefriibnfuksd1j23hqr2qm1cdez'

// eslint-disable-next-line import/no-anonymous-default-export
export default {

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
                // aggregated_rating: '',
                // aggregated_rating_count: '',
                // alternative_names: {},
                // bundles: '',
                // category: '',
                // checksum: '',
                // collection: '',
                // created_at: '',
                // external_games: {},
                // first_release_date: '',
                // franchises: '',
                // game_engines: '',
                // game_modes: {},
                // genres: {},
                // hypes: '',
                // involved_companies: {},
                // keywords: {},
                // multiplayer_modes: {},
                // platforms: {},
                // player_perspectives: {},
                // release_dates: {},
                // remasters: {},
                // similar_games: {},
                // summary: '',
                // tags: {},
                // themes: {},
                // updated_at: '',
                // url: '',
                // websites: {},


            }
        ]

        await Axios({
            // url: `${CORS_ANYWHERE}${API_BASE}/games/732?fields=*`, *FOR TESTS*
            url: `${CORS_ANYWHERE}${API_BASE}/games/${gameId}?fields=*`,
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Client-ID': `${CLIENT_ID}`,
                'Authorization': `Bearer ${AUTHORIZATION}`,
            },
            data: ""

        }).then(async (response) => { //all data here

            //get name
            gameInfo[0].name = response.data[0].name;

            //get id
            gameInfo[0].id = response.data[0].id;

            //get storyline
            gameInfo[0].storyline = response.data[0].storyline;

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

            //get Cover img
            Axios({
                url: `${CORS_ANYWHERE}${API_BASE}/covers/${response.data[0].cover}?fields=*`,
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Client-ID': `${CLIENT_ID}`,
                    'Authorization': `Bearer ${AUTHORIZATION}`,
                }
            }).then(response => {

                gameInfo[0].cover.cover_big_url = (`https://images.igdb.com/igdb/image/upload/t_cover_big/${response.data[0].image_id}.png`)
                gameInfo[0].cover.cover_small_url = (response.data[0].url)

            })

            //get Age Rating
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

            //get ScreenShots
            gameInfo[0].screenshots = await response.data[0].screenshots.map(item => {

                let results = [];

                Axios({
                    url: `${CORS_ANYWHERE}${API_BASE}/screenshots/${item}?fields=*`,
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Client-ID': `${CLIENT_ID}`,
                        'Authorization': `Bearer ${AUTHORIZATION}`,
                    }
                }).then(response => {

                    console.log(response.data[0])

                    results.image_id = response.data[0].image_id
                    results.id = response.data[0].id
                    results.height = response.data[0].height
                    results.width = response.data[0].width
                    results.url_small = response.data[0].url
                    results.url_large = `https://images.igdb.com/igdb/image/upload/t_original/${response.data[0].image_id}.jpg`

                })

                return results

            })


            //get Artwork
            setTimeout(async () => {
                gameInfo[0].artworks = await response.data[0].artworks.map(item => {

                    let results = [];

                    Axios({
                        url: `${CORS_ANYWHERE}${API_BASE}/artworks/${item}?fields=*`,
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Client-ID': `${CLIENT_ID}`,
                            'Authorization': `Bearer ${AUTHORIZATION}`,
                        }
                    }).then(response => {

                        results.image_id = response.data[0].image_id
                        results.id = response.data[0].id
                        results.height = response.data[0].height
                        results.width = response.data[0].width
                        results.animated = response.data[0].animated
                        results.small = response.data[0].url
                        results.large = `https://images.igdb.com/igdb/image/upload/t_original/${response.data[0].image_id}.jpg`

                    })

                    return results

                }, 10000)
            })

            //get Videos

            setTimeout(async () => {
                gameInfo[0].videos = await response.data[0].videos.map(item => {

                    let results = [];

                    Axios({
                        url: `${CORS_ANYWHERE}${API_BASE}/game_videos/${item}?fields=*`,
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Client-ID': `${CLIENT_ID}`,
                            'Authorization': `Bearer ${AUTHORIZATION}`,
                        }
                    }).then(response => {


                        console.log(response.data[0])
                        results.name = response.data[0].name
                        results.id = response.data[0].id
                        results.game = response.data[0].game
                        results.video_id = response.data[0].video_id
                        results.url_video = `https://youtu.be/${response.data[0].video_id}`


                    })

                    return results
                })
            }, 16000)

            console.log(response.data);
            console.log(gameInfo[0]);


        }).catch(err => {
            if (err.response.status === 403) {
                alert(`Erro da URL da API! Entre nesse link para ativar o funcinamento integral do site: ${CORS_ANYWHERE}`)
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

        let data = [];

        await Axios({
            url: `${CORS_ANYWHERE}${API_BASE}/games/?search=${searchedItem}&fields=*`,
            // url: `${CORS_ANYWHERE}${API_BASE}/games/?search=zelda&fields=*`, TEST
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Client-ID': `${CLIENT_ID}`,
                'Authorization': `Bearer ${AUTHORIZATION}`,
            },
            data: ""

        }
        ).then(async (response) => {

            console.log(response)

            data = await response.data.map(item => {

                let results = [];

                results.name = item.name
                results.id = item.id

                Axios({
                    url: `${CORS_ANYWHERE}${API_BASE}/covers/${item.cover}?fields=*`,
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Client-ID': `${CLIENT_ID}`,
                        'Authorization': `Bearer ${AUTHORIZATION}`,
                    }
                }).then(response2 => {

                    results.cover_big_url = (`https://images.igdb.com/igdb/image/upload/t_cover_big/${response2.data[0].image_id}.png`)
                    results.cover_small_url = (response2.data[0].url)

                })

                return results

            })

        }).catch(err => {
            if (err.response.status === 403) {
                alert(`Erro da URL da API! Entre nesse link para ativar o funcinamento integral do site: ${CORS_ANYWHERE}`)
            }
            else if (err.response.status === 404) {
                alert(`Error 404: Não Encontrado.`)
            }
            else if (err.response.status === 429) {
                alert(`Problemas com a API. Muitas Requisições ao mesmo tempo. Tente atualizar a página.`)
            }
            console.error(err)
        })

        console.log(data)
        return data;

    }
}
