import * as React from 'react';
import { useAppSelector } from '../hooks/app';
import '../../styles/components/movie-sceleton.scss'

export interface IMoveSceletonProps {
}

export default function MoveSceleton(props: IMoveSceletonProps) {

    const movieAmount = useAppSelector(state => state.movie.movieParamsQuery.limit)

    return (
        <>
            {
                [...Array(movieAmount).keys()].map(number => {
                    return (
                        <article className="movie-card movie-card-skeleton" key={number.toString()}>
                            <div className="image-wrapper">
                            </div>
                            <footer className="movie-card__footer">
                                <div className="text-content">
                                    <h4 className="movie-name"></h4>
                                    <span className="movie-category"></span>
                                </div>
                                <span className="year-label"></span>
                            </footer>
                        </article>
                    )
                })
            }

        </>
    );
}
