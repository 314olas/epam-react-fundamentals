import React from "react"
import img from '../images/header.png'
import { GlobalContextInterface } from "./Globaltate"
import MovieCardDescription from "./MovieCard/MovieCardDescription"

interface Props {
    state: GlobalContextInterface,
    openModal: (value: boolean) => void
}

export const Header: React.FC<Props> = ({openModal, state}) => {

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
                </div>
                <MovieCardDescription movie={state.selectedMovie} />
            </>
            }
        </header>
    )
}