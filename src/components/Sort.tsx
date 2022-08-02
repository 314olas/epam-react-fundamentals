import React, { useState } from "react"
import { IDropdownData } from "../types"
import DropDown from "./Dropdown"
import { ToggleSortedArray, toggleSortedArray } from "./Globaltate"

interface Props {
    sortedArray: IDropdownData[],
    setSortValue: (value: ToggleSortedArray) => void
}

export const Sort: React.FC<Props> = ({sortedArray, setSortValue}) =>  {

    return (
        <div className="filter__sort">
            <span className="text">Sort by</span>
            <DropDown 
                items={sortedArray}
                onChangeHandler={(value) => setSortValue(toggleSortedArray(value))}
                />
        </div>
    )
}
