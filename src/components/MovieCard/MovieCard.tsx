import React from "react"
import { components, StylesConfig } from "react-select"
import { useSearchParams } from "react-router-dom"
import DropDown from "../Dropdown"
import MovieCardImg from "./MovieCardImg"
import { IMovie, ISelectOption, IToggleAction, MovieActionEnum } from "../../types"

interface Props {
    movies: IMovie[],
    selectMovieHandler: (movie: IMovie) => void,
    toggleMovieAction: (action: IToggleAction, movie: IMovie) => void,
    actions: ISelectOption[]
}

export const MovieCard: React.FC<Props> = ({movies, actions, toggleMovieAction}) =>  {
    const [search, setSearch] = useSearchParams()

    const clickHandler = (e: React.MouseEvent<HTMLAnchorElement>, movie: IMovie) => {
        e.preventDefault();
        search.set('movie', String(movie.id))
        setSearch(search)
    }

    const dropdownStyles: StylesConfig<ISelectOption, true> = {
        valueContainer: () => ({display: 'none'}),
        control: (provided, state) => ({
            ...provided,
            backgroundColor: '#232323',
            height: '36px',
            width: '36px',
            borderColor: state.menuIsOpen ? 'transparent' : 'transparent',
            borderRadius: '4px',
            color: '#fff',
            "&:hover": {
                borderColor: 'transparent',
            },
            boxShadow: 'none'
        }),
        indicatorsContainer: (provided) => ({
            ...provided,
            padding: 0
        })
    }

    const DropdownIndicator = (props: any) => {
        return (
            <components.DropdownIndicator {...props}>
                <span>...</span>
            </components.DropdownIndicator>
        );
    };

    return (
        <>
            {movies.map(movie => {
                return (
                    <article className="movie-card" key={movie.title} data-id={movie.id}>
                        <div className="image-wrapper">
                            <a href="#" title={movie.title} onClick={(e) => clickHandler(e, movie)}>
                                <MovieCardImg imgUrl={movie.poster_path} />
                            </a>
                            <DropDown
                                className={'movie-card__more'}
                                items={actions}
                                value={null}
                                styles={dropdownStyles}
                                customComponents={{DropdownIndicator: DropdownIndicator}}
                                onChangeHandler={(value: ISelectOption) => toggleMovieAction({value: value.value as MovieActionEnum, id: movie.id}, movie)}
                            />
                        </div>
                        <footer className="movie-card__footer">
                            <div className="text-content">
                                <h4 className="movie-name">{movie.title}</h4>
                                <span className="movie-category">{movie.genres.join(', ')}</span>
                            </div>
                            <span className="year-label">
                                {movie.release_date.split('-')[0]}
                            </span>
                        </footer>
                    </article>
                )
            })}
        </>
    )
}
