import React, { useState } from "react"
import img from '../images/noimagelarge.png'
import { DropDown } from "./Dropdown"
import { Movie } from "./MovieCards"

interface Props {
    movies: Movie[]
}

export const MovieCard: React.FC<Props> = ({movies}) =>  {
    const [sortedArray, setSortedArray] = useState<string[]>(['Edit','Delete'])

    return (
        <>
            {movies.map(movie => {
                return (
                    <article className="movie-card" key={movie.id}>
                        <div className="image-wrapper">
                            <a href="#">
                                <img src={movie.imgUrl || img} alt="" />
                            </a>
                            <DropDown 
                                className={'movie-card__more'}
                                position={'right'}
                                items={sortedArray}
                                defaultValue={''}
                                onChange={(value) => console.log(value)} >
                                    <span>...</span>
                                </DropDown>
                        </div>
                        <footer className="movie-card__footer">
                            <div className="text-content">
                                <h4 className="movie-name">{movie.name}</h4>
                                <span className="movie-category">{movie.category.join(', ')}</span>
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