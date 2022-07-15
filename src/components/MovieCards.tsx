import React, { useState } from "react"
import img from '../images/noimagelarge.png'
import { DropDown } from "./Dropdown"
import { MovieCard } from "./MovieCard"

interface Props {
}

export interface Movie {
    id: number,
    name: string,
    category: string[],
    imgUrl: string,
    year: number,
    link: string
}

const Movies: Movie[] = [
    {
        id: Math.floor(Math.random() * 100000),
        name: 'Pulp Fiction',
        category: ['Action & Adventure'],
        imgUrl: '',
        year: 2004,
        link: '#'
    },
    {
        id: Math.floor(Math.random() * 100000),
        name: 'Pulp Fiction',
        category: ['Action & Adventure', 'blah'],
        imgUrl: '',
        year: 2004,
        link: '#'
    },
    {
        id: Math.floor(Math.random() * 100000),
        name: 'Pulp Fiction',
        category: ['Action & Adventure'],
        imgUrl: '',
        year: 2004,
        link: '#'
    },
    {
        id: Math.floor(Math.random() * 100000),
        name: 'Pulp Fiction',
        category: ['Action & Adventure'],
        imgUrl: '',
        year: 2004,
        link: '#'
    }
]

export const MovieCards: React.FC<Props> = () =>  {
    const [sortedArray, setSortedArray] = useState<string[]>(['Edit','Delete'])

    return (
        <section className="container container--3 movie-card-container">
            <MovieCard movies={Movies} />
        </section>
    )
}