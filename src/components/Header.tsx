import React, { useContext } from "react"
import img from '../images/header.png'
import {AppContext} from "./context/AppContext"
import { selectMovie } from "./Globaltate"
import MovieCardDescription from "./MovieCard/MovieCardDescription"

interface Props {
    openModal: (value: boolean) => void,
}

export const Header: React.FC<Props> = ({openModal}) => {
    const {state, dispatch} = useContext(AppContext)

    return (
        <header className={['header', state.selectedMovie ? 'bg-black': '' ].join(' ')}>
            {!state.selectedMovie
            ? <>
                <img src={img} alt="header background image" className="header__background"/>
                <div className="header__top">
                    <a href="/" className="header__logo">
                        <h1 className="logo-text"><strong>netflix</strong>roulette</h1>
                    </a>
                    <button type="button" className="button header__add-btn" onClick={() => openModal(true)}>+ Add movie</button>
                </div>

                <form className="header__search">
                    <h2 className="title">FIND YOUR MOViE</h2>
                    <div className="header__search-field">
                        <input type="text" className="input" placeholder="What do you want to watch?" />
                        <button className="button button-warning">search</button>
                    </div>
                </form>
            </>
            : <>
                <div className="header__top">
                    <a href="/" className="header__logo">
                        <h1 className="logo-text"><strong>netflix</strong>roulette</h1>
                    </a>
                    <button type="button" className="button header__search-btn" onClick={() => dispatch(selectMovie(null))}>
                        <svg width="29" height="30" viewBox="0 0 29 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="18.5" cy="10.5" r="9.5" stroke="#F65261" strokeWidth="2"/>
                            <path d="M10.5 19.5L1.5 28.5" stroke="#F65261" strokeWidth="2" strokeLinecap="square"/>
                        </svg>
                    </button>
                </div>
                <MovieCardDescription movie={state.selectedMovie} />
            </>
            }
        </header>
    )
}
