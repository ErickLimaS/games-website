import Axios from 'axios'
import {
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
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
