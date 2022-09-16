import React, { useState } from "react"
import { MovieCard } from "./MovieCard"
import MovieForm from "./MovieForm";
import Loading from "../Loading"
import MoveSceleton from './MovieSceleton';
import { editMovie, selectMovie, selectMovieActionsValue } from "../../store/slices/movieSlices"
import { useDeleteMovieMutation, useGetMoviesQuery } from "../../services/movieService"
import { toggleDeleteConfirmationModal, toggleMovieFormModal, toggleSuccessModal } from "../../store/slices/modalsSlices";
import { useAppSelector, useAppDispatch } from '../hooks/app';
import { Direction, MovieActionEnum, IMovie, IToggleAction } from '../../types';

const Modal = React.lazy(() => import("../Modal"))

import "../../styles/components/aprooval-modal.scss"

interface Props {
    params: object
}

export const MovieCards: React.FC<Props> = ({params}) => {
    const [movieId, setMovieId] = useState<number>(undefined)

    const movieState = useAppSelector((state) => state.movie)
    const modalsState = useAppSelector((state) => state.modals)

    const { data, isError, isFetching } = useGetMoviesQuery(params)
    const [deleteMovie, { isSuccess }] = useDeleteMovieMutation()

    const dispatch = useAppDispatch()

    const selectMovieHandler = (movie: IMovie) => {
        dispatch(selectMovie(movie))
        window.scroll({
            top: 0,
            behavior: 'smooth'
        })
    }

    const toggleMovieActionHandler = (action: IToggleAction, movie: IMovie) => {
        setMovieId(action.id)
        dispatch(selectMovieActionsValue(action.value))

        if (action.value === MovieActionEnum.Delete) {
            dispatch(toggleDeleteConfirmationModal(true))
        } else if (action.value === MovieActionEnum.Edit) {
            dispatch(toggleMovieFormModal(true))
            dispatch(editMovie(movie))
        }
    }

    const confirmDeleteMovie = async () => {
        try {
            const res = await deleteMovie(Number(movieId))
            setMovieId(undefined)
            dispatch(toggleDeleteConfirmationModal(false))
        } catch (error) {
            console.log('error:', error)
        }
    }

    const deleteConfirmationModalHandler = (state: boolean) => {
        dispatch(toggleDeleteConfirmationModal(state))
    }

    const successModalHandler = (state: boolean) => {
        dispatch(toggleSuccessModal(state))
    }

    return (
        <>
            {
                (!isFetching && !isError) &&
                <>
                    <section className="container container--3 movie-card-container">
                        <MovieCard actions={movieState.movieActions.data}
                            toggleMovieAction={toggleMovieActionHandler}
                            movies={data}
                            selectMovieHandler={selectMovieHandler} />
                    </section>
                    <React.Suspense fallback={<Loading />}>
                        <Modal isOpen={modalsState.deleteConfirmationModal}
                            toggleOpen={deleteConfirmationModalHandler}
                            additionalClass={'aprooval-modal'}
                            position={Direction.Top}>
                            <>
                                <h2 className="title">Delete MOVIE</h2>
                                <span className="text">Are you sure you want to delete this movie?</span>
                                <div className="confirmation-btn-wrapper">
                                    <button type="button" className="button button-warning" onClick={confirmDeleteMovie}>Confirm</button>
                                </div>
                            </>
                        </Modal>
                        <Modal isOpen={modalsState.successModal}
                            toggleOpen={successModalHandler}
                            additionalClass={'aprooval-modal'}
                            position={Direction.Top}>

                            <>
                                <span className="ok-icon">
                                    <svg width="41" height="32" viewBox="0 0 41 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3 17.8347L13.1175 28L38 3" stroke="white" strokeWidth="5" strokeLinecap="round" />
                                    </svg>
                                </span>
                                <h2 className="title">congratulations !</h2>
                                <span className="text">The movie has been added to <br /> database successfully </span>
                            </>

                        </Modal>
                    </React.Suspense>
                    <MovieForm movieId={movieId} />
                </>
            }

            {isFetching &&
                <section className="container container--3 movie-card-container">
                    <MoveSceleton />
                </section>}

            {isError && <div>Server responed with an error....</div>}
        </>
    )
}