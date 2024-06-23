import React, { useEffect } from "react";
import FoundListing from "./FoundListing";
import { useDispatch, useSelector } from "react-redux";

import {
	setFoundMovies,
	setSearchingPromt,
} from "../features/Movies/movieSlice";
import { Link, useParams } from "react-router-dom";
import "../index.css";
import MobSearchBar from "./SearchBar/MobSearchBar";

const FoundMovies = () => {
const { name } = useParams();	

const dispatch = useDispatch();

function encode(text) {
    return text.replace("%20", " ");
}

function searchPromt(name) {
		useEffect(() => {
			dispatch(setSearchingPromt(encode(name)));
			fetch(
				`https://api.themoviedb.org/3/search/movie?query=${name}&api_key=0bf633ba86a7dcd730bf18d481aa851d&language=en-US&page=1`
			)
				.then((res) => res.json())
				.then((data) => dispatch(setFoundMovies(data)));
		}, [name]);
	}
	searchPromt(name)


	const foundResults = useSelector((state) => state.movies.foundMovies);
	{
		console.log(foundResults);
	}

	return (
		<>
			<MobSearchBar /> 
		<div className="container container-searchPage">
			<div className="revs-descriprion">
				<p className="reviews-of">Results of </p>
				<span className="found-movieName">"{name}" </span>
			</div>
			<div className="search-category">
				<span className="search-chosen">Movies</span>
				<Link to={`/search/shows/${name}`}>
					<span>Shows</span>
				</Link>
			</div>
			{foundResults && foundResults.results?.length > 0 ? (
				<FoundListing tag={"movies"} name={name}/>
				) : (
					<div className="movie-list">
						<h2> FOUND 0 MATCHES </h2>
					</div>
					)}
		</div>
	</>
	);
};

export default FoundMovies;
