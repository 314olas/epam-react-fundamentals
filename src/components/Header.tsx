import React, { useState, ChangeEvent, useMemo } from "react"
import { Link, useSearchParams } from 'react-router-dom';
import MovieCardDescription from "./MovieCard/MovieCardDescription"
import { useAppSelector, useAppDispatch } from './hooks/app';

import { toggleMovieFormModal } from "../store/slices/modalsSlices";
import { createMovie } from "../store/slices/movieSlices";
import { useGetMoviesQuery } from "../services/movieService";

import img from '../images/header.png'

interface Props {
}

export const Header: React.FC<Props> = () => {
    // const selectedMovie = useAppSelector((state) => state.movie.selectedMovie)
    const defaultParamsQuery = useAppSelector((state) => state.movie.movieParamsQuery)
    const dispatch = useAppDispatch()
    const [search, setSearch] = useSearchParams()
    const { data } = useGetMoviesQuery({
		...defaultParamsQuery,
		...Object.fromEntries([...search])
	})

    const [searchStr, setSearchStr] = useState<string>('')

    const openCreateFormMovie = () => {
        dispatch(createMovie())
        dispatch(toggleMovieFormModal(true))
    }

    const selectedMovie = useMemo(() => {
        if (data) {
            return data.filter(movie => movie.id === +search.get('movie'))[0]
        }
    }, [+search.get('movie')])

    return (
        <header className={['header', selectedMovie ? 'bg-black' : ''].join(' ')}>
            {!search.has('movie')
                ? <>
                    <img src={img} alt="header background image" className="header__background" />
                    <div className="header__top">
                        <Link to={"/asd"} className="header__logo">
                            <h1 className="logo-text"><strong>netflix</strong>roulette</h1>
                        </Link>
                        <button type="button" className="button header__add-btn" onClick={openCreateFormMovie}>+ Add movie</button>
                    </div>

                    <form className="header__search" onSubmit={(e) => {
                        e.preventDefault()
                        if (searchStr) {
                            search.set('search', searchStr)
                            setSearch(search)
                        }

                    }}>
                        <h2 className="title">FIND YOUR MOViE</h2>
                        <div className="header__search-field">
                            <input type="text"
                                className="input"
                                placeholder="What do you want to watch?"
                                value={searchStr}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchStr(e.target.value)} />
                            <button className="button button-warning">search</button>
                        </div>
                    </form>
                </>
                : <>
                    <div className="header__top">
                        <Link to={"/"} className="header__logo">
                            <h1 className="logo-text"><strong>netflix</strong>roulette</h1>
                        </Link>
                        <button type="button" className="button header__search-btn" title="unselect movie" onClick={() => {
                            search.delete('movie')
                            setSearch(search)
                        }}>
                            <svg width="29" height="30" viewBox="0 0 29 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="18.5" cy="10.5" r="9.5" stroke="#F65261" strokeWidth="2" />
                                <path d="M10.5 19.5L1.5 28.5" stroke="#F65261" strokeWidth="2" strokeLinecap="square" />
                            </svg>
                        </button>
                    </div>
                    <MovieCardDescription movie={selectedMovie} />
                </>
            }
        </header>
    )
}
