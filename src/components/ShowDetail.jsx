import React, { useEffect, useState } from "react";
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
import { addToLikes, addToWatched, addToWatchlist, removeFromLikes, removeFromWatched, removeFromWatchlist } from '../features/Movies/detailsSlice';

const ShowDetail = () => {
	const showDetails = useSelector((state) => state.movies.selectedOne);
	const allReviews = useSelector((state) => state.movies.reviews.results);
	console.log(showDetails);

	const { id } = useParams();
	const dispatch = useDispatch();


	const watchlist = useSelector((state) => state.detailsPage.watchlist)
    const likes = useSelector((state) => state.detailsPage.likes)
    const watched = useSelector((state) => state.detailsPage.watched)
	const [isWatchlisted, setIsWatchlisted] = useState(watchlist.some(item => item.id === id))
	const [isLiked, setIsLiked] = useState(likes.some(item => item.id === id));
	const [isWatched, setIsWatched] = useState(watched.some(item => item.id === id));



	function toggleIsWatchlisted() {
		if(isWatchlisted){
			dispatch(removeFromWatchlist([id]))
			setIsWatchlisted(false)
		} else{
			dispatch(addToWatchlist([id, cardImgLink, 'tv']))
			setIsWatchlisted(true)
		}
	}

	function toggleIsLiked() {
		if(isLiked){
			dispatch(removeFromLikes([id]))
			setIsLiked(false)
		} else{
			dispatch(addToLikes([id, cardImgLink, 'tv']))
			setIsLiked(true)
		}
	}

	function toggleIsWatched() {
		if(isWatched){
			dispatch(removeFromWatched([id, cardImgLink]))
			setIsWatched(false)
		} else{
			dispatch(addToWatched([id, cardImgLink, 'tv']))
			setIsWatched(true)
		}
	}

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
			firstTwoReviews =
				allReviews.length >= 2
					? allReviews.slice(0, 2)
					: allReviews.slice(0, 1);
		} else {
			firstTwoReviews = []; 
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
	const trailerInfo = useSelector(
		(state) => state.movies.trailerLink.results
	);
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
								<span> Watch the </span>
								<span> TRAILER </span>
							<i class="fa-brands fa-square-youtube"></i>
							</div>
						</div>
					</div>
				</div>
				<div className="details-info">
					<div className="details-title-deck">
						<h2> {itsTitle} </h2>
					</div>

					{/* <div className="actions">
					<div className='watchlist-block' onClick={()=> { toggleIsWatchlisted() }}>
						<i class={isWatchlisted? "fa-solid fa-bookmark" : "fa-regular fa-bookmark"} ></i>
						<span>Watchlist</span>
					</div>
					<div className="like-block" onClick={() => { toggleIsLiked() }}>
						{isLiked
						? <div className="liked-one"> 
						<i class="fa-solid fa-heart"></i>
						</div>
						: <div className=""><i class="fa-regular fa-heart"></i></div>
						}

					</div>
					</div> */}
					<div className="actions">
					<div className="action-block" onClick={() => { toggleIsWatchlisted() }}>
						{isWatchlisted
							? <div className="watchlisted-one"> 
								<i class="fa-solid fa-bookmark"></i>
									<span>Watchlisted</span>
								</div>
							: <div className='to-action'>
								<i class="fa-regular fa-bookmark"></i>
								<span>Watchlist</span> </div>
					}
					</div>
					<div className="action-block" onClick={() => { toggleIsWatched() }}>
						{isWatched
							? <div className="watched-one"> 
								<i class="fa-solid fa-eye"></i>
									<span>Watched</span>
								</div>
							: <div className='to-action'>
								<i class="fa-regular fa-eye"></i>
								<span>Watch</span> </div>
					}
					</div>
					<div className="action-block" onClick={() => { toggleIsLiked() }}>
						{isLiked
							? <div className="liked-one"> 
								<i class="fa-solid fa-heart"></i>
								<span>Liked</span>
								</div>
							: <div className='to-action'>
							<i class="fa-regular fa-heart"></i>
							<span>Like</span> </div>
						}
					</div>
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
