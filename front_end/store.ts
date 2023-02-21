import { configureStore } from "@reduxjs/toolkit";
import { userLogInReducer } from "./redux/reducers/userReducers";


const initialState = {

    user: {
        name: {
            first: null,
            last: null,
        },
        email: null
    }

}

const store = configureStore({
    reducer: {

        user: userLogInReducer,

    },
    preloadedState: initialState
})

export default store
 
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
