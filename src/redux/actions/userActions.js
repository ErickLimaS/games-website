import Axios from 'axios'
import {
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_FAIL_NEW_FAV_GAME,
    USER_SUCCESS_NEW_FAV_GAME,
    USER_REQUEST_NEW_FAV_GAME,
    USER_REQUEST_REMOVE_FAV_GAME,
    USER_SUCCESS_REMOVE_FAV_GAME,
    USER_FAIL_REMOVE_FAV_GAME,
} from '../constants/userConstants';

const CORS_ANYWHERE = 'https://cors-anywhere.herokuapp.com/'
const API_BASE = 'https://games-website-1.herokuapp.com/users'

export const register = (name, email, password) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: { email, password } })
    try {
        const { data } = await Axios.post(`${CORS_ANYWHERE}${API_BASE}/register`, { name, email, password })
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data })
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
        localStorage.setItem('userInfo', JSON.stringify(data))
    }
    catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        })
    }
}

export const login = (email, password) => async (dispatch) => {

    dispatch({ type: USER_LOGIN_REQUEST, payload: { email, password } })
    try {
        const { data } = await Axios.post(`${CORS_ANYWHERE}${API_BASE}/login`, { email, password });
        console.log(JSON.stringify(data))
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
        localStorage.setItem('userInfo', JSON.stringify(data))
    }
    catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}

export const logout = () => (dispatch) => {
    dispatch({ type: USER_LOGOUT, payload: null })
}

export const favoriteGame = (gameInfo, userInfo) => async (dispatch) => {

    dispatch({ type: USER_REQUEST_NEW_FAV_GAME, action: { gameInfo, userInfo } })

    try {
        const { data } = await Axios({
            url: `${CORS_ANYWHERE}${API_BASE}/add-favorite-game`,
            method: 'PUT',
            data: {
                userId: `${userInfo.userInfo.id}`,
                gameId: `${gameInfo.id}`,
                gameName: `${gameInfo.name}`,
                gameSlug: `${gameInfo.slug}`,
                gameCover: `https://images.igdb.com/igdb/image/upload/t_cover_big/${gameInfo.cover.image_id}.png`,
                gameRating: `${gameInfo.rating}`,
                gameVotes: `${gameInfo.rating_count}`
            }
        })

        // localStorage.removeItem('userInfo')

        userInfo.userInfo.favoriteGames = data

        localStorage.setItem('userInfo', JSON.stringify(userInfo.userInfo))

        dispatch({ type: USER_SUCCESS_NEW_FAV_GAME, payload: userInfo.userInfo })

        window.location.reload()
    }
    catch (error) {
        dispatch({
            type: USER_FAIL_NEW_FAV_GAME,
            action: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const removeFavoriteGame = (gameInfo, userInfo) => async (dispatch) => {

    dispatch({ type: USER_REQUEST_REMOVE_FAV_GAME, action: { gameInfo, userInfo } })

    try {
        const { data } = await Axios({
            url: `${CORS_ANYWHERE}${API_BASE}/remove-favorite-game`,
            method: 'PUT',
            data: {
                userId: `${userInfo.userInfo.id}`,
                gameId: `${gameInfo.id}`
            }
        })

        // localStorage.removeItem('userInfo')

        userInfo.userInfo.favoriteGames = data

        localStorage.setItem('userInfo', JSON.stringify(userInfo.userInfo))

        dispatch({ type: USER_SUCCESS_REMOVE_FAV_GAME, payload: userInfo.userInfo })
        
        window.location.reload()
    }
    catch (error) {
        dispatch({
            type: USER_FAIL_REMOVE_FAV_GAME,
            action: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}