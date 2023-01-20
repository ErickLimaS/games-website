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
  NOTIFICATIONS_REQUEST,
  NOTIFICATIONS_SUCCESS,
  NOTIFICATIONS_FAIL,
  USER_UPDATE_REQUEST_FAVORITE_GAMES,
  USER_UPDATE_SUCCESS_FAVORITE_GAMES,
  USER_UPDATE_FAIL_FAVORITE_GAMES,
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
    localStorage.removeItem('notifications')
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

export const userNotificationsReducer = (state = {}, action) => {
  switch (action.type) {
    case NOTIFICATIONS_REQUEST:
      return { loading: true }
    case NOTIFICATIONS_SUCCESS:
      return { loading: false, gamesNotifications: action.payload }
    case NOTIFICATIONS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state;
  }
}

export const userUpdateFavoriteGamesReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST_FAVORITE_GAMES:
      return { loading: true }
    case USER_UPDATE_SUCCESS_FAVORITE_GAMES:
      return { loading: false, userInfo: action.payload }
    case USER_UPDATE_FAIL_FAVORITE_GAMES:
      return { loading: false, error: action.payload }
    default:
      return state;
  }
}