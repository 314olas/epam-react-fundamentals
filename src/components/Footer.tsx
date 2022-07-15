import React from "react"

interface FooterProps {
    children?: React.ReactElement<any, any>
}


export const Footer: React.FC<FooterProps> = ({children}) =>  {

    return (
        <footer className="footer">
            {children}
        </footer>
    )
}