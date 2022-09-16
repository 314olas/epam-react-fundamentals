import React from "react"
import { useSearchParams } from "react-router-dom";
import { selectGenre } from "../store/slices/movieSlices";
import { useAppSelector, useAppDispatch } from './hooks/app';

interface Props {
}

export const Categories: React.FC<Props> = () =>  {
    const genres = useAppSelector(state => state.movie.genres)
    const dispatch = useAppDispatch();
    const [search, setSearch] = useSearchParams()

    const clickHandler = (e: React.MouseEvent<HTMLAnchorElement>, category: string) => {
        e.preventDefault()
        dispatch(selectGenre(category))
        if (category && category === 'all') {
            search.set('filter', '')
            setSearch(search)
        } else {
            search.set('filter', category)
            setSearch(search)
        }
    }

    return (
        <ul className="filter__category-list">
            {genres.data.map(category => {
                return <li className={['item', genres.value.includes(category) ? 'active': ''].join(' ')} key={category}>
                            <a className="link" onClick={(e) => clickHandler(e, category)}>{category}</a>
                        </li>
            })}
        </ul>
    )
}