import React from "react"

interface Props {
    list: string[]
}

export const Categories: React.FC<Props> = ({list}) =>  {

    return (
        <ul className="filter__category-list">
            {list.map(category => {
                return <li className={['item', category === 'all' ? 'active': ''].join(' ')} key={category}><a className="link">{category}</a></li>
            })}
        </ul>
    )
}