import React from "react"
import { Movie } from "../../types"
import '../../styles/components/movie-card-description.scss'
import MovieCardImg from "./MovieCardImg"

interface Props {
    movie: Movie
}

const MovieCardDescription: React.FC<Props> = ({movie}) => {
    return (
        <div className="movie-card-description">
            <MovieCardImg imgUrl={movie.imgUrl} />
            <div className="info">
                <div className="title">
                    <h2 className="title__text">{movie.name}</h2>
                    <span className="rating">{movie.rating}</span>
                </div>
                <p className="genre">{movie.genre.split(',').join('')}</p>
                <div className="time">
                    <span className="year">{movie.year}</span>
                    <span>{movie.runtime}</span>
                </div>
                <span className="description">{movie.overview}</span>
            </div>

        </div>
        
    )
}

export default MovieCardDescription