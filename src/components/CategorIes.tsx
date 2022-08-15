import React from "react"
import { selectGenre, selectMovieParamsQuery } from "../store/slices/movieSlices";
import { IDropdownData, IObjectKey } from '../types';
import { useAppSelector, useAppDispatch } from './hooks/app';

interface Props {
}

export const Categories: React.FC<Props> = () =>  {
    const genres = useAppSelector(state => state.movie.genres)
    const dispatch = useAppDispatch();

    const clickHandler = (e: React.MouseEvent<HTMLAnchorElement>, category: IDropdownData) => {
        e.preventDefault()
        dispatch(selectGenre(category))
        if (category.length === 1 && category[0] === 'all') {
            dispatch(selectMovieParamsQuery({param: 'filter', value: ['']}))
        } else {
            dispatch(selectMovieParamsQuery({param: 'filter', value: [category]}))
        }
    }

    return (
        <ul className="filter__category-list">
            {genres.data.map(category => {
                return <li className={['item', genres.value.includes(category) ? 'active': ''].join(' ')} key={category}>
                            <a className="link" onClick={(e) => clickHandler(e, [category])}>{category}</a>
                        </li>
            })}
        </ul>
    )
}