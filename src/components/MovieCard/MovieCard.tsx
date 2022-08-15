import React from "react"
import DropDown from "../Dropdown"
import { IDropdownData, IMovie, IToggleAction, MovieActionEnum } from "../../types"
import MovieCardImg from "./MovieCardImg"

interface Props {
    movies: IMovie[],
    selectMovieHandler: (movie: IMovie) => void,
    toggleMovieAction: (action: IToggleAction, movie: IMovie) => void,
    actions: IDropdownData
}

export const MovieCard: React.FC<Props> = ({movies, actions, toggleMovieAction, selectMovieHandler}) =>  {

    const clickHandler = (e: React.MouseEvent<HTMLAnchorElement>, movie: IMovie) => {
        e.preventDefault();
        selectMovieHandler(movie)
    }

    return (
        <>
            {movies.map(movie => {
                return (
                    <article className="movie-card" key={movie.id.toString()}>
                        <div className="image-wrapper">
                            <a href="#" title={movie.title} onClick={(e) => clickHandler(e, movie)}>
                                <MovieCardImg imgUrl={movie.poster_path} />
                            </a>
                            <DropDown
                                className={'movie-card__more'}
                                position={'right'}
                                items={actions}
                                value={['']}
                                onChangeHandler={(value: IDropdownData) => toggleMovieAction({value: value[0] as MovieActionEnum, id: movie.id}, movie)} >
                                    <span>...</span>
                                </DropDown>
                        </div>
                        <footer className="movie-card__footer">
                            <div className="text-content">
                                <h4 className="movie-name">{movie.title}</h4>
                                <span className="movie-category">{movie.genres.join(', ')}</span>
                            </div>
                            <span className="year-label">
                                {movie.release_date.split('-')[0]}
                            </span>
                        </footer>
                    </article>
                )
            })}
        </>
    )
}
