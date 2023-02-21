import { AnyAction } from "redux";
import {
    USER_ADD_TO_BOOKMARKS_ERROR, USER_ADD_TO_BOOKMARKS_REQUEST,
    USER_ADD_TO_BOOKMARKS_SUCCESS, USER_LOGIN_ERROR, USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS, USER_SIGNUP_ERROR, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS
} from "../constants/userConstants";

export function userSignUpReducer(state = {}, action: AnyAction) {

    switch (action.type) {

        case USER_SIGNUP_REQUEST:
            return { ...state, loading: true }

        case USER_SIGNUP_SUCCESS:
            return { ...action.payload, loading: false, success: true }

        case USER_SIGNUP_ERROR:
            return { ...state, loading: false, error: action.payload }

        default:
            return state

    }

}

export function userLogInReducer(state = {}, action: AnyAction) {

    switch (action.type) {

        case USER_LOGIN_REQUEST:
            return { ...state, loading: true }

        case USER_LOGIN_SUCCESS:
            return { ...action.payload, loading: false, success: true }

        case USER_LOGIN_ERROR:
            return { ...state, loading: false, error: action.payload }

        default:
            return state

    }

}

export function userAddToBookmarks(state = {}, action: AnyAction) {

    switch (action.type) {

        case USER_ADD_TO_BOOKMARKS_REQUEST:
            return { ...state, loading: true }

        case USER_ADD_TO_BOOKMARKS_SUCCESS:
            return { loading: false, success: true }

        case USER_ADD_TO_BOOKMARKS_ERROR:
            return { ...state, loading: false, error: action.payload }

        default:
            return state

    }

}