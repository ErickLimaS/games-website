/* eslint-disable import/no-anonymous-default-export */
import Axios from 'axios'

const CORS_ANYWHERE = 'https://cors-anywhere.herokuapp.com/'
const API_BASE = 'https://games-website-1.herokuapp.com/users'

const userLogin = ((state) => state.userLogin)
const { userInfo } = userLogin

export default {

    favoriteGame: async (gameInfo, userInfo) => {

        if (userInfo) {
            const { data } = Axios({
                url: `${CORS_ANYWHERE}${API_BASE}/add-favorite-game`,
                method: 'PUT',
                data: {
                    userId: `${userInfo.id}`,
                    gameId: `${gameInfo.id}`,
                    gameName: `${gameInfo.name}`,
                    gameSlug: `${gameInfo.slug}`,
                    gameCover: `https://images.igdb.com/igdb/image/upload/t_cover_big/${gameInfo.cover.image_id}.png`,
                    gameRating: `${gameInfo.rating}`,
                    gameVotes: `${gameInfo.rating_count}`
                }


            }).catch(err => {
                console.error(err);

            })

            let newUserInfo = userInfo
            newUserInfo.favoriteGames = data

            localStorage.setItem('userInfo', JSON.stringify(newUserInfo))
        }
        else {
            console.log('user null')
        }
    }

}

