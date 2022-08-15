import React from "react"
import { Categories } from "./CategorIes"
import { ErrorBoundary } from "./ErrorBoundary"
import { Footer } from "./Footer"
import { Header } from "./Header"
import { MovieCards } from "./MovieCard/MovieCards"
import { Sort } from "./Sort"

export const App = () => {


    return (
        <React.StrictMode>
            <Header />
            <main className="content">
                <div className="filter">
                    <Categories />
                    <Sort />
                </div>
                <ErrorBoundary>
                    <MovieCards />
                </ErrorBoundary>
            </main>
            <Footer>
                <a href="/" className="header__logo">
                    <h1 className="logo-text"><strong>netflix</strong>roulette</h1>
                </a>
            </Footer>
        </React.StrictMode>
    )
}
