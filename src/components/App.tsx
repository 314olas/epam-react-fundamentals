import React, {useState} from "react"
import {Header} from "./Header"
import { Footer } from './Footer';
import { Categories } from "./CategorIes";
import { Sort } from "./Sort";
import { MovieCards } from "./MovieCards";
import { ErrorBoundary } from "./ErrorBoundary";

export const App = () => {
    const [categories, setCategories] = useState<string[]>(['all', 'Documentary', 'Comedy', 'Horror', 'crime'])

    return (
        <>
            <Header/>
            <main className="content">
                <div className="filter">
                    <Categories list={categories} />
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
        </>
    )
}