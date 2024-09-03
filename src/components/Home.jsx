import React, { Suspense } from "react";
import MovieListing from "./MovieListing/MovieListing";
import { useDispatch } from "react-redux";
import {
	addMovies,
	addUpcomingMovies,
	addShows,
} from "../features/Movies/movieSlice";
import MobSearchBar from  "./SearchBar/MobSearchBar";
import Loading from './common/Loading';


const Home = () => {
	const [inputValue, setInputValue] = React.useState("");
	const handleInputChange = (event) => {
		setInputValue(event.target.value);
	};
	const dispatch = useDispatch();
	React.useEffect(() => {
		function fetchMovies() {
			fetch(
				"https://api.themoviedb.org/3/movie/popular?api_key=0bf633ba86a7dcd730bf18d481aa851d&language=en-US"
			)
				.then((res) => res.json())
				.then((data) => dispatch(addMovies(data)));
		}
		fetchMovies();

		function fetchUpcoming() {
			fetch(
				"https://api.themoviedb.org/3/movie/upcoming?api_key=0bf633ba86a7dcd730bf18d481aa851d&language=en-US&page=1"
			)
				.then((res) => res.json())
				.then((data) => dispatch(addUpcomingMovies(data)));
		}
		fetchUpcoming();

		function fetchShows() {
			fetch(
				"https://api.themoviedb.org/3/tv/popular?api_key=0bf633ba86a7dcd730bf18d481aa851d&language=en-US&page=1"
			)
				.then((res) => res.json())
				.then((data) => dispatch(addShows(data)));
		}
		fetchShows();
	}, []);

	return (
		<div className="container container-home">
			<MobSearchBar /> 
			<Suspense fallback={<Loading />}>
				<MovieListing />
			</Suspense>
		</div>
	);
};

export default Home;
