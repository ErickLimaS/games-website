import {
    USER_ADD_TO_BOOKMARKS_ERROR,
    USER_ADD_TO_BOOKMARKS_REQUEST,
    USER_ADD_TO_BOOKMARKS_SUCCESS,
    USER_LOGIN_ERROR, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS,
    USER_SIGNUP_ERROR, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS
} from "@/redux/constants/userConstants"
import Axios from "axios"
import { Dispatch } from "react"
import { AnyAction } from "redux"

const MONGODB_URL_BASE = process.env.DB_RENDER_URL || `http://localhost:9000`

function reqConfig(route?: string, body?: object, method?: string) {

    // provided by the API, expires after some time
    const TOKEN: any = typeof window !== "undefined" && localStorage.getItem('server_token') ? localStorage.getItem('server_token') : null

    return {

        method: method ? method : 'POST',
        url: `${MONGODB_URL_BASE}${route ? route : ""}`,
        headers: {
            'Authorization': `Bearer ${TOKEN}`
        },
        data: body || null

    }
}

export const signUpUser = (user: SignUp) => async (dispatch: Dispatch<AnyAction>) => {

    try {

        dispatch({ type: USER_SIGNUP_REQUEST, payload: user })

        const { data } = await Axios(reqConfig("/user/signup", user))

        localStorage.setItem("server_token", data.token)

        if (!data.success) {
            dispatch({ type: USER_SIGNUP_ERROR, payload: data })
        }

        dispatch({ type: USER_SIGNUP_SUCCESS, payload: data })

        return data
    }
    catch (err: any) {

        dispatch({ type: USER_SIGNUP_ERROR, payload: err.response.data })
        console.error(err.response.data)

        return err.response.data
    }

}

// log in through LogIn Page
export const logInUser = (user: LogIn) => async (dispatch: Dispatch<AnyAction>) => {

    try {

        dispatch({ type: USER_LOGIN_REQUEST, payload: user })

        const { data } = await Axios(reqConfig("/user/login", user))

        data.token && localStorage.setItem("server_token", data.token)

        if (!data.success) {
            dispatch({ type: USER_LOGIN_ERROR, payload: data })
        }

        dispatch({ type: USER_LOGIN_SUCCESS, payload: data })

        return data
    }
    catch (err: any) {

        dispatch({ type: USER_LOGIN_ERROR, payload: err.response.data })
        console.error(err.response.data)

        return err.response.data
    }

}

// logs user when he as previously loggedin, through its token on local storage
export const logInUserThroughToken = () => async (dispatch: Dispatch<AnyAction>) => {

    try {

        dispatch({ type: USER_LOGIN_REQUEST })

        const { data } = await Axios(reqConfig("/user/login"))

        data.token && localStorage.setItem("server_token", data.token)

        if (!data.success) {
            dispatch({ type: USER_LOGIN_ERROR, payload: data })
            localStorage.removeItem("server_token")
        }

        dispatch({ type: USER_LOGIN_SUCCESS, payload: data.user })

        return data
    }
    catch (err: any) {

        dispatch({ type: USER_LOGIN_ERROR, payload: err.response.data })
        localStorage.removeItem("server_token")

        console.error(err.response.data)

        return err.response.data
    }

}

export async function logOutUser() {

    try {

        localStorage.removeItem("server_token")

        window.location.reload()

        return
    }
    catch (err: any) {
        console.error(err)
        return err
    }

}

// USER ACTIONS WHEN LOGGED IN

// Add to Bookmarks
export const addToBookmark = (gameData: any) => async (dispatch: Dispatch<AnyAction>) => {

    try {

        dispatch({ type: USER_ADD_TO_BOOKMARKS_REQUEST })

        const { data } = await Axios(reqConfig("/action/bookmark", gameData, 'PUT'))

        if (!data.success) {
            dispatch({ type: USER_ADD_TO_BOOKMARKS_ERROR, payload: data })

            return data
        }

        dispatch({ type: USER_ADD_TO_BOOKMARKS_SUCCESS, payload: data })

        return data
    }
    catch (err: any) {

        dispatch({ type: USER_ADD_TO_BOOKMARKS_ERROR, payload: err.response.data })

        console.error(err.response.data)

        return err.response.data
    }

}