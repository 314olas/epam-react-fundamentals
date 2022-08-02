import React, { createContext } from "react";
import { Actions, IGlobalContextInterface, initialState } from '../Globaltate';
import useApp from "../hooks/app";

export interface IAppContext {
    state: IGlobalContextInterface,
    dispatch?: React.Dispatch<Actions>
}

export const AppContext = createContext<IAppContext>({
    state: initialState
})

export interface Props {
    children: React.ReactNode
}

const AppState: React.FC<Props> = ({children}) => {

    const {state, dispatch} = useApp();

    return (
        <AppContext.Provider value={{state, dispatch}}>
            {children}
        </AppContext.Provider>
    )
}

export default AppState
