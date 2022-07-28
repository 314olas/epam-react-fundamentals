import React, {useState, useContext} from "react"
import {Header} from "./Header"
import { Footer } from './Footer';
import { Categories } from "./CategorIes";
import { Sort } from "./Sort";
import { ErrorBoundary } from "./ErrorBoundary";
import InputCompenent from "./InputComponent";
import { MovieCards } from "./MovieCard/MovieCards";
import GridTamplate from "./layout/GridTamplate";

import { IAddMovieForm, Movie, MovieActionEnum } from '../types';
import { actionMovie, addMovie, apdateFormField, resetFormFields, toggleAproovalModal, updateFormValidation } from "./Globaltate";
import {AppContext} from "./context/AppContext";
import { validateForm } from "./utils/validateForm";

const AproovalModal = React.lazy(() => import("./AproovalModal"))
const Modal = React.lazy(() => import("./Modal"))


export const App = () => {
    const {state, dispatch} = useContext(AppContext)

    const [addMovieModal, setAddMovieModal] = useState<boolean>(false)

    const [deleteAproove, setDeleteAproove] = useState<{isOpen: boolean, id?: number}>({isOpen: false, })

    const onChangeHandler = (value: string | number, name?: keyof IAddMovieForm) => {
        dispatch(apdateFormField({name: name, value: value}))
        dispatch(updateFormValidation(validateForm(state)))
    }

    const resetHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        dispatch(resetFormFields())
    }

    const submitHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const newMovie: Movie = {
            id: Date.now(),
            name: state.formFields.name.value.toString(),
            genre: state.formFields.genre.value.toString(),
            imgUrl: '',
            year: state.formFields.year.value.toString().split('-')[0],
            movieUrl: state.formFields.movieUrl.value.toString(),
            rating: state.formFields.rating.value,
            runtime: state.formFields.runtime.value
        }

        if (state.formFields.overview.value) newMovie.overview = state.formFields.overview.value.toString()
        setAddMovieModal(false)
        dispatch(addMovie(newMovie))
        dispatch(toggleAproovalModal(true))
        dispatch(resetFormFields())
    }

    const actionMovieHandler = (action: {value: MovieActionEnum, id: number}) => {
        if (action.value !== MovieActionEnum.Delete) {
            dispatch(actionMovie(action))
            setAddMovieModal(true)
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
        setAddMovieModal(val)
    }

    return (
        <React.StrictMode>
            <Header openModal={openFormModal} state={state}/>
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
                <Modal isOpen={addMovieModal} toggleOpen={setAddMovieModal}>
                    <form className="add-movie-form">
                        <GridTamplate columnCount={2} additionalClasses={'form-field-grid'}>
                            {Object.keys(state.formFields).map((field: keyof IAddMovieForm) => {
                                    return <InputCompenent key={field}
                                                            value={state.formFields[field].value}
                                                            type={state.formFields[field].typeField || ''}
                                                            nameAttr={field}
                                                            label={state.formFields[field].label || ''}
                                                            placeholder={state.formFields[field].placeholder || ''}
                                                            step={state.formFields[field].step || ''}
                                                            data={state.formFields[field].data || new Array('')}
                                                            className={state.formFields[field].typeField === 'textarea' ? 'textarea' : ''}
                                                            multiply={state.formFields[field].multiply ? state.formFields[field].multiply : false}
                                                            onChange={onChangeHandler}/>
                            })}
                        </GridTamplate>
                        <div className="button_wrapper">
                            <button className="button" onClick={resetHandler}>reset</button>
                            <button className="button button-outline" onClick={submitHandler} disabled={!state.formValidation}>submit</button>
                        </div>
                    </form>
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
