import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const tmdbApikey =process.env.REACT_APP_TMDB_KEY;
export const tmdbApi = createApi({
    reducerPath:'tmdbApi',
    baseQuery: fetchBaseQuery({baseUrl:'https://api.themoviedb.org/3'}),
    endpoints:(builder)=>({
        //* Get Genres
        getGenres: builder.query({
            query:()=>`genre/movie/list?api_key=${tmdbApikey}`
        }),
        //* Get Movies
        getMovies: builder.query({ 
            query :({genreIdOrCategoryName ,page,searchQuery}) =>{
            if (searchQuery){
                return `/search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApikey}`
            }
            if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'string'){
                return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApikey}`;
            }
            if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'number'){
                return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApikey}`;
            }
            return `movie/popular?page=${page}&api_key=${tmdbApikey}`
        }}),
        //* get movie info
        getMovie:builder.query({
            query: (id) => `/movie/${id}?append_to_response=videos,credits&api_key=${tmdbApikey}`,
        }),
        getRecommendations:builder.query({
            query: ({movie_id,list}) => `/movie/${movie_id}/${list}?api_key=${tmdbApikey}`,
        }),
        getActorsDetails:builder.query({
            query: (id) => `person/${id}?api_key=${tmdbApikey}`,
        }),
        getMoviesActor:builder.query({
            query: ({ id, page }) => `/discover/movie?with_cast=${id}&page=${page}&api_key=${tmdbApikey}`,
        }),
        getList:builder.query({
            query: ({ listName,accountId,sessionId, page }) => `/account/$${accountId}/${listName}?api_key=${tmdbApikey}&session_id=${sessionId}&page=${page}`,
        }),
    })
});

export const {
    useGetMoviesQuery,
    useGetGenresQuery,
    useGetMovieQuery,
    useGetRecommendationsQuery,
    useGetActorsDetailsQuery,
    useGetMoviesActorQuery,
    useGetListQuery
} = tmdbApi;