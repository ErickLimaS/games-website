import { applyMiddleware, combineReducers, compose } from 'redux';
import { legacy_createStore as createStore } from 'redux'
import thunk from 'redux-thunk';
import {
    userLoginReducer,
    userLogoutReducer,
    userNewFavGameReducer,
    userNotificationsReducer,
    userRegisterReducer,
    userRemoveFavGameReducer,
    userUpdateProfileReducer
} from './reducers/userReducers';

const initialState = {
    userLogin: {
        userInfo: localStorage.getItem('userInfo') ?
            JSON.parse(localStorage.getItem('userInfo')) : null,

            gamesNotifications: localStorage.getItem('gamesNotifications') ?
            JSON.parse(localStorage.getItem('gamesNotifications')) : null,
    },

}

const reducer = combineReducers({
    userRegister: userRegisterReducer,
    userLogin: userLoginReducer,
    userLogout: userLogoutReducer,
    userNewFavGame: userNewFavGameReducer,
    userRemoveFavGame: userRemoveFavGameReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userNotifications: userNotificationsReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
)

export default store;