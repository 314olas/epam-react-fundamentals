import React from "react"
import MovieCardImg from "./MovieCardImg"
import { IMovie } from "../../types"
import '../../styles/components/movie-card-description.scss'

interface Props {
    movie: IMovie
}

const MovieCardDescription: React.FC<Props> = ({movie}) => {
    return (
        <div className="movie-card-description">
            <MovieCardImg imgUrl={movie.poster_path} />
            <div className="info">
                <div className="title">
                    <h2 className="title__text">{movie.title}</h2>
                    <span className="rating">{movie.vote_average}</span>
                </div>
                <p className="genre">{movie.genres.join(', ')}</p>
                <div className="time">
                    <span className="year">{movie.release_date.split('-')[0]}</span>
                    <span>{movie.runtime}</span>
                </div>
                <span className="description">{movie.overview}</span>
            </div>

        </div>
    )
}

export default MovieCardDescription