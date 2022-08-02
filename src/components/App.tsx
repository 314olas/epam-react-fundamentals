import React, {useState, useContext} from "react"
import {Header} from "./Header"
import { Footer } from './Footer';
import { Categories } from "./CategorIes";
import { Sort } from "./Sort";
import { ErrorBoundary } from "./ErrorBoundary";
import { MovieCards } from "./MovieCard/MovieCards";

import { MovieActionEnum } from '../types';
import { actionMovie, resetFormFields, toggleAproovalModal, toggleMovieModal } from './Globaltate';
import {AppContext} from "./context/AppContext";
import MovieForm from "./MovieCard/MovieForm";

const AproovalModal = React.lazy(() => import("./AproovalModal"))
const Modal = React.lazy(() => import("./Modal"))


export const App = () => {
    const {state, dispatch} = useContext(AppContext)

    const [deleteAproove, setDeleteAproove] = useState<{isOpen: boolean, id?: number}>({isOpen: false, })

    const actionMovieHandler = (action: {value: MovieActionEnum, id: number}) => {
        if (action.value !== MovieActionEnum.Delete) {
            dispatch(actionMovie(action))
            dispatch(toggleMovieModal(true))
        } else {
            setDeleteAproove(prev => ({...prev, isOpen: true, id: action.id}))
            dispatch(toggleAproovalModal(true))
        }
    }

    const deleteConfirmation = () => {
        dispatch(actionMovie({value: MovieActionEnum.Delete, id: deleteAproove.id}))
        dispatch(toggleAproovalModal(false))
    }

    const openFormModal = (val: boolean) => {
        dispatch(resetFormFields())
        dispatch(toggleMovieModal(val))
    }

    return (
        <React.StrictMode>
            <Header openModal={openFormModal}/>
            <main className="content">
                <div className="filter">
                    <Categories list={state.genre} selectHandler={dispatch}/>
                    <Sort sortedArray={state.sortedArray} setSortValue={dispatch}/>
                </div>
                <ErrorBoundary>
                    <MovieCards actionMovie={actionMovieHandler}/>
                </ErrorBoundary>
            </main>
            <Footer>
                <a href="/" className="header__logo">
                    <h1 className="logo-text"><strong>netflix</strong>roulette</h1>
                </a>
            </Footer>
            <React.Suspense fallback={<div>Loading...</div>}>
                <Modal isOpen={state.isMovieModal} toggleOpen={(state) => dispatch(toggleMovieModal(state))}>
                    <MovieForm />
                </Modal>
            </React.Suspense>
            <React.Suspense fallback={<div>Loading...</div>}>
                <AproovalModal state={state} toggleOpen={dispatch}>
                    {deleteAproove.isOpen
                    ? <>
                        <h2 className="title">Delete MOVIE</h2>
                        <span className="text">Are you sure you want to delete this movie?</span>
                        <div className="confirmation-btn-wrapper">
                            <button type="button" className="button button-warning" onClick={deleteConfirmation}>Confirm</button>
                        </div>
                    </>
                    : <>
                        <span className="ok-icon">
                            <svg width="41" height="32" viewBox="0 0 41 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 17.8347L13.1175 28L38 3" stroke="white" strokeWidth="5" strokeLinecap="round"/>
                            </svg>
                        </span>
                        <h2 className="title">congratulations !</h2>
                        <span className="text">The movie has been added to <br/> database successfully </span>
                    </>
                }
                </AproovalModal>
            </React.Suspense>
        </React.StrictMode>
    )
}
