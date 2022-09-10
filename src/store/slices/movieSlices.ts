import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAddMovieForm, IDropdownData, IMovie, MovieActionEnum, IUpdateFormField, IObjectKey, ISelectOption } from '../../types';
import { fullfildForm } from '../../utils/fullfildForm';

const genre: ISelectOption[] = [
    {
        label: "All",
        value: "all"
    },
    {
        label: "Documentary",
        value: "documentary"
    },
    {
        label: "Comedy",
        value: "comedy"
    },
    {
        label: "Horror",
        value: "horror"
    },
    {
        label: "Drama",
        value: "drama"
    },
    {
        label: "Romance",
        value: "romance"
    },
    {
        label: "Adventure",
        value: "adventure"
    },
    {
        label: 'Animation',
        value: 'animation'
    }
    ]

export const initialFormValue: IAddMovieForm = {
    title: {
        label: 'Title',
        name: 'title',
        value: ''
    },
    tagline: {
        label: 'tagline',
        name: 'tagline',
        value: ''
    },
    vote_average: {
        label: 'RATING',
        typeField: 'number',
        name: 'vote_average',
        step: 0.1,
        value: ''
    },
    vote_count: {
        label: 'Amount of vote',
        typeField: 'number',
        name: 'vote_count',
        value: ''
    },
    release_date: {
        label: 'RELEASE DATE',
        typeField: 'date',
        name: 'release_date',
        value: "2017-12-29"
    },
    poster_path: {
        label: 'movie url',
        placeholder: 'https://',
        name: 'poster_path',
        value: ''
    },
    budget: {
        label: 'Budget',
        typeField: 'number',
        name: 'budget',
        value: ''
    },
    revenue: {
        label: 'revenue',
        typeField: 'number',
        name: 'revenue',
        value: ''
    },
    runtime: {
        label: 'RUNTIME',
        typeField: 'number',
        name: 'runtime',
        value: ''
    },
    genres: {
        label: 'genre',
        typeField: 'dropdown',
        data: genre,
        multiply: true,
        name: 'genres',
        value: '',
    },
    overview: {
        label: 'OVERVIEW',
        typeField: 'textarea',
        value: '',
        name: 'overview',
        placeholder: 'Movie description'
    }
}

interface IMovieSlice {
    genres: {
        data: IDropdownData,
        value: IDropdownData
    },
    formFields: IAddMovieForm,
    formValidation: boolean,
    selectedMovie: null | IMovie,
    movieActions: {
        data: ISelectOption[],
        value: ISelectOption[] | null
    },
    sortedArray: {
        data: ISelectOption[],
        value: ISelectOption[] | null
    },
    movieParamsQuery: IObjectKey
}

const initialState: IMovieSlice = {
    genres: {data: ['all', 'Documentary', 'Comedy', 'Horror','Drama'], value: ['all']},
    formFields: initialFormValue,
    formValidation: false,
    selectedMovie: null,
    movieActions: {
        data: [{label: MovieActionEnum.Delete, value: MovieActionEnum.Delete}, {label: MovieActionEnum.Edit, value: MovieActionEnum.Edit}],
        value: null
    },
    sortedArray: {data: [{label: 'release date', value: 'release_date'}, {label: 'vote average', value: 'vote_average'}], value: null},
    movieParamsQuery: {'limit': '6'}
}

export const movieSlice = createSlice({
    name: 'toolkit/movie',
    initialState,
    reducers: {
        selectMovie: (state, action: PayloadAction<IMovie | null>) => {
            state.selectedMovie = action.payload
        },
        updateFormField: (state, action: PayloadAction<IUpdateFormField>) => {
            state.formFields[action.payload.name].value = action.payload.value
        },
        editMovie: (state, action: PayloadAction<IMovie>) => {
            state.formFields = fullfildForm(action.payload)
        },
        createMovie: (state) => {
            state.formFields = initialFormValue
        },
        selectGenre: (state, action: PayloadAction<IDropdownData>) => {
            state.genres.value = action.payload
        },
        resetFormFeilds: (state) => {
            state.formFields = initialFormValue
        },
        selectSortValue: (state, action: PayloadAction<ISelectOption>) => {
            state.sortedArray.value = [{...action.payload}]
        },
        selectMovieActionsValue: (state, action: PayloadAction<MovieActionEnum>) => {
            state.movieActions.value = [{label: action.payload, value: action.payload}]
        },
        selectMovieParamsQuery: (state, action: PayloadAction<IObjectKey>) => {
            state.movieParamsQuery[action.payload.param] = action.payload.value
        }
    },
})

export const { selectMovie, updateFormField, selectGenre, editMovie, createMovie, resetFormFeilds, selectSortValue, selectMovieActionsValue, selectMovieParamsQuery } = movieSlice.actions

export default movieSlice.reducer