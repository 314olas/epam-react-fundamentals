import React, { useContext, useState } from "react"
import { MovieActionEnum } from "../../types"
import {AppContext} from "../context/AppContext"
import { MovieCard } from "./MovieCard"

interface Props {
    actionMovie: (action: {value: MovieActionEnum, id: number}) => void
}

export const MovieCards: React.FC<Props> = ({actionMovie}) =>  {
    const {state, dispatch} = useContext(AppContext)

    return (
        <section className="container container--3 movie-card-container">
            <MovieCard actions={state.movieActions} movies={state.movies} selectMovieHandler={dispatch} movieAction={actionMovie}/>
        </section>
    )
}