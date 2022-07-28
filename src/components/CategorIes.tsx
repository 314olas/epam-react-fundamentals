import React from "react"
import { IDropdownData } from "../types"
import { toggleGenre, ToggleGenreInterface } from "./Globaltate"

interface Props {
    list: IDropdownData[],
    selectHandler: (category: ToggleGenreInterface) => void
}

export const Categories: React.FC<Props> = ({list, selectHandler}) =>  {

    const clickHandler = (e: React.MouseEvent<HTMLAnchorElement>, category: IDropdownData) => {
        e.preventDefault()
        selectHandler(toggleGenre(category.name))
    }

    return (
        <ul className="filter__category-list">
            {list.map(category => {
                return <li className={['item', category.isActive ? 'active': ''].join(' ')} key={category.name}>
                            <a className="link" onClick={(e) => clickHandler(e, category)}>{category.name}</a>
                        </li>
            })}
        </ul>
    )
}