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
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
} from '../constants/userConstants';

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userLogoutReducer = (state = {}, action) => {
  if (action.type === USER_LOGOUT) {
    localStorage.removeItem('userInfo')
    return { userInfo: action.payload }
  }
  return state;
}

export const userNewFavGameReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REQUEST_NEW_FAV_GAME:
      return { loading: true }
    case USER_SUCCESS_NEW_FAV_GAME:
      console.log(action.payload)
      return { loading: false, userInfo: action.payload }
    case USER_FAIL_NEW_FAV_GAME:
      return { loading: false, error: action.payload }
    default:
      return state;
  }
}

export const userRemoveFavGameReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REQUEST_REMOVE_FAV_GAME:
      return { loading: true }
    case USER_SUCCESS_REMOVE_FAV_GAME:
      return { loading: false, userInfo: action.payload }
    case USER_FAIL_REMOVE_FAV_GAME:
      return { loading: false, error: action.payload }
    default:
      return state;
  }
}

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true }
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state;
  }
}