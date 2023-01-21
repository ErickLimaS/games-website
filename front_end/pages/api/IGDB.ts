import  Axios from 'axios'

// const API_BASE = 'http://localhost:9000/api'
const API_BASE = 'https://my-next-game.onrender.com/api'

function reqConfig(body?: object){

    // provided by the API, expires after some time
    const TOKEN: any = typeof window !== "undefined" && localStorage.getItem('access_token') ? localStorage.getItem('access_token') : null
    
    let expiration: any = typeof window !== "undefined" && localStorage.getItem('expires_in') ? localStorage.getItem('expires_in') : null

    let headers;

    if(TOKEN){
        
        headers ={
            'Authorization': `Bearer ${TOKEN}`
        }

    }

    switch(TOKEN){

        case null:
  
            return {

                method: 'POST',
                url: `${API_BASE}/data`,
                data: body || null
        
            }

        default:
  
            return {

                method: 'POST',
                url: `${API_BASE}/data`,
                headers,
                data: body|| null
        
            }

    }
 
}

// if client browser doesnt have a valid token, it stores a new working token
function setToken(data: {result: object[], success: boolean, token?: {access_token : string, expires_in: string} | null}){

    if(data.token){
        
        localStorage.setItem('access_token', data.token.access_token)
        localStorage.setItem('expires_in', data.token.expires_in)

    }
    return

}

// standardizes all data fetched from API
const queryAllFields = 'fields *, involved_companies.*, involved_companies.company.*, artworks.*, age_ratings.*, cover.*, game_modes.*, genres.*, keywords.*, screenshots.*, platforms.*, themes.*;'

export async function homePageGames() {

    try{
        const {data} = await Axios(reqConfig(

            {query: 
                `${queryAllFields}
                where artworks != null & rating > 80 & release_dates.m = ${new Date().getMonth() + 1} & release_dates.y = ${new Date().getFullYear() };
                sort release_dates.date desc;
                limit 20;`
            }
            ))

        // search "Counter Strike";
        setToken(data)

        return data.result

    }catch(err){

        localStorage.removeItem('access_token')
        localStorage.removeItem('expires_in')

    }

}

export async function searchGame(gameName: string) {

    try{
        const {data} = await Axios(reqConfig(
            {query: 
                `${queryAllFields} search "${gameName}"; limit 5;`
            }
            ))

        return data.result
        
    }catch(err){

        localStorage.removeItem('access_token')
        localStorage.removeItem('expires_in')

    }

}

export async function fetchGameInfo(gameUrlSlug: string) {

    try{
        const {data} = await Axios(reqConfig({query: `${queryAllFields} where slug = "${gameUrlSlug}";`}))

        return data.result
        
    }catch(err){

        localStorage.removeItem('access_token')
        localStorage.removeItem('expires_in')

    }

}

export async function fetchGamesForGenre(genreSlug: string) {

    try{
        const {data} = await Axios(reqConfig(
            {
                query: `${queryAllFields} where artworks != null & themes.name ~ "${genreSlug}";`
            }
            ))

        return data.result
        
    }catch(err){

        localStorage.removeItem('access_token')
        localStorage.removeItem('expires_in')

    }
        

}

export async function fetchUpcomingGamesRelease() {

        try{
        const date = new Date()
        const yyyy = date.getFullYear()
        const mm = date.getMonth()

        const {data} = await Axios(reqConfig({query: `fields *; where hypes != null & status != 0 & release_dates.y = ${yyyy} & release_dates.m = ${mm};`}))

        return data.result

    }catch(err){

        localStorage.removeItem('access_token')
        localStorage.removeItem('expires_in')

    }
}


//     getMonthRelease: async () => {

//         const { data } = await Axios({
//             url: `${CORS_ANYWHERE}${API_BASE}/multiquery`,
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 'Client-ID': `${CLIENT_ID}`,
//                 'Authorization': `Bearer ${AUTHORIZATION}`,
//             },
//             data: `
//                 query release_dates "Latest Releases" {
//                     fields game.*, game.cover.*, game.artworks.*, game.screenshots.*, game.release_dates.*, game.platforms.*, game.player_perspectives.*, game.involved_companies.*, game.game_modes.*, game.themes.*;
//                     sort game.rating desc;
//                     where m = ${new Date().getMonth() + 1} & y = ${new Date().getFullYear()};
//                     limit 15;
//                 };
                
//             `
//         }).catch(err => {
//             if (err.response.status === 403) {
//                 Swal.fire({
//                     title: 'Ops!',
//                     text: 'A API usada tem um limite de teste que é renovada diariamente. Para usar o site entre no link descrito abaixo.',
//                     icon: 'info',
//                     footer: 'Esse link: https://cors-anywhere.herokuapp.com/corsdemo',
//                     confirmButtonText: 'Já Ativei a API',
//                     showConfirmButton: 'true',
//                     confirmButtonColor: '#5c16c5',
//                     backdrop: 'true',
//                     width: '90vh',
//                     allowOutsideClick: 'false',
//                     didClose: () => {
//                         window.location.reload()
//                     }
//                 })
//             }
//             else if (err.response.status === 404) {
//                 alert(`Error 404: Não Encontrado.`)
//             }
//             else if (err.response.status === 429) {
//                 alert(`Problemas com a API. Muitas Requisições ao mesmo tempo. Tente atualizar a página.`)
//             }
//             console.error(err);
//         })

//         return data[0].result;

//     },

//     getLastMonthHighestRatings: async () => {

//         const { data } = await Axios({
//             url: `${CORS_ANYWHERE}${API_BASE}/multiquery`,
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 'Client-ID': `${CLIENT_ID}`,
//                 'Authorization': `Bearer ${AUTHORIZATION}`,
//             },
//             data: `
//                 query release_dates "Highest Ratings"{
//                     fields game.*, game.screenshots.*, game.artworks.*, game.cover.*, game.rating, game.release_dates.*, game.themes.*;
//                     sort game.rating desc;
//                     where game.rating != null & m = ${new Date().getMonth() - 1} & y = ${new Date().getFullYear()} ;
//                     limit 15;
//                 };
//             `
//         }).catch(err => {
//             console.error(err);
//         })

//         return data[0].result;

//     },

//     getPlatformInfo: async (slug) => {

//         const { data } = await Axios({
//             url: `${CORS_ANYWHERE}${API_BASE}/multiquery`,
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 'Client-ID': `${CLIENT_ID}`,
//                 'Authorization': `Bearer ${AUTHORIZATION}`,
//             },
//             data: ` 
//             query platforms "Platform" {
//                 fields *, platform_family.name, platform_logo.*, versions.*, versions.platform_version_release_dates.*, platform_logo.*, versions.companies.*, versions.platform_logo.* , websites.*;
//                 where slug = "${slug}";
//             };
            
//             query games "Games for ${slug}" {
//                 fields *, artworks.*, screenshots.*, cover.*;
//                 sort rating desc;
//                 where platforms.slug = "${slug}" & rating >= 85;
//                 limit 15;
//             };`

//         }).then(res => {
//             return res;

//         }).catch(err => {
//             console.error(err)
//             if (err.response.status === 403) {
//                 Swal.fire({
//                     title: 'Ops!',
//                     text: 'A API usada tem um limite de teste que é renovada diariamente. Para usar o site entre no link descrito abaixo.',
//                     icon: 'info',
//                     footer: 'Esse link: https://cors-anywhere.herokuapp.com/corsdemo',
//                     confirmButtonText: 'Já Ativei a API',
//                     showConfirmButton: 'true',
//                     confirmButtonColor: '#5c16c5',
//                     backdrop: 'true',
//                     width: '90vh',
//                     allowOutsideClick: 'false'

//                 })
//             }
//         })

//         return data;
//     },

//     getGenreInfo: async (slug) => {

//         try {

//             const { data } = await Axios({
//                 url: `${CORS_ANYWHERE}${API_BASE}/multiquery`,
//                 method: 'POST',
//                 headers: {
//                     'Accept': 'application/json',
//                     'Client-ID': `${CLIENT_ID}`,
//                     'Authorization': `Bearer ${AUTHORIZATION}`,
//                 },
//                 data: `
//                     query games "Games Genre ${slug}" {
//                         fields *, genres.*,screenshots.*,videos.*,summary,artworks.*,platforms.*,themes.*,similar_games.*,similar_games.cover.*,player_perspectives.*,multiplayer_modes.*,multiplayer_modes.platform.*,game_modes.*,franchises.*,involved_companies.company.*,involved_companies.company.logo.*,release_dates.*,cover.*;
//                         where genres.slug = "${slug}";
//                         limit 20;
//                     };

//                 `
//             })

//             return data[0].result

//         } catch (err) {
//             console.log(err)
//         }

//     },

//     //list of games from selected genres to show on home
//     getGamesFromTheseGenres: async () => {

//         try {

//             const { data } = await Axios({
//                 url: `${CORS_ANYWHERE}${API_BASE}/multiquery`,
//                 method: 'POST',
//                 headers: {
//                     'Accept': 'application/json',
//                     'Client-ID': `${CLIENT_ID}`,
//                     'Authorization': `Bearer ${AUTHORIZATION}`,
//                 },
//                 data: `
//                     query games "Adventure" {
//                         fields *, genres.*,screenshots.*,videos.*,summary,artworks.*,platforms.*,themes.*,similar_games.*,similar_games.cover.*,player_perspectives.*,multiplayer_modes.*,multiplayer_modes.platform.*,game_modes.*,franchises.*,involved_companies.company.*,involved_companies.company.logo.*,release_dates.*,cover.*;
//                         sort rating desc;
//                         where genres.slug = "adventure" & rating != null;
//                         limit 20;
//                     };
//                     query games "Sport" {
//                         fields *, genres.*,screenshots.*,videos.*,summary,artworks.*,platforms.*,themes.*,similar_games.*,similar_games.cover.*,player_perspectives.*,multiplayer_modes.*,multiplayer_modes.platform.*,game_modes.*,franchises.*,involved_companies.company.*,involved_companies.company.logo.*,release_dates.*,cover.*;
//                         sort rating desc;
//                         where genres.slug = "sport" & rating != null;
//                         limit 20;
//                     };
//                     query games "Shooter" {
//                         fields *, genres.*,screenshots.*,videos.*,summary,artworks.*,platforms.*,themes.*,similar_games.*,similar_games.cover.*,player_perspectives.*,multiplayer_modes.*,multiplayer_modes.platform.*,game_modes.*,franchises.*,involved_companies.company.*,involved_companies.company.logo.*,release_dates.*,cover.*;
//                         sort rating desc;
//                         where genres.slug = "shooter" & rating != null;
//                         limit 20;
//                     };
//                 `
//             })

//             return data

//         } catch (err) {
//             console.log(err)
//         }

//     },

//     getReleasingGames: async (chosedTime) => {

//         const date = new Date()
//         const mm = date.getMonth() + 1
//         const yyyy = date.getFullYear()

//         const { data } = await Axios({
//             url: `${CORS_ANYWHERE}${API_BASE}/multiquery`,
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 'Client-ID': `${CLIENT_ID}`,
//                 'Authorization': `Bearer ${AUTHORIZATION}`,
//             },
//             data: `
//                 query games "Releasing"{
//                     fields *,genres.*,screenshots.*,videos.*,summary,artworks.*,platforms.*,themes.*,similar_games.*, hypes, similar_games.cover.*,player_perspectives.*,multiplayer_modes.*,multiplayer_modes.platform.*,game_modes.*,franchises.*,involved_companies.company.*,involved_companies.company.logo.*,release_dates.*,cover.*;
//                     sort hypes desc;
//                     where hypes != null & status != 0 & release_dates.y = ${yyyy} ${chosedTime === 'YEAR' ? '' : ` & release_dates.m = ${mm}`};
//                     limit 15;
//                 };
//                 query games "Released"{
//                     fields *,genres.*,screenshots.*,videos.*,summary,artworks.*,platforms.*,themes.*,similar_games.*, hypes, similar_games.cover.*,player_perspectives.*,multiplayer_modes.*,multiplayer_modes.platform.*,game_modes.*,franchises.*,involved_companies.company.*,involved_companies.company.logo.*,release_dates.*,cover.*;
//                     where hypes != null & status != (5,6,7) & release_dates.y = ${yyyy} ${chosedTime === 'YEAR' ? '' : ` & release_dates.m = ${mm}`};
//                     limit 15;
//                 };
//             `
//         })

//         return data;

//     },

//     getMostPopularGames: async () => {

//         const { data } = await Axios({
//             url: `${CORS_ANYWHERE}${API_BASE}/multiquery`,
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 'Client-ID': `${CLIENT_ID}`,
//                 'Authorization': `Bearer ${AUTHORIZATION}`,
//             },
//             data: `
//                 query games "Games Releasing and Released"{
//                     fields *,genres.*,screenshots.*,videos.*,summary,artworks.*,platforms.*,themes.*,similar_games.*, hypes,similar_games.cover.*,player_perspectives.*,multiplayer_modes.*,multiplayer_modes.platform.*,game_modes.*,franchises.*,involved_companies.company.*,involved_companies.company.logo.*,release_dates.*,cover.*;
//                     where total_rating >= 80;
//                     sort total_rating_count desc;
//                     limit 15;
//                 };
//             `
//         })

//         return data[0].result;

//     },

//     // NOTIFICATION SYSTEM, get info of all Fav Games to comapare ratings with local storage
//     compareRatings: async (gameId) => {

//         const { data } = await Axios({
//             url: `${CORS_ANYWHERE}${API_BASE}/multiquery`,
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 'Client-ID': `${CLIENT_ID}`,
//                 'Authorization': `Bearer ${AUTHORIZATION}`,
//             },
//             data: `query games "Compare Ratings"{
//                     fields *, cover.*;
//                     where id = (${gameId.map(item => { return item })});
//                 }; `

//         })

//         return data[0].result;

//     },

//     //search for console
//     searchPlatform: async (search) => {

//         try {

//             const { data } = await Axios({
//                 url: `${CORS_ANYWHERE}${API_BASE}/platforms/`,
//                 method: 'POST',
//                 headers: {
//                     'Accept': 'application/json',
//                     'Client-ID': `${CLIENT_ID}`,
//                     'Authorization': `Bearer ${AUTHORIZATION}`,
//                 },
//                 data: `
//                     fields *, platform_logo.*, versions.*, platform_family.* ;
//                     search "${search}";
//                     `
//             })

//             return { data };

//         }
//         catch (error) {

//         }
//     }

// }
