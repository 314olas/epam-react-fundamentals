export interface Movie {
    id: number | typeof Date.now,
    name: string,
    genre: string,
    imgUrl: string,
    year: string,
    movieUrl: string,
    overview?: string,
    rating: string,
    runtime: string
}

export interface IDropdownData {
    name: string,
    isActive: boolean
}

export interface ICommonFormField {
    typeField?: string,
    value: string,
    placeholder?: string,
    label?: string,
    name?: string,
}

export type IRating = ICommonFormField & {
    step: number
}

export type IGenre = ICommonFormField & {
    multiply?: boolean,
    data?: IDropdownData[]
}

export interface IAddMovieForm {
    name: ICommonFormField,
    genre: IGenre,
    year: ICommonFormField,
    movieUrl: ICommonFormField,
    overview?: ICommonFormField,
    rating: IRating,
    runtime: ICommonFormField,
};

export enum Direction {
    Top = "top",
    Bottom = "bottom",
    Left = "left",
    Right = "right",
    Center = "center"
}

export enum MovieActionEnum {
    Delete = 'Delete',
    Edit = 'Edit'
}