import Axios from 'axios'
import Swal from 'sweetalert2';
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
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_SUCCESS,
    NOTIFICATIONS_REQUEST,
    NOTIFICATIONS_SUCCESS,
    NOTIFICATIONS_FAIL,
} from '../constants/userConstants';

const CORS_ANYWHERE = 'https://cors-anywhere.herokuapp.com/'
const SERVER_BASE_URl = 'https://games-website-1.herokuapp.com'

export const register = (name, email, password) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: { email, password } })
    try {
        const { data } = await Axios.post(`${CORS_ANYWHERE}${SERVER_BASE_URl}/users/register`, { name, email, password })
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
        const { data } = await Axios.post(`${CORS_ANYWHERE}${SERVER_BASE_URl}/users/login`, { email, password });
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
            url: `${CORS_ANYWHERE}${SERVER_BASE_URl}/users/add-favorite-game`,
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
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const removeFavoriteGame = (gameInfo, userInfo) => async (dispatch) => {

    dispatch({ type: USER_REQUEST_REMOVE_FAV_GAME, action: { gameInfo, userInfo } })

    try {
        const { data } = await Axios({
            url: `${CORS_ANYWHERE}${SERVER_BASE_URl}/users/remove-favorite-game`,
            method: 'PUT',
            data: {
                userId: `${userInfo.userInfo.id}`,
                gameId: `${gameInfo.id}`
            }
        })

        userInfo.userInfo.favoriteGames = data

        localStorage.setItem('userInfo', JSON.stringify(userInfo.userInfo))

        dispatch({ type: USER_SUCCESS_REMOVE_FAV_GAME, payload: userInfo.userInfo })

        window.location.reload()
    }
    catch (error) {
        dispatch({
            type: USER_FAIL_REMOVE_FAV_GAME,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const getNewProfileChanges = (id, newPassword, newName) => async (dispatch) => {

    dispatch({ type: USER_UPDATE_PROFILE_REQUEST, action: { newPassword, newName } })

    try {
        const { data } = await Axios({
            url: `${CORS_ANYWHERE}${SERVER_BASE_URl}/users/update-profile`,
            method: 'PUT',
            data: {
                userId: `${id}`,
                newPassword: `${newPassword}`,
                newName: `${newName}`
            }
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

        dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, action: data })

        Swal.fire({
            title: `Profile Upated!`,
            text: 'Profile Updated with Success! Next time, login with your new password.',
            icon: 'success',
            confirmButtonText: 'Great!',
            showConfirmButton: 'true',
            confirmButtonColor: 'green',
            backdrop: 'true',
            width: '90%',
            allowOutsideClick: 'false',
            didClose: () => {
                window.location.replace('/')
            }

        })

    }
    catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message,
        })
    }

}

export const getNotifications = (id) => async (dispatch) => {

    dispatch({ type: NOTIFICATIONS_REQUEST, action: id })

    try {

        const response  = await Axios({
            url: `${CORS_ANYWHERE}${SERVER_BASE_URl}/users/notifications`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                userId: id
            }
        })

        dispatch({ type: NOTIFICATIONS_SUCCESS, action: response.data })

        localStorage.setItem('userInfo', JSON.stringify(response.data))

    }
    catch (error) {
        dispatch({
            type: NOTIFICATIONS_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message,
        })
    }


}