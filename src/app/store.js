import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { tmdbApi } from "../services/TMDB";
import userReducer from '../fetures/auth';
import genreOrCategoryReducer from '../fetures/currentGenreOrCategory'
export const store = configureStore({
    reducer: {
            [tmdbApi.reducerPath]: tmdbApi.reducer,
            currentGenreOrCategory:genreOrCategoryReducer,
            user: userReducer,
    }, 
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbApi.middleware),
});
setupListeners(store.dispatch)