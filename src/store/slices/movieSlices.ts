import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAddMovieForm, IDropdownData, IMovie, MovieActionEnum, IUpdateFormField, IObjectKey } from '../../types';
import { fullfildForm } from '../../utils/fullfildForm';

export const initialFormValue: IAddMovieForm = {
    title: {
        label: 'Title',
        name: 'name',
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
        name: 'rating',
        step: 0.1,
        value: ''
    },
    vote_count: {
        label: 'Amount of vote',
        typeField: 'number',
        name: 'vote',
        value: ''
    },
    release_date: {
        label: 'RELEASE DATE',
        typeField: 'date',
        name: 'year',
        value: "2017-12-29"
    },
    poster_path: {
        label: 'movie url',
        placeholder: 'https://',
        name: 'posterPath',
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
        data: ['all', 'Documentary', 'Comedy', 'Horror','crime'],
        multiply: true,
        name: 'genre',
        value: ['all'],
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
        data: IDropdownData,
        value: IDropdownData
    },
    sortedArray: {
        data: IDropdownData,
        value: IDropdownData
    },
    movieParamsQuery: IObjectKey
}

const initialState: IMovieSlice = {
    genres: {data: ['all', 'Documentary', 'Comedy', 'Horror','Drama'], value: ['all']},
    formFields: initialFormValue,
    formValidation: false,
    selectedMovie: null,
    movieActions: {
        data: [MovieActionEnum.Delete, MovieActionEnum.Edit],
        value: ['']
    },
    sortedArray: {data: ['release_date', 'vote_average'], value: ['']},
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
            console.log(action.payload.value, action.payload.name, state.formFields[action.payload.name].value)
        },
        editMovie: (state, action: PayloadAction<IMovie>) => {
            state.formFields = fullfildForm(action.payload)
        },
        selectGenre: (state, action: PayloadAction<IDropdownData>) => {
            state.genres.value = action.payload
        },
        resetFormFeilds: (state) => {
            state.formFields = initialFormValue
        },
        selectSortValue: (state, action: PayloadAction<IDropdownData>) => {
            state.sortedArray.value = action.payload
        },
        selectMovieActionsValue: (state, action: PayloadAction<IDropdownData>) => {
            state.movieActions.value = action.payload
        },
        selectMovieParamsQuery: (state, action: PayloadAction<IObjectKey>) => {
            state.movieParamsQuery[action.payload.param] = action.payload.value
        }
    },
})

export const { selectMovie, updateFormField, selectGenre, editMovie, resetFormFeilds, selectSortValue, selectMovieActionsValue, selectMovieParamsQuery } = movieSlice.actions

export default movieSlice.reducer