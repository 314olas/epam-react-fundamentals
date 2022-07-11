import React, {useState, useEffect} from 'react'
import StartPage from './StartPage';
import Question from './Question'
import './quiz.css'

export default function MainQuiz() {
    const difficultieArray = ['easy', 'medium', 'hard'];
    const [isStartedQuiz, setIsStartedQuiz] = useState(false);
    const [checkedAnswer, setCheckedAnswer] = useState(false)
    const [categories, setCategories] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [tags, setTags] = useState([]);
    const [currentOption, setCurrentOption] = useState({
        categories: [],
        tags: [],
        difficultie: difficultieArray[0],
        answers: [],
        correctAnswerCount: 0
    })

    useEffect(() => {
        fetch('https://the-trivia-api.com/api/categories')
            .then(res => res.json())
            .then(data => {
                const newcategories = Object.keys(data);
                setCategories(newcategories)
            });

        fetch('https://the-trivia-api.com/api/tags')
            .then(res => res.json())
            .then(data => setTags(data))

    }, [])

    const startQuiz = () => {
        setIsStartedQuiz(true);
        const chosenCategories = currentOption.categories.length ? 'categories=' + currentOption.categories.join(',').replaceAll(' ', '_').replace('&', 'and').toLocaleLowerCase() +'&' : ''
        const chosenTags = currentOption.tags.length ? '&tags=' + currentOption.tags.join(',') : ''
        fetch(`https://the-trivia-api.com/api/questions?${chosenCategories}limit=5&difficulty=${currentOption.difficultie}${chosenTags}`)
            .then(res => res.json())
            .then(data => {
                const arr = data.map(item => ({...item, selectedAnswer: '', correct: false}))
                setQuestions(arr)
            })
    }

    function chooseAnswer(id, answer) {
        if (checkedAnswer) return;
        const updatedArr = questions.map(question => {
            if (id === question.id) {
                question.selectedAnswer = answer
                question.correct = answer === question.correctAnswer
            }
            return question
        })

        setQuestions(updatedArr)
    }

    function checkAnswer() {
        setCheckedAnswer(prev => !prev)
        let correctAnswer = 0;
        questions.forEach(question => {
            if (question.correct)  correctAnswer++
        })

        setCurrentOption(prevCurrentOption => ({...prevCurrentOption, correctAnswerCount: correctAnswer}))
    }

    return (
        <>
            {!isStartedQuiz && <StartPage
                                    categories={categories}
                                    difficultieArray={difficultieArray}
                                    startQuiz={startQuiz}
                                    tags={tags}
                                    setCurrentOption={setCurrentOption}
                                    currentOption={currentOption} />}
            {isStartedQuiz &&
                    questions.map(question => <Question key={question.id}
                                                        data={question}
                                                        chooseAnswer={chooseAnswer}
                                                        checkedAnswer={checkedAnswer} />)
            }
            {isStartedQuiz && (
                                <div className='check-btn'>
                                    <button onClick={checkAnswer}>Check</button>
                                    <br />
                                    {checkedAnswer && currentOption.correctAnswerCount + '/' + questions.length  }
                                </div>
                                )}
        </>
    )
}