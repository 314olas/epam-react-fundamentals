import React from "react"
import { useCreateMovieMutation, useUpdateMovieMutation } from "../../services/movieService"
import { toggleSuccessModal, toggleMovieFormModal } from "../../store/slices/modalsSlices";
import { resetFormFeilds, updateFormField } from "../../store/slices/movieSlices"
import { IAddMovieForm, IUpdateFormField, IMovie, IErrorResponse } from '../../types';
import { useAppDispatch, useAppSelector } from "../hooks/app"
import InputCompenent from "../InputComponent"
import GridTamplate from "../layout/GridTamplate"
import Loading from "../Loading";
import Modal from "../Modal";

interface Props {
    movieId: number | undefined
}

const MovieForm: React.FC<Props> = ({ movieId }) => {
    const formFields = useAppSelector((state) => state.movie.formFields)
    const movieFormModal = useAppSelector((state) => state.modals.movieFormModal)
    const formValidation = useAppSelector((state) => state.movie.formValidation)
    const [createcMovie] = useCreateMovieMutation()
    const [updateMovie, { isLoading: isUpdateMovie }] = useUpdateMovieMutation()
    const dispatch = useAppDispatch()

    const onChangeHandler = (data: IUpdateFormField) => {
        dispatch(updateFormField({ name: data.name, value: data.value }))
    }

    const resetHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        dispatch(resetFormFeilds())
    }

    const submitHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        e.stopPropagation()
        const movie: IMovie = {
            id: movieId as number,
            title: formFields.title.value as string,
            tagline: formFields.tagline.value as string,
            vote_average: +formFields.vote_average.value,
            vote_count: +formFields.vote_count.value,
            release_date: formFields.release_date.value as string,
            poster_path: formFields.poster_path.value as string,
            overview: formFields.overview.value as string,
            budget: +formFields.budget.value,
            revenue: +formFields.revenue.value,
            genres: formFields.genres.value as Array<string>,
            runtime: +formFields.runtime.value,
        }

        try {
            const res: any = await updateMovie(movie)
            console.log('res:', res)
            
            if (!res.error) {
                dispatch(toggleMovieFormModal(false))
                dispatch(toggleSuccessModal(true))
            } else {
                console.log('res.error:', res.error)
            }

        } catch (error) {
            console.log('error:', error)
        }
    }

    return (
        <>
            <React.Suspense fallback={<Loading />}>
                <Modal isOpen={movieFormModal} toggleOpen={state => dispatch(toggleMovieFormModal(state))}>

                    {isUpdateMovie ?
                        <Loading /> :
                        <form className="add-movie-form">
                            <GridTamplate columnCount={2} additionalClasses={'form-field-grid'}>
                                {Object.keys(formFields).map((field: keyof IAddMovieForm) => {
                                    return <InputCompenent key={field}
                                        value={formFields[field].value}
                                        type={formFields[field].typeField || ''}
                                        nameAttr={field}
                                        label={formFields[field].label || ''}
                                        placeholder={formFields[field].placeholder || ''}
                                        step={formFields[field].step || 0}
                                        data={formFields[field].data || null}
                                        className={formFields[field].typeField === 'textarea' ? 'textarea' : ''}
                                        multiply={formFields[field].multiply ? formFields[field].multiply : false}
                                        onChange={(value) => onChangeHandler({ name: field, value: value })} />
                                })}
                            </GridTamplate>
                            <div className="button_wrapper">
                                <button className="button" onClick={resetHandler}>reset</button>
                                <button className="button button-outline" onClick={submitHandler} disabled={false}>submit</button>
                            </div>
                        </form>
                    }

                </Modal>
            </React.Suspense>

        </>
    )
}

export default MovieForm
