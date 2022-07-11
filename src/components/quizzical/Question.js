import React from 'react'

export default function Question({data, chooseAnswer, checkedAnswer}) {
    const answers = [data.correctAnswer, ...data.incorrectAnswers]

    return (
        <>
            <h2>{data.question}</h2>
            {answers.map(answer => <button 
                                        onClick={() => chooseAnswer(data.id, answer)} 
                                        key={answer} 
                                        className={
                                            [
                                                data.selectedAnswer === answer ? 'selected ' : '',
                                                checkedAnswer && data.correct ? 'correct ' : 'incorrect ',
                                                // checkedAnswer && data.selectedAnswer === answer && data.selectedAnswer !== data.correctAnswer ? 'incorrect ' : '',
                                                // checkedAnswer && data.selectedAnswer === answer && data.selectedAnswer === data.correctAnswer ? 'correct ' : '',
                                                // checkedAnswer && data.correctAnswer === answer ? 'selected correct ' : ''

                                            ].join('')}>
                                            {answer}
                                    </button>)}
        </>
    )
}