import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	addSelectedOne,
	removeSelectedOne,
	addTrailerLink,
	addReviews,
} from "../features/Movies/movieSlice";
import {
	addToLikes,
	addToWatched,
	addToWatchlist,
	removeFromLikes,
	removeFromWatched,
	removeFromWatchlist
} from "../features/Movies/detailsSlice";
import { addMovieName, addMoviePoster } from "../features/Movies/reviewSlice";
import "./MovieDetail.css";
import ReviewElement from "./Reviews/ReviewEl";
import { Link, Outlet } from "react-router-dom";
import unknownImg from "../assets/baseImage.jpg";
import thinEye from '../assets/eyeThin.svg'

const MovieDetail = () => {
	const { id } = useParams();
	const apiKey = `api_key=0bf633ba86a7dcd730bf18d481aa851d`
	const movieDetails = useSelector((state) => state.movies.selectedOne);
	const allReviews = useSelector((state) => state.movies.reviews.results);
	const itsTitle = movieDetails && movieDetails.title;
    const watchlist = useSelector((state) => state.detailsPage.watchlist)
    const likes = useSelector((state) => state.detailsPage.likes)
    const watched = useSelector((state) => state.detailsPage.watched)
	const [isWatchlisted, setIsWatchlisted] = useState(watchlist.some(item => item.id === id))
	const [isLiked, setIsLiked] = useState(likes.some(item => item.id === id));
	const [isWatched, setIsWatched] = useState(watched.some(item => item.id === id));


	function toggleIsWatchlisted() {
		if(isWatchlisted){
			dispatch(removeFromWatchlist([id, cardImgLink]))
			setIsWatchlisted(false)
		} else{
			dispatch(addToWatchlist([id, cardImgLink]))
			setIsWatchlisted(true)
		}
	}

	function toggleIsLiked() {
		if(isLiked){
			dispatch(removeFromLikes([id, cardImgLink]))
			setIsLiked(false)
		} else{
			dispatch(addToLikes([id, cardImgLink]))
			setIsLiked(true)
		}
	}
	function toggleIsWatched() {
		if(isWatched){
			dispatch(removeFromWatched([id, cardImgLink]))
			setIsWatched(false)
		} else{
			dispatch(addToWatched([id, cardImgLink]))
			setIsWatched(true)
		}
	}

	useEffect(() => {
			watchlist.some(item => item.id === id) ? setIsWatchlisted(true) : setIsWatchlisted(false)
	}, [id])


	let firstTwoReviews;
	function reducedReviews(allReviews) {
		if (allReviews?.length > 0) {
			firstTwoReviews =
				allReviews.length >= 2
					? allReviews.slice(0, 2)
					: allReviews.slice(0, 1);
		} else {
			firstTwoReviews = []; 
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

	const trailerInfo = useSelector(
		(state) => state.movies.trailerLink.results
	);
	const allTrailerLinks =
		trailerInfo &&
		trailerInfo.map((item) => {
			return item.type === "Trailer" ? item.key : "";
		});
	const trailerLink =
		allTrailerLinks &&
		allTrailerLinks.filter((el) => {
			return el !== "";
		});

	const dispatch = useDispatch();
	useEffect(
		function fetchMovieDetail() {
			fetch(
				`https://api.themoviedb.org/3/movie/${id}?api_key=0bf633ba86a7dcd730bf18d481aa851d&language=en-US`
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
		function getTrailerLink() {
			fetch(
				`https://api.themoviedb.org/3/movie/${id}/videos?api_key=0bf633ba86a7dcd730bf18d481aa851d&language=en-US`
			)
				.then((res) => res.json())
				.then((data) => dispatch(addTrailerLink(data)));
			return () => {
				dispatch(removeSelectedOne());
			};
		},
		[id]
	);

	useEffect(
		function getReviews() {
			fetch(
				`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=0bf633ba86a7dcd730bf18d481aa851d&language=en-US&page=1`
			)
				.then((res) => res.json())
				.then((data) => dispatch(addReviews(data)));
			return () => {
				dispatch(removeSelectedOne());
			};
		},
		[id]
	);

	
	
	function goToTrailer() {
		console.log(trailerLink);
		console.log(allTrailerLinks);
		console.log(trailerInfo);
		const youtubeUrl = `https://www.youtube.com/watch?v=${trailerLink[0]}`;
		window.open(youtubeUrl, "_blank");
	}

	function checkName(arr) {
		let kuk = arr.map((item) => {
			return item.name.includes(itsTitle) ? item.key : console.log("no");
		});
	}

	const cardImgLink = movieDetails.poster_path
		? `https://image.tmdb.org/t/p/original${movieDetails.poster_path}`
		: undefined;
	const backgPoster = movieDetails.backdrop_path
		? `https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`
		: undefined;
	const tagLine = movieDetails?.tagline;
	const itsDescription = movieDetails.overview;
	const itsRating = Math.round(movieDetails.vote_average * 10) / 10;
	const voteCount = movieDetails.vote_count;
	const releaseDate = movieDetails.release_date;
	const releaseYear = new Date(releaseDate).getFullYear();
	const runtime = movieDetails.runtime;
	const origLang = movieDetails && movieDetails.original_language;
	const genres = movieDetails.genres;
	const genreElements = genres
		? genres.map((genre) => {
				return (
					<div className="genres">
						<h4>{genre.name}</h4>
					</div>
				);
		  })
		: "unknown";

	const countries = movieDetails.production_countries;
	const countryElements = countries
		? countries.map((country) => <p d-answer>{country.name + " "}</p>)
		: "unknown";

	function addMovieNameForRevs(name, posterLink) {
		dispatch(addMovieName(name));
		dispatch(addMoviePoster(posterLink));
	}

	addMovieNameForRevs(itsTitle, movieDetails.poster_path);

	return (
		<div>
			{backgPoster ? (
					<img
						className="back-poster"
						src={backgPoster}
						alt="Image"
					/>
			) : ( <div className="space"></div>)}
		<div className="container">
				

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
						<p className="tagLine">{tagLine?.toUpperCase()}</p>
						<p className="details-description">{itsDescription}</p>
						<div className="details-about">
							<h3>DETAILS</h3>
							<div className="details">
								<p className="d-question">Rating:</p>
								<p className="d-answer">{itsRating}</p>
							</div>
							<div className="details">
								<p className="d-question">Year:</p>
								<p className="d-answer">{releaseYear}</p>
							</div>
							<div className="details">
								<p className="d-question">Time:</p>
								<p className="d-answer">{runtime + " min."}</p>
							</div>
							<div className="details">
								<p className="d-question">Country:</p>
								<p className="d-answer">{countryElements}</p>
							</div>
							<div className="details">
								<p className="d-question">Original language:</p>
								<p className="d-answer">{origLang}</p>
							</div>
							<div className="details">
								{/*<p className="d-genres">Genres:</p>*/}
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
								<Link to={`/reviews/movie/${id}`}>
									<span>More</span>
								</Link>
							)}
						</div>
						<div className="reviews-container">{renderReviews}</div>
					</div>
				</div>
			{/*) : ( <p>Loading...</p> )}*/}
		</div>
	</div>

	);
};

export default MovieDetail;
