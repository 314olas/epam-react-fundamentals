import React, {useState, useEffect} from 'react'

export default function Tenzies() {
    const [dice, setDice] = useState(allNewDice())
    const [tenzies, setTenzies] = useState(false)

    useEffect(() => {
        const isFinish = dice.every(die => die.isHeld)
        if (isFinish) setTenzies(true)
    }, [dice])

    function generateDie() {
        return {value: Math.ceil(Math.random() * 6), isHeld: false, id: String.fromCharCode(65 + Math.floor(Math.random() * 26))+ String.fromCharCode(65 + Math.floor(Math.random() * 26))}
    }

    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateDie())
        }
        return newDice
    }

    function rollDice() {
        if (tenzies) {
            setDice(allNewDice())
        } else {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? die : generateDie()
            }))
        }
    }

    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? {...die, isHeld: !die.isHeld} : die
        }))
    }

    const diceElements = dice.map((die, i) => <li onClick={() => holdDice(die.id)} className={die.isHeld ? 'tenz-item active' : 'tenz-item'} key={i}>{die.value}</li>)

    return (
        <div>
            <p>{tenzies ? 'done' : 'try'}</p>
            <ul className='tenz-list'>
                {diceElements}
            </ul>
            <button onClick={rollDice}>Roll</button>
        </div>
    )
}
