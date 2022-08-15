import React, { createContext } from "react";
import { IGlobalContextInterface } from "../../types";

export const AppContext = createContext({
    
})

export interface Props {
    children: React.ReactNode
}

const AppState: React.FC<Props> = ({children}) => {

    return (
        <AppContext.Provider value={{}}>
            {children}
        </AppContext.Provider>
    )
}

export default AppState
