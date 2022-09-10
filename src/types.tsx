export type IObjectKey = {
    [key: string]: any;
};

export interface ISelectOption {
    label: string;
    value: string;
}

export interface IMovie {
    id?: number,
    title: string;
    tagline: string;
    vote_average: number;
    vote_count: number;
    release_date: string;
    poster_path: string;
    overview: string;
    budget: number;
    revenue: number;
    genres: IDropdownData;
    runtime: number;
}

export interface MoviesResponse {
    totalAmount: number;
    data: IMovie[];
    offset: number;
    limit: number;
}

// export interface IDropdownData {
//     name: string,
//     isActive: boolean
// }

export type IDropdownData = string[]

export interface ICommonFormField {
    typeField?: string,
    value: string | string[] | number | IDropdownData | ISelectOption[],
    placeholder?: string,
    label?: string,
    name?: string,
    step?: number,
    multiply?: boolean,
    data?: ISelectOption[] | null
}


export interface IAddMovieForm {
    title: ICommonFormField,
    tagline: ICommonFormField,
    budget: ICommonFormField,
    genres: ICommonFormField,
    release_date: ICommonFormField,
    vote_count: ICommonFormField,
    poster_path: ICommonFormField,
    overview: ICommonFormField,
    vote_average: ICommonFormField,
    runtime: ICommonFormField,
    revenue: ICommonFormField;
};

export interface IUpdateFormField {
    name: keyof IAddMovieForm,
    value: string | string[] | number | IDropdownData,
}

export enum Direction {
    Top = "top",
    Bottom = "bottom",
    Left = "left",
    Right = "right",
    Center = "center"
}

export enum MovieActionEnum {
    Delete = 'Delete',
    Edit = 'Edit',
    New = 'New'
}

export interface IGlobalContextInterface {
    genre: IDropdownData,
    formFields: IAddMovieForm,
    formValidation: boolean,
    movies: IMovie[],
    selectedMovie: null | IMovie
    sortedArray: IDropdownData,
    aprooveMoadal: {
        isOpen: boolean,
        aditionalClass: string,
        position: Direction
    },
    movieActions: IDropdownData,
    isMovieModal: boolean
}

export interface IToggleAction {
    value: MovieActionEnum,
    id: number
}

export interface IErrorResponse {
    error: {
        data?: any,
        message?: any
    }
}

