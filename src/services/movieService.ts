import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IErrorResponse, IMovie, MoviesResponse, IObjectKey } from '../types';

export const movieApi = createApi({
    reducerPath: 'movieApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000/'
    }),
    tagTypes: ['Movies'],
    endpoints: (builder) => ({
        getMovies: builder.query<IMovie[], object>({
            query: (arg?: IObjectKey) => {
                const params = {...arg}
                if (params && params.hasOwnProperty('movie')) {
                    delete params['movie']
                }
                return {
                    url: 'movies',
                    method: 'GET',
                    params: params
                }
            },
            transformResponse: (response: MoviesResponse) => response.data,
            providesTags: result => ['Movies']
        }),
        getMovieById: builder.query<MoviesResponse, string>({
            query: (id) => 'movies/' + id
        }),
        deleteMovie: builder.mutation<MoviesResponse, number>({
            query: (id) => ({
                url: 'movies/' + id,
                method: 'DELETE'
            }),
            invalidatesTags: ['Movies']
        }),
        createMovie: builder.mutation<IMovie, Omit<IMovie, 'id'>>({
            query: (movie: IMovie) => ({
                url: 'movies',
                method: 'POST',
                body: movie
            }),
            invalidatesTags: ['Movies']
        }),
        updateMovie: builder.mutation<IErrorResponse | IMovie, IMovie>({
            query: (movie: IMovie) => ({
                url: 'movies',
                method: 'PUT',
                body: movie
            }),
            invalidatesTags: ['Movies']
        })
    }),
    refetchOnMountOrArgChange: 60,
})

export const {useGetMoviesQuery, useCreateMovieMutation, useDeleteMovieMutation, useUpdateMovieMutation} = movieApi