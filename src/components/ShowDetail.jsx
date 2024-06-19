import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	addReviews,
	addSelectedOne,
	addTrailerLink,
	removeSelectedOne,
} from "../features/Movies/movieSlice";
import { nanoid } from "@reduxjs/toolkit";
import ReviewElement from "./Reviews/ReviewEl";
import { Link, Outlet } from "react-router-dom";
import trailerIcon from "../assets/trailer-icon.png";

const ShowDetail = () => {
	const showDetails = useSelector((state) => state.movies.selectedOne);
	const allReviews = useSelector((state) => state.movies.reviews.results);

	const { id } = useParams();
	const dispatch = useDispatch();
	useEffect(
		function fetchShowDetail() {
			fetch(
				`https://api.themoviedb.org/3/tv/${id}?api_key=0bf633ba86a7dcd730bf18d481aa851d&language=en-US`
			)
				.then((res) => res.json())
				.then((data) => dispatch(addSelectedOne(data)));
			return () => {
				dispatch(removeSelectedOne());
			};
		},
		[id]
	);

	useEffect(
		function getReviews() {
			fetch(
				`https://api.themoviedb.org/3/tv/${id}/reviews?api_key=0bf633ba86a7dcd730bf18d481aa851d&language=en-US&page=1`
			)
				.then((res) => res.json())
				.then((data) => dispatch(addReviews(data)));
			return () => {
				dispatch(removeSelectedOne());
			};
		},
		[id]
	);

	let firstTwoReviews;
	function reducedReviews(allReviews) {
		if (allReviews?.length > 0) {
			//  const slicedReviews = allReviews?.length >= 2 ? allReviews.slice(0, 2) : allReviews.slice(0, 1);
			firstTwoReviews =
				allReviews.length >= 2
					? allReviews.slice(0, 2)
					: allReviews.slice(0, 1);
			// Use spread syntax for array updates
			console.log(firstTwoReviews);
		} else {
			firstTwoReviews = []; // Set to empty array if allReviews is undefined
			console.log(firstTwoReviews);
		}

		return firstTwoReviews;
	}
	const twoRevs = reducedReviews(allReviews);
	const renderReviews =
		twoRevs && twoRevs.length > 0 ? (
			twoRevs.map((review) => {
				return <ReviewElement data={review} key={review.id} />;
			})
		) : (
			<div className="no-reviews">No reviews</div>
		);

	const cardImgLink =
		showDetails &&
		`https://image.tmdb.org/t/p/original${showDetails.poster_path}`;
	const backgPoster =
		showDetails &&
		`https://image.tmdb.org/t/p/original${showDetails.backdrop_path}`;
	const itsTitle = showDetails && showDetails.name;
	const tagLine = showDetails && showDetails.tagline;
	const itsDescription = showDetails && showDetails.overview;
	const itsRating =
		showDetails && Math.round(showDetails.vote_average * 10) / 10;
	const releaseDate = showDetails && showDetails.first_air_date;
	const releaseYear = new Date(releaseDate).getFullYear();
	const origLang = showDetails && showDetails.original_language;

	const genres = showDetails.genres;
	const genreElements =
		genres &&
		genres.map((genre) => {
			return (
				<div className="genres">
					<h4>{genre.name}</h4>
				</div>
			);
		});

	const creators = showDetails.created_by;
	const creatorsElements =
		creators &&
		creators.map((creator, index) => {
			return (
				<p className="showCreators">
					{" "}
					{index === creators.length - 1
						? creator.name
						: creator.name + ", "}{" "}
				</p>
			);
		});

	const countries = showDetails.production_countries;
	const countryElements =
		countries &&
		countries.map((country) => <p d-answer>{country.name + " "}</p>);

	const runTime = showDetails.episode_run_time + " min.";
	const totalEpisodes = showDetails.number_of_episodes;
	const totalSeasons = showDetails.number_of_seasons;
	const status = showDetails.in_production ? "Running" : "Ended";

	//TRAILER
	//TRAILER
	const trailerInfo = useSelector(
		(state) => state.movies.trailerLink.results
	);
	console.log(trailerInfo);
	const allTrailerLinks =
		trailerInfo &&
		trailerInfo.map((item) => {
			return item.key ;
		});
	const trailerLink =
		allTrailerLinks &&
		allTrailerLinks.filter((el) => {
			return el !== "";
		});

	useEffect(
		function getTrailerLink() {
			fetch(
				`https://api.themoviedb.org/3/tv/${id}/videos?api_key=0bf633ba86a7dcd730bf18d481aa851d&language=en-US`
			)
				.then((res) => res.json())
				.then((data) => dispatch(addTrailerLink(data)));
			return () => {
				dispatch(removeSelectedOne());
			};
		},
		[id]
	);

	function goToTrailer() {
		const youtubeUrl = `https://www.youtube.com/watch?v=${trailerLink[0]}`;
		window.open(youtubeUrl, "_blank");
	}

	return (
		<div className="container">
			{backgPoster ? (
				<img className="back-poster" src={backgPoster} alt="Image" />
			) : (
				<div className="space"></div>
			)}
			<div className="details-inner">
				<div className="details-second-block">
					<div className="details-img">
						<img
							src={cardImgLink ? cardImgLink : unknownImg}
							alt="Image"
						/>
						<div className="trailer-container trailer-container-deck">
							<div className="trailer-el" onClick={goToTrailer}>
								<span> Trailer </span>
							<i class="fa-brands fa-square-youtube"></i>
							</div>
						</div>
					</div>
					<div className="details-right-mob">
						<h2> {itsTitle} </h2>
						<div className="trailer-container trailer-container-mob">
							<div className="trailer-el" onClick={goToTrailer}>
								<span> Trailer </span>
							<i class="fa-brands fa-square-youtube"></i>
							</div>
						</div>
					</div>
				</div>
				<div className="details-info">
					<div className="details-title-deck">
						<h2> {itsTitle} </h2>
					</div>
					<p className="tagLine">{tagLine}</p>
					<p className="details-description">{itsDescription}</p>
					<div className="details-about">
						<div className="total">
							<span className="totalSeasons">
								<span className="bold-text">
									{totalSeasons}
								</span>
								seasons
							</span>
							<span className="totalEpisode">
								<span className="bold-text">
									{totalEpisodes}
								</span>
								episodes
							</span>
						</div>
						<div className="details">
							<p className="d-question">Rating:</p>
							<p className="d-answer">{itsRating}</p>
						</div>
						<div className="details">
							<p className="d-question">Year:</p>
							<p className="d-answer">{releaseYear}</p>
						</div>
						{runTime[0] > 0 && (
							<div className="details">
								<p className="d-question">Episode: </p>
								<p className="d-answer">{runTime}</p>
							</div>
						)}
						<div className="details">
							<p className="d-question">Country:</p>
							<p className="d-answer">{countryElements}</p>
						</div>
						<div className="details">
							<p className="d-question">Original language:</p>
							<p className="d-answer">{origLang}</p>
						</div>
						<div className="details">
							<p className="d-question">Created by:</p>
							<p className="d-answer">{creatorsElements}</p>
						</div>
						<div className="details">
							<p className="d-question">Status</p>
							<p className="d-answer">{status}</p>
						</div>
						<div className="details">
							<p className="d-question">Genres:</p>
							<p className="d-answer">{genreElements}</p>
						</div>
					</div>
					<div className="reviws-more">
						<p className="review-space">
							{" "}
							Reviews ({allReviews?.length})
						</p>
						{allReviews?.length > 2 && (
							<Link to={`/reviews/tv/${id}`}>
								<span>More</span>
							</Link>
						)}
					</div>
					<div className="reviews-container">{renderReviews}</div>
				</div>
			</div>
			<div className="space-between-footer"></div>
		</div>
	);
};

export default ShowDetail;
