import React from "react"
import DropDown from "../Dropdown"
import { IDropdownData, Movie, MovieActionEnum } from "../../types"
import { Actions, selectMovie } from "../Globaltate"
import MovieCardImg from "./MovieCardImg"

interface Props {
    movies: Movie[],
    selectMovieHandler: React.Dispatch<Actions>,
    movieAction: (action: {value: MovieActionEnum, id: number}) => void,
    actions: IDropdownData[]
}

export const MovieCard: React.FC<Props> = ({movies, actions, selectMovieHandler, movieAction}) =>  {
    const clickHandler = (e: React.MouseEvent<HTMLAnchorElement>, movie: Movie) => {
        e.preventDefault();
        selectMovieHandler(selectMovie(movie))
    }

    return (
        <>
            {movies.map(movie => {
                return (
                    <article className="movie-card" key={movie.id.toString()}>
                        <div className="image-wrapper">
                            <a href="#" title={movie.name} onClick={(e) => clickHandler(e, movie)}>
                                <MovieCardImg imgUrl={movie.imgUrl} />
                            </a>
                            <DropDown
                                className={'movie-card__more'}
                                position={'right'}
                                items={actions}
                                onChangeHandler={(value: MovieActionEnum) => movieAction({value: value, id: +movie.id})} >
                                    <span>...</span>
                                </DropDown>
                        </div>
                        <footer className="movie-card__footer">
                            <div className="text-content">
                                <h4 className="movie-name">{movie.name}</h4>
                                <span className="movie-category">{movie.genre}</span>
                            </div>
                            <span className="year-label">
                                {movie.year}
                            </span>
                        </footer>
                    </article>
                )
            })}
        </>
    )
}

const a = {
    name: 'dsf',
    roar(){
        console.log(this.name)
    }
}

a.name = 'asdf'
const b = a
b.roar()