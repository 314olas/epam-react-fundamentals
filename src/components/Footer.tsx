import React from "react"

interface Props {
    children?: React.ReactElement<any, any>
}


export const Footer: React.FC<Props> = ({children}) =>  {

    return (
        <footer className="footer">
            {children}
        </footer>
    )
}