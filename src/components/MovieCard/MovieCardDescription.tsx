import React from "react"
import { Movie } from "../../types"


interface Props {
    movie: Movie
}

const MovieCardDescription: React.FC<Props> = () => {
    return (
        <h1>MovieCardDescription</h1>
    )
}

export default MovieCardDescription