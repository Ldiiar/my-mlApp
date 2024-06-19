import React from "react";
import FoundListing from "./FoundListing";
import { useDispatch, useSelector } from "react-redux";
import {
	setFoundMovies,
	setSearchingPromt,
} from "../features/Movies/movieSlice";
import { Link, useParams } from "react-router-dom";
import MobSearchBar from "./SearchBar/MobSearchBar";

function FoundShows() {
	const dispatch = useDispatch();
	const { name } = useParams();

	function encode(text) {
		return text.replace("%20", " ");
	}

	let encodedName = encode(name);

	React.useEffect(() => {
		dispatch(setSearchingPromt(encodedName));
		fetch(
			`https://api.themoviedb.org/3/search/tv?query=${name}&api_key=0bf633ba86a7dcd730bf18d481aa851d&language=en-US&page=1`
		)
			.then((res) => res.json())
			.then((data) => dispatch(setFoundMovies(data)));
	}, [name]);
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
				<Link to={`/search/movies/${name}`}>
					<span>Movies</span>
				</Link>
				<span className="search-chosen">Shows</span>
			</div>
			{foundResults && foundResults.results?.length > 0 ? (
				<FoundListing tag={"shows"} />
				) : (
					<p>loading</p>
					)}
		</div>
	</>
	);
}

export default FoundShows;
