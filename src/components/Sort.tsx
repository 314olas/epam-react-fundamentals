import React from "react"
import DropDown from "./Dropdown"
import { ISelectOption } from "../types";
import { useAppSelector } from './hooks/app';
import { StylesConfig } from "react-select";
import { useSearchParams } from "react-router-dom";

interface Props {
}

export const Sort: React.FC<Props> = () => {
    const sortedArray = useAppSelector((state) => state.movie.sortedArray)
    const [search, setSearch] = useSearchParams()

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
                onChangeHandler={(value: ISelectOption) => {
                    search.set('sortBy', value.value)
                    setSearch(search)}
                }
                styles={dropdownStyles}
            />
        </div>
    )
}
