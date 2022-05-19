import { applyMiddleware, combineReducers, compose } from 'redux';
import { legacy_createStore as createStore } from 'redux'
import thunk from 'redux-thunk';
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers';

const initialState = {
    userLogin: {
        userInfo: localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo'))
            : null,
    },
}

const reducer = combineReducers({
    userRegister: userRegisterReducer,
    userLogin: userLoginReducer,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
)

export default store;