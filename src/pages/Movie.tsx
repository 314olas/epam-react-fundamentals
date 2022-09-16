import React from 'react';
import { useLocation } from 'react-router-dom';
import MovieCardDescription from '../components/MovieCard/MovieCardDescription';
import { IMovie } from './../types';

export interface IMovieProps {
}

export default function Movie(props: IMovieProps) {

    const { state } = useLocation();

    return (
        <MovieCardDescription movie={state as IMovie} />
    );
}
