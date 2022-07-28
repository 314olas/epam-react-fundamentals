import React from "react"
import "../../styles/components/grid-tamplate.scss"


interface Props {
    children: React.ReactElement[],
    columnCount?: number,
    additionalClasses?: string
}

const GridTamplate = ({children, columnCount, additionalClasses}: Props): React.ReactElement =>  {

    return (
        <div className={['grid-tamplate',
                        columnCount ? 'grid-column-' + columnCount : '',
                        additionalClasses
                        ].join(' ')}>
            {children}
        </div>
    )
}

export default GridTamplate