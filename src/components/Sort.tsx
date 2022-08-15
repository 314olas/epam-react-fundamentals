import React from "react"
import { selectSortValue } from "../store/slices/movieSlices";
import DropDown from "./Dropdown"
import { useAppSelector, useAppDispatch } from './hooks/app';

interface Props {
}

export const Sort: React.FC<Props> = () => {
    const sortedArray = useAppSelector((state) => state.movie.sortedArray)
    const dispatch = useAppDispatch()

    return (
        <div className="filter__sort">
            <span className="text">Sort by</span>
            <DropDown
                items={sortedArray.data}
                value={sortedArray.value}
                onChangeHandler={(value) => dispatch(selectSortValue(value))}
            />
        </div>
    )
}
