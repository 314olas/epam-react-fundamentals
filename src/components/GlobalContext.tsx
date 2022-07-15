import React from "react"



export const initialState = {
    dropdown: {
        isOpenOne: false,
        isAddedDocumentHandler: false
    }
}

export type GlobalContextInterface = typeof initialState;

export const TOOGLE_OPEN_DROPDOWN_STATE = 'toogleOpenDropdownState'
export const TOGGLE_DROPDOWN_ADDED_HANDLER_STATE = 'toggleDropdownAddedHandlerState'

export interface Action {
    type: ( typeof TOOGLE_OPEN_DROPDOWN_STATE | typeof TOGGLE_DROPDOWN_ADDED_HANDLER_STATE),
    payload?: boolean
}

export function toggleDropdownOpenState(value: boolean): Action {
    return {
        type: TOOGLE_OPEN_DROPDOWN_STATE,
        payload: value
    }
}

export function toggleDropdownAddedHandlerState(value: boolean): Action {
    return {
        type: TOGGLE_DROPDOWN_ADDED_HANDLER_STATE,
        payload: value
    }
}

export function globalReducer(state: GlobalContextInterface, action: Action): GlobalContextInterface {
    switch (action.type) {
        case TOOGLE_OPEN_DROPDOWN_STATE:
            return {...state, dropdown: {...state.dropdown, isOpenOne: action.payload}};
        case TOGGLE_DROPDOWN_ADDED_HANDLER_STATE:
            return {...state, dropdown: {...state.dropdown, isAddedDocumentHandler: action.payload}};
        default:
            return state
      }
}

// const [state, dispatch] = React.useReducer(
//     globalReducer,
//     initialState
// );

