import React from "react"
import { IAddMovieForm, Direction, IDropdownData, Movie, MovieActionEnum } from "../types";
import { returnNewMappedDropdownArray } from "./utils/newMappedDropdownArray";

const initialFormValue: IAddMovieForm = {
    name: {
        label: 'Title',
        name: 'name',
        value: ''
    },
    year: {
        label: 'RELEASE DATE',
        typeField: 'number',
        name: 'year',
        value: "2017"
    },
    movieUrl: {
        label: 'movie url',
        placeholder: 'https://',
        name: 'movieUrl',
        value: ''
    },
    rating: {
        label: 'RATING',
        typeField: 'number',
        name: 'rating',
        step: 0.1,
        value: ''
    },
    genre: {
        label: 'genre',
        typeField: 'dropdown',
        data: [
            {name: 'all', isActive: true},
            {name: 'Documentary', isActive: false},
            {name: 'Comedy', isActive: false},
            {name: 'Horror', isActive: false},
            {name: 'crime', isActive: false}
        ],
        multiply: true,
        name: 'genre',
        value: '',
    },
    runtime: {
        label: 'RUNTIME',
        typeField: 'text',
        name: 'runtime',
        value: ''
    },
    overview: {
        label: 'OVERVIEW',
        typeField: 'textarea',
        value: '',
        name: 'overview',
        placeholder: 'Movie description'
    },
}

const sortedArray: IDropdownData[] = [{name: 'date', isActive: true}, {name: 'name', isActive: false}, {name: 'genre', isActive: false}]

const movieActions: IDropdownData[] = ([{name: MovieActionEnum.Edit, isActive: false}, {name: MovieActionEnum.Delete, isActive: false}])

const editFormCreate = (movie: Movie): IAddMovieForm => {
    return {
        name: {
            label: 'Title',
            name: 'name',
            value: movie.name
        },
        year: {
            label: 'RELEASE DATE',
            typeField: 'number',
            name: 'year',
            value: movie.year
        },
        movieUrl: {
            label: 'movie url',
            placeholder: 'https://',
            name: 'movieUrl',
            value: movie.imgUrl
        },
        rating: {
            label: 'RATING',
            typeField: 'number',
            name: 'rating',
            step: 0.1,
            value: movie.rating
        },
        genre: {
            label: 'genre',
            typeField: 'dropdown',
            data: [
                {name: 'all', isActive: true},
                {name: 'Documentary', isActive: false},
                {name: 'Comedy', isActive: false},
                {name: 'Horror', isActive: false},
                {name: 'crime', isActive: false}
            ],
            multiply: true,
            name: 'genre',
            value: movie.genre,
        },
        runtime: {
            label: 'RUNTIME',
            typeField: 'text',
            name: 'runtime',
            value: movie.runtime
        },
        overview: {
            label: 'OVERVIEW',
            typeField: 'textarea',
            value: movie.overview,
            name: 'overview',
            placeholder: 'Movie description'
        },
    }
}


export interface GlobalContextInterface {
    genre: IDropdownData[],
    formFields: IAddMovieForm,
    formValidation: boolean,
    movies: Movie[],
    selectedMovie: null | Movie
    sortedArray: IDropdownData[],
    aprooveMoadal: {
        isOpen: boolean,
        aditionalClass: string,
        position: Direction
    },
    movieActions: IDropdownData[],
    movieModal: boolean
}

export const initialState: GlobalContextInterface = {
    genre: [{name: 'default', isActive: true}],
    formFields: Object.assign({}, initialFormValue),
    formValidation: false,
    movies: [{
        id: Math.floor(Math.random() * 100000),
        name: 'Pulp Fiction',
        genre: 'Action & Adventure',
        imgUrl: '',
        year: '2004',
        movieUrl: '',
        rating: '5',
        runtime: '50'
    }],
    selectedMovie: null,
    sortedArray,
    aprooveMoadal: {
        isOpen: false,
        aditionalClass: 'aprooval-modal',
        position: Direction.Top
    },
    movieActions,
    movieModal: false
}

export const TOOGLE_GENRE = 'TOOGLE_GENRE'
export const ADD_GENRE  = 'ADD_GENRE'
export const ADD_MOVIE = 'ADD_MOVIE'
export const ADD_MOVIES = 'ADD_MOVIES'
export const SELECT_MOVIE = 'SELECT_MOVIE'
export const ACTION_MOVIE = 'ACTION_MOVIE'
export const TOGGLE_SORTED_ARRAY = 'TOGGLE_SORTED_ARRAY'
export const APDATE_FORM_FIELD = 'APDATE_FORM_FIELD'
export const UPDATE_FORM_VALIDATION = 'UPDATE_FORM_VALIDATION'
export const RESET_FORM_FIELDS = 'RESET_FORM_FIELDS'
export const TOGGLE_APROOVAL_MODAL = 'TOGGLE_APROOVAL_MODAL'

export interface ToggleGenreInterface {
    type: typeof TOOGLE_GENRE,
    payload: string
}

export function toggleGenre(value: string): ToggleGenreInterface {
    return {
        type: TOOGLE_GENRE,
        payload: value
    }
}

export interface AddGenreInterface {
    type: typeof ADD_GENRE,
    payload: IDropdownData[]
}

export function addGenre(value: IDropdownData[]): AddGenreInterface {
    return {
        type: ADD_GENRE,
        payload: value
    }
}

export interface AddMovie {
    type: typeof ADD_MOVIE,
    payload: Movie
}

export function addMovie(value: Movie): AddMovie {
    return {
        type: ADD_MOVIE,
        payload: value
    }
}

export interface AddMovies {
    type: typeof ADD_MOVIES,
    payload: Movie[]
}

export function addMovies(value: Movie[]): AddMovies {
    return {
        type: ADD_MOVIES,
        payload: value
    }
}

export interface SelectMovie {
    type: typeof SELECT_MOVIE,
    payload: Movie | null
}

export function selectMovie(value: Movie | null): SelectMovie {
    return {
        type: SELECT_MOVIE,
        payload: value
    }
}

export interface ActionMovie {
    type: typeof ACTION_MOVIE,
    payload: {value: MovieActionEnum, id: number}
}

export function actionMovie(value: {value: MovieActionEnum, id: number}): ActionMovie {
    return {
        type: ACTION_MOVIE,
        payload: value
    }
}

export interface ToggleSortedArray {
    type: typeof TOGGLE_SORTED_ARRAY,
    payload: string
}

export function toggleSortedArray(value: string): ToggleSortedArray {
    return {
        type: TOGGLE_SORTED_ARRAY,
        payload: value
    }
}

export interface ApdateFormField {
    type: typeof APDATE_FORM_FIELD,
    payload: {name: keyof IAddMovieForm, value: string | number}
}

export function apdateFormField(value: {name: keyof IAddMovieForm, value: string | number}): ApdateFormField {
    return {
        type: APDATE_FORM_FIELD,
        payload: value
    }
}

export interface UpdateFormValidation {
    type: typeof UPDATE_FORM_VALIDATION,
    paylodad: boolean
}

export function updateFormValidation(state: boolean): UpdateFormValidation {
    return {
        type: UPDATE_FORM_VALIDATION,
        paylodad: state
    }
}

export interface ResetFormFields {
    type: typeof RESET_FORM_FIELDS
}

export function resetFormFields(): ResetFormFields {
    return {
        type: RESET_FORM_FIELDS
    }
}

export interface ToggleAproovalModal {
    type: typeof TOGGLE_APROOVAL_MODAL,
    payload: boolean
}

export function toggleAproovalModal(state: boolean): ToggleAproovalModal {
    return {
        type: TOGGLE_APROOVAL_MODAL,
        payload: state
    }
}

export type Actions = ToggleGenreInterface
                | AddMovie
                | AddMovies
                | SelectMovie
                | ToggleSortedArray
                | ApdateFormField
                | ResetFormFields
                | UpdateFormValidation
                | AddGenreInterface
                | ToggleAproovalModal
                | ActionMovie

export function globalReducer(state: GlobalContextInterface, action: Actions): GlobalContextInterface {
    switch (action.type) {
        case TOOGLE_GENRE:
            const newGenreArray: IDropdownData[] = state.genre.map((genre) => returnNewMappedDropdownArray(genre, action.payload))
            return {...state, genre: newGenreArray}
        case ADD_GENRE:
            return {...state, genre: action.payload}
        case ADD_MOVIE:
            return {...state, movies: [...state.movies, action.payload]}
        case ADD_MOVIES:
            return {...state, movies: action.payload}
        case SELECT_MOVIE:
            return {...state, selectedMovie: action.payload}
        case ACTION_MOVIE:
            if (action.payload.value === MovieActionEnum.Delete) {
                return {...state, movies: state.movies.filter(movie => movie.id !== action.payload.id)}
            } else {
                const currentMovie: Movie = state.movies.filter(movie => movie.id === action.payload.id)[0]
                return {
                    ...state,
                    formFields: editFormCreate(currentMovie)
                }
            }
        case TOGGLE_SORTED_ARRAY:
            const newSortedArray: IDropdownData[] = state.sortedArray.map(sort => returnNewMappedDropdownArray(sort, action.payload))
            return {...state, sortedArray: newSortedArray}
        case APDATE_FORM_FIELD:
            if (action.payload.name === 'genre' && state.genre.find(item => item.name === action.payload.value)) {
                const newArray = state.formFields.genre.data.map(genre => returnNewMappedDropdownArray(genre, action.payload.value.toString()))
                return {...state, formFields: {...state.formFields, genre: {...state.formFields.genre, data: newArray }}}
            }
            return {...state, formFields: {...state.formFields, [action.payload.name]: {...state.formFields[action.payload.name], value: action.payload.value} }}
        case UPDATE_FORM_VALIDATION:
            return {...state, formValidation: action.paylodad}
        case RESET_FORM_FIELDS:
            const St = {...state, formFields: initialFormValue}
            console.log(St.formFields.genre.data, initialFormValue.genre.data);
            return St
        case TOGGLE_APROOVAL_MODAL:
            return {...state, aprooveMoadal: {...state.aprooveMoadal, isOpen: action.payload}}
        default:
            return state
      }
}