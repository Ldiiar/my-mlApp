import React from "react";
import MovieListing from "./MovieListing/MovieListing";
import { useDispatch } from "react-redux";
import {
	addMovies,
	addUpcomingMovies,
	addShows,
} from "../features/Movies/movieSlice";
import MobSearchBar from  "./SearchBar/MobSearchBar";

const Home = () => {
	const [inputValue, setInputValue] = React.useState("");
	const handleInputChange = (event) => {
		setInputValue(event.target.value);
	};
	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(addMovies())
		dispatch(addUpcomingMovies())
		dispatch(addShows())
	}, []);

	return (
		<div className="container container-home">
			<MobSearchBar /> 
			<MovieListing />
		</div>
	);
};

export default Home;
