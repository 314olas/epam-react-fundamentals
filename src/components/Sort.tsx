import React from "react"
import DropDown from "./Dropdown"
import { selectSortValue } from "../store/slices/movieSlices";
import { ISelectOption } from "../types";
import { useAppSelector, useAppDispatch } from './hooks/app';
import { StylesConfig } from "react-select";

interface Props {
}

export const Sort: React.FC<Props> = () => {
    const sortedArray = useAppSelector((state) => state.movie.sortedArray)
    const dispatch = useAppDispatch()
    const dropdownStyles: StylesConfig<ISelectOption, true> = {
        placeholder: () => ({}),
        singleValue: (provided) => ({
            ...provided,
            color: '#fff',
            textTransform: 'uppercase'
        }),
    }

    return (
        <div className="filter__sort">
            <span className="text">Sort by</span>
            <DropDown
                items={sortedArray.data}
                value={sortedArray.value}
                onChangeHandler={(value: ISelectOption) => dispatch(selectSortValue(value))}
                styles={dropdownStyles}
            />
        </div>
    )
}
