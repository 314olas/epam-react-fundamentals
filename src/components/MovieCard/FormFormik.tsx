import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import GridTamplate from '../layout/GridTamplate';
import DropdownFormik from '../formComponents/DropdownFormik';
import { IAddMovieForm, ICommonFormField, IMovie, ISelectOption, MovieActionEnum } from '../../types';
import { useAppDispatch, useAppSelector } from '../hooks/app';
import { toggleMovieFormModal, toggleSuccessModal } from '../../store/slices/modalsSlices';
import { useCreateMovieMutation, useUpdateMovieMutation } from '../../services/movieService';

import '../../styles/components/input.scss'

export interface IFormFormikProps {
    movieId: number | undefined
}

export default function FormFormik(props: IFormFormikProps) {
    const formFields = useAppSelector((state) => state.movie.formFields)
    const [formData, setFormData] = useState(Object.keys(formFields).reduce((acc: any, field: keyof IAddMovieForm) => {
        acc[field] = formFields[field].value
        return acc
    }, {}));

    const moviSlice = useAppSelector((state) => state.movie)
    const [updateMovie] = useUpdateMovieMutation()
    const [createcMovie] = useCreateMovieMutation()
    const dispatch = useAppDispatch()

    const generateFormField = (field: ICommonFormField) => {
        if (field.typeField === 'dropdown') {
            return <Field
                        id={field.name}
                        name={field.name}
                        className='dropdown'
                        component={DropdownFormik}
                        options={field.data}
                        placeholder='select a value'
                        isMulti={field.multiply}
                    >
                    </Field>
        }
        return <Field
                    type={field.typeField || 'text'}
                    id={field.name}
                    name={field.name}
                    placeholder={field.placeholder || ''}
                    className='input' />
    }

    const onSubmit = async (values: any) => {
        const movie: IMovie = {
            title: values.title as string,
            tagline: values.tagline as string,
            vote_average: +values.vote_average,
            vote_count: +values.vote_count,
            release_date: values.release_date as string,
            poster_path: values.poster_path as string,
            overview: values.overview as string,
            budget: +values.budget,
            revenue: +values.revenue,
            genres: (values.genres as ISelectOption[]).map(genre => genre.value),
            runtime: +values.runtime,
        }

        if (moviSlice.movieActions.value[0]?.value === MovieActionEnum.Edit) {
            movie.id = props.movieId as number

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
        else {
            try {
                const res: any = await createcMovie(movie)
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
    }


    const validate = (values: any) => {

        const errors: any = {}

        Object.keys(values).forEach(key => {

            if (!values[key]) {
                errors[key] = 'Required'
            }
            if (Array.isArray(values[key]) && !values[key].length) {
                errors[key] = 'Required'
            }
        })

        return errors
    }

    return (
        <Formik onSubmit={onSubmit}
            initialValues={formData}
            validate={validate}>
            {({ isValid, errors, handleReset }) => (
                <Form>
                    <div className="add-movie-form">
                        <GridTamplate columnCount={2} additionalClasses={'form-field-grid'}>
                            {Object.keys(formFields).map((field: keyof IAddMovieForm) => {
                                return (
                                    <div key={field.toString()} className={[
                                        'form-field',
                                        formFields[field].typeField === 'textarea' ? 'textarea' : ''
                                    ].join(' ')}>
                                        <label className='input-label' htmlFor={field}>{formFields[field].label}</label>
                                        {generateFormField(formFields[field])}
                                        <span>{errors && errors[field] as string}</span>
                                    </div>
                                )
                            })}

                        </GridTamplate>
                        <div className="button_wrapper">
                            <button className="button" type='reset' onClick={handleReset}>reset</button>
                            <button className="button button-outline" type='submit' disabled={!isValid}>submit</button>
                        </div>
                    </div>

                </Form>
            )}

        </Formik>
    );
}

