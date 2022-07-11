import React from 'react'

export default function StartPage({startQuiz, difficultieArray, categories, tags, currentOption, setCurrentOption}) {

    function handler(e) {
        if (e.target.multiple) {
            if (currentOption[e.target.name].includes(e.target.value)) {
                setCurrentOption({...currentOption, [e.target.name]: currentOption[e.target.name].filter(category => category !== e.target.value)} )
            } else {
                setCurrentOption({...currentOption, [e.target.name]: currentOption[e.target.name].concat(e.target.value)})
            }
        } else {
            setCurrentOption({...currentOption, [e.target.name]: e.target.value})
        }
    }

    return (
        <div className='start-page-wrapper'>
            <h1>Quizzical</h1>
            <span>Some description if needed</span>
            <label htmlFor="difficultie">
                <span>Choose difficultie</span>
                <select name="difficultie" id="difficultie" value={currentOption.difficultie} onChange={handler}>
                    {difficultieArray.map(difficult => <option key={difficult} value={difficult} >{difficult}</option>)}
                </select>
            </label>
            <label htmlFor="categories">
                <span>Choose categories</span>
                <select name="categories" id="categories" value={currentOption.categories} onChange={handler} multiple>
                    {categories.map(category => <option key={category} value={category} >{category}</option>)}
                </select>
            </label>
            <label htmlFor="tags">
                <span>Choose tags</span>
                <select name="tags" id="tags" value={currentOption.tags} onChange={handler} multiple>
                    {tags.map(tag => <option key={tag} value={tag} >{tag}</option>)}
                </select>
            </label>
            <button onClick={startQuiz}>Start quiz</button>
        </div>
    )
}