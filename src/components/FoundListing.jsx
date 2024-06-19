import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "./MovieCard/MovieCard";
import "./MovieListing/MovieListing";
import ShowCard from "./ShowCard";
import {
	setFoundMovies,
} from "../features/Movies/movieSlice";
import "../index.css";

function FoundListing(props) {
	const searchingPromt = useSelector((state) => state.movies.searchingPromt);
	const foundResults = useSelector((state) => state.movies.foundMovies);
	const dispatch = useDispatch();
	console.log(foundResults);

	const [pages, setPages] = useState([])
	const [currentPage, setCurrentPage] = useState(1)

	useEffect(() => {
		let pageNumbers = []
		for (let i = 1; i <= foundResults.total_pages; i++) {
			pageNumbers.push(i)
		}
		setPages(pageNumbers)
	}, [foundResults])

	function switchPages(pageNum) {
				fetch(
					`https://api.themoviedb.org/3/search/movie?query=${props.name}&api_key=0bf633ba86a7dcd730bf18d481aa851d&language=en-US&page=${pageNum}`
				)
					.then((res) => res.json())
					.then((data) => dispatch(setFoundMovies(data)));
		console.log(pageNum);
		setCurrentPage(pageNum)
		}	

	let renderPages = pages.map( pageNum => (
	<div className={`page-block${pageNum === currentPage ? '-selected' : ''}` } key={pageNum} onClick={(() => switchPages(pageNum))}>{pageNum}</div>
	))

	let renderMovies =
		foundResults.results?.length > 0 ? (
			foundResults.results.map((movie) => {
				return props.tag === "movies" ? (
					<MovieCard data={movie} key={movie.id} type="found" />
				) : (
					<ShowCard data={movie} key={movie.id} type="found" />
				);
			})
		) : (
			<p>Nothing found for '{searchingPromt}'</p>
		);
	
	


	return (
		<div className="found-wrapper">
			<div className="movie-list">
				<h2>
					FOUND{" "}
					{foundResults.total_results > 0
						? foundResults.total_results
						: "NO"}{" "}
					MATCHES FOR “{searchingPromt.toUpperCase()}”
				</h2>
				<div className="found-movies-container">{renderMovies}</div>
			</div>
				<div className="pages-wrapper"> {renderPages} </div>
		</div>
	);
}

export default FoundListing;
