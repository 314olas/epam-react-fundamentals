import React, { useContext } from "react"
import { IAddMovieForm, Movie } from "../../types"
import {AppContext} from "../context/AppContext"
import { addMovie, apdateFormField, resetFormFields, toggleAproovalModal, updateFormValidation, toggleMovieModal } from '../Globaltate';
import InputCompenent from "../InputComponent"
import GridTamplate from "../layout/GridTamplate"
import { validateForm } from "../utils/validateForm"

interface Props {
}

const MovieForm: React.FC<Props> = () =>  {
    const {state, dispatch} = useContext(AppContext)

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
        dispatch(toggleMovieModal(false))
        dispatch(addMovie(newMovie))
        dispatch(toggleAproovalModal(true))
        dispatch(resetFormFields())
    }

    return (
        <>
            <form className="add-movie-form">
                <GridTamplate columnCount={2} additionalClasses={'form-field-grid'}>
                {Object.keys(state.formFields).map((field: keyof IAddMovieForm) => {
                    return <InputCompenent key={field}
                                            value={state.formFields[field].value}
                                            type={state.formFields[field].typeField || ''}
                                            nameAttr={field}
                                            label={state.formFields[field].label || ''}
                                            placeholder={state.formFields[field].placeholder || ''}
                                            step={state.formFields[field].step || 0}
                                            data={state.formFields[field].data || null}
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
        </>
    )
}

export default MovieForm