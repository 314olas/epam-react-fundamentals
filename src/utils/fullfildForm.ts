import { initialFormValue } from '../store/slices/movieSlices';
import { IAddMovieForm, IMovie } from '../types';

export const fullfildForm = (movie: IMovie): IAddMovieForm => {
    return {...initialFormValue,
                title: {...initialFormValue.title, value: movie.title},
                tagline: {...initialFormValue.tagline, value: movie.tagline},
                budget: {...initialFormValue.budget, value: movie.budget},
                genres: {...initialFormValue.genres, value: movie.genres},
                release_date: {...initialFormValue.release_date, value: movie.release_date},
                vote_count: {...initialFormValue.vote_count, value: movie.vote_count},
                poster_path: {...initialFormValue.poster_path, value: movie.poster_path},
                overview: {...initialFormValue.overview, value: movie.overview},
                vote_average: {...initialFormValue.vote_average, value: movie.vote_average},
                runtime: {...initialFormValue.runtime, value: movie.runtime},
                revenue: {...initialFormValue.genres, value: movie.revenue}
            }
}