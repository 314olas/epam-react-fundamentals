import React from "react"
import Loading from "../Loading"
import Modal from "../Modal"
import FormFormik from "./FormFormik"
import { toggleMovieFormModal } from "../../store/slices/modalsSlices"
import { useAppDispatch, useAppSelector } from "../hooks/app"

interface Props {
    movieId: number | undefined
}

const MovieForm: React.FC<Props> = ({ movieId }) => {
    const movieFormModal = useAppSelector((state) => state.modals.movieFormModal)
    const dispatch = useAppDispatch()

    return (
        <React.Suspense fallback={<Loading />}>
            <Modal isOpen={movieFormModal} toggleOpen={state => dispatch(toggleMovieFormModal(state))}>
                <FormFormik movieId={movieId} />
            </Modal>
        </React.Suspense>
    )
}

export default MovieForm
