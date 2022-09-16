import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Categories } from '../components/CategorIes';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { useAppSelector } from '../components/hooks/app';
import { MovieCards } from '../components/MovieCard/MovieCards';
import { Sort } from '../components/Sort';

export interface ISearchProps {
}

export default function Search(props: ISearchProps) {
	const defaultParamsQuery = useAppSelector((state) => state.movie.movieParamsQuery)
	const [search, setSearch] = useSearchParams()
	const allParams = {
		...defaultParamsQuery,
		...Object.fromEntries([...search])
	}

	useEffect( () => {
		setSearch(allParams)
	}, [])

	return (
		<main className="content">
			<div className="filter">
				<Categories />
				<Sort />
			</div>
			<ErrorBoundary>
				<MovieCards params={allParams}/>
			</ErrorBoundary>
		</main>
	);
}
