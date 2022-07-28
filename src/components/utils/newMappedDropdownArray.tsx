import {IDropdownData} from "../../types"

export const returnNewMappedDropdownArray = (item: IDropdownData, name: string) => {
    if (item.isActive && item.name !== name) {
        item.isActive = false
    } else if (item.name == name) {
        item.isActive = true
    }
    return item
}