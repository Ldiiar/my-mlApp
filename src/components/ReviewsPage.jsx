import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
//import "./ReviewsPage.css";
import { useDispatch, useSelector } from "react-redux";
import ReviewElement from "./Reviews/ReviewEl";
import {
	addReviews,
	addSelectedOne,
	removeSelectedOne,
} from "../features/Movies/movieSlice";
import unknownImg from "../assets/baseImage.jpg";

function ReviewsPage() {
	const { channel, id } = useParams();
	console.log(id);
	const dispatch = useDispatch();
	

	useEffect(
		function fetchALlMovieDetail() {
			fetch(
				`https://api.themoviedb.org/3/${channel}/${id}?api_key=0bf633ba86a7dcd730bf18d481aa851d&language=en-US`
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
				`https://api.themoviedb.org/3/${channel}/${id}/reviews?api_key=0bf633ba86a7dcd730bf18d481aa851d&language=en-US&page=1`
			)
				.then((res) => res.json())
				.then((data) => dispatch(addReviews(data)));
			return () => {
				dispatch(removeSelectedOne());
			};
		},
		[id]
	);

	const allReviews = useSelector((state) => state.movies.reviews.results);
	//const reviewDate = useSelector((state) => state.movies.reviews.results);
	const allData = useSelector((state) => state.movies.selectedOne);
	const itsTitle = channel === 'movie' ? allData?.title : allData?.name;
	const releaseDate = channel === 'movie' ? allData?.release_date : allData?.first_air_date;
	const releaseYear = new Date(releaseDate).getFullYear();
	const lastReleaseDate = channel === 'tv' ? allData?.last_air_date : ' ';
	const lastReleaseYear = new Date(lastReleaseDate).getFullYear();


	const posterLink = allData.poster_path
		? `https://image.tmdb.org/t/p/original${allData.poster_path}`
		: undefined;

	console.log(allReviews);

	const renderReviews =
		allReviews?.length > 0 ? (
			allReviews.map((review) => {
				return <ReviewElement data={review} key={review.id} />;
			})
		) : (
			<div>No reviews</div>
		);

	return (
		<div className="container">
			<div className="revpage-blocks">
				<div className="reviews-content">
					<div className="revs-descriprion">
						<p className="reviews-of">Reviews of </p>
						<Link to={`/movie/${id}`}><span className="rev-movieName">{itsTitle} </span></Link>
						<span>{releaseYear}{ channel === 'shows' && <span> - {lastReleaseYear}</span>}</span>
						<div className="review-poster review-poster-mob">
						<Link to={`/movie/${id}`}> <img src={posterLink} alt="Image" />  </Link>
						</div>
					</div>
					{renderReviews}
				</div>
				<div className="review-poster review-poster-all">
				<Link to={`/movie/${id}`}> <img src={posterLink} alt="Image" />  </Link>
				</div>
			</div>
		</div>
	);
}

export default ReviewsPage;
