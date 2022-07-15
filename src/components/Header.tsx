import React from "react"
import img from '../images/header.png'

export const Header: React.FC = () => {

    return (
        <header className="header">
            <img src={img} alt="header background image" className="header__background"/>
            <div className="header__top">
                <a href="/" className="header__logo">
                    <h1 className="logo-text"><strong>netflix</strong>roulette</h1>
                </a>
                <button type="button" className="button header__add-btn">+ Add movie</button>
            </div>

            <form className="header__search">
                <h2 className="title">FIND YOUR MOViE</h2>
                <div className="header__search-field">
                    <input type="text" className="input" placeholder="What do you want to watch?" />
                    <button className="button button-warning">search</button>
                </div>
            </form>
        </header>
    )
}