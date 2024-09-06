import React from "react";
import { useSelector } from "react-redux";
import MovieCard from "../MovieCard/MovieCard";
import "./MovieListing.css";
import ShowCard from "../ShowCard";

import { Settings } from "../common/slickSettings";
import { mobSettings } from "../common/slickForMob";
import { tabSettings } from "../common/slickForTab";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Loading from '../common/Loading';

const MovieListing = () => {
	const movies = useSelector((state) => state.movies.movies.results);
	const upcoming = useSelector(
		(state) => state.movies.upcomingMovies.results
	);
	const shows = useSelector((state) => state.movies.shows.results);
	///
	let renderMovies =
		movies && movies.length > 0 ? (
			movies.map((movie) => {
				return <MovieCard data={movie} key={movie.id} />;
			})
		) : (
			<p></p>
		);
	///
	let renderUpcoming =
		upcoming && upcoming.length > 0 ? (
			upcoming.map((movie) => {
				return <MovieCard data={movie} key={movie.id} />;
			})
		) : (
			<p></p>
		);
	///
	let renderShows =
		shows && shows.length > 0 ? (
			shows.map((show) => {
				return <ShowCard data={show} key={show.id} />;
			})
		) : (
			<p></p>
		);
	///

	function renderLists(movieList) {
		return (
			<div className="movie-container">
				<div className="mobSlider">
					<Slider {...mobSettings}> {movieList} </Slider>
				</div>
				<div className="tabSlider">
					<Slider {...tabSettings}> {movieList} </Slider>
				</div>
				<div className="deckSlider">
					<Slider {...Settings}> {movieList} </Slider>
				</div>
			</div>
		);
	}

	if (!movies || !upcoming || !shows) {
		return <Loading />
	  }
	  
	return (
		<div className="movie-wrapper">
			<div className="movie-list">
				<h2>Popular this week</h2>
				{renderLists(renderMovies)}
			</div>
			<div className="movie-list">
				<h2>Suggestions </h2>
				{renderLists(renderUpcoming)}
			</div>
			<div className="movie-list">
				<h2>Shows </h2>
				{renderLists(renderShows)}
			</div>
		</div>
	);
};

export default MovieListing;
