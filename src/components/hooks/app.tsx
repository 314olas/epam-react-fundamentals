import React from "react"
import { IDropdownData, Movie } from "../../types"
import { addGenre, addMovies, globalReducer, initialState } from "../Globaltate";

export default function useApp() {

    const [state, dispatch] = React.useReducer(
        globalReducer,
        initialState
    );

    React.useEffect(() => {
        const genre: IDropdownData[] = [
            {name: 'all', isActive: true},
            {name: 'Documentary', isActive: false},
            {name: 'Comedy', isActive: false},
            {name: 'Horror', isActive: false},
            {name: 'crime', isActive: false}
        ]
        const initialMovieList: Movie[] = [
            {
                id: 1,
                name: 'Pulp Fiction1',
                genre: 'Action & Adventure',
                imgUrl: '',
                year: '2004',
                movieUrl: '',
                rating: '5.0',
                runtime: '50',
                overview: 'Jules Winnfield (Samuel L. Jackson) and Vincent Vega (John Travolta) are two hit men who are out to retrieve a suitcase stolen from their employer, mob boss Marsellus Wallace (Ving Rhames). Wallace has also asked Vincent to take his wife Mia (Uma Thurman) out a few days later when Wallace himself will be out of town. Butch Coolidge (Bruce Willis) is an aging boxer who is paid by Wallace to lose his fight. The lives of these seemingly unrelated people are woven together comprising of a series of funny, bizarre and uncalled-for incidents.—Soumitra'
            },
            {
                id: 2,
                name: 'Pulp Fiction2',
                genre: 'Action & Adventure, blah',
                imgUrl: '',
                year: '2004',
                movieUrl: '',
                rating: '5.0',
                runtime: '50'
            },
            {
                id: 3,
                name: 'Pulp Fiction3',
                genre: 'Action & Adventure',
                imgUrl: '',
                year: '2004',
                movieUrl: '',
                rating: '5.5',
                runtime: '50'
            },
            {
                id: 4,
                name: 'Pulp Fiction4',
                genre: 'Action & Adventure',
                imgUrl: '',
                year: '2004',
                movieUrl: '',
                rating: '5.7',
                runtime: '50'
            }
        ]
        dispatch(addGenre(genre))
        dispatch(addMovies(initialMovieList))
    }, [])

    return {state, dispatch}
}