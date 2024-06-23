import React from "react";
import './MovieCard.css'
import { Link } from  'react-router-dom';
import unknown from '../../assets/baseImage.jpg'


const MovieCard = (props) => {
	const yearObj = new Date(props.data.release_date)
	const year = yearObj.getFullYear()
	const cardImgLink = props.data.poster_path ? `https://image.tmdb.org/t/p/original${ props.data.poster_path}`
	: undefined ;

	return (
		<div className="card-item">
			<Link to={`/movie/${props.data.id}`}>
				{  props.type  === "found" 
				? <div className="card-inner-found">
				<div className="card-top">
					<img src={cardImgLink ? cardImgLink : unknown } alt='Image' />
					</div>
				<div className="card-bottom">
					<div className="card-info">
						<h4> {props.data.title} </h4>
						<span>{year ? year: 'unknown'}</span>
					</div>
				</div>
				</div>
				: <div className={`card-inner`}>
					<div className="card-top">
					<img src={cardImgLink ? cardImgLink : unknown } alt='Image' />
					</div>
				<div className="card-bottom">
					<div className="card-info">
						<h4> {props.data.title} </h4>
						<span>{year ? year: 'unknown'}</span>
					</div>
				</div>
				</div>
			}
			</Link>
		</div>
	);
};

export default MovieCard;
