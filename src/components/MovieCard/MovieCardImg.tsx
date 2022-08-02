
import React from "react"
import defaultImg from '../../images/noimagelarge.png'

interface Props {
    imgUrl?: string,
    alt?: string
}

const MovieCardImg: React.FC<Props> = ({imgUrl, alt}) =>  {

    return (
        <img src={imgUrl || defaultImg} alt={alt || 'image alt'} />
    )
}

export default MovieCardImg


