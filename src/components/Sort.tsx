import React, { useState } from "react"
import { DropDown } from "./Dropdown"

interface Props {
}


export const Sort: React.FC<Props> = () =>  {
    const [sortedArray, setSortedArray] = useState<string[]>(['one','two'])
    const [sortValue, setSortValue] = useState<string>(sortedArray[0])

    return (
        <div className="filter__sort">
            <span className="text">Sort by</span>
            <DropDown 
                items={sortedArray}
                defaultValue={sortValue}
                onChange={(value) => setSortValue(value)}
                />
        </div>
    )
}