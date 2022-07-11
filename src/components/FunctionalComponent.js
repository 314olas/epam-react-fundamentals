import React, { useEffect, useState } from 'react'

export default function FunctionalComponent () {
    const [counterValue, setCounterValue] = useState(1)
    const [starWarsData, setStarWarsData] = useState({})

    useEffect(() => {
        fetch(`https://swapi.dev/api/people/${counterValue}`)
            .then(res => res.json())
            .then(data => setStarWarsData(data))
        
    }, [counterValue])

    const counterHandler = (val) => {
        setCounterValue(prev => prev + val < 0 ? 0 : prev + val)
    }

    return (
        <div>
            <h2>FunctionalComponent</h2>
            <p>{counterValue}</p>
            <button onClick={() => counterHandler(1)}>+</button>
            <button onClick={() => counterHandler(-1)}>-</button>
            <pre>{JSON.stringify(starWarsData, null, 2)}</pre>
        </div>
    )
}