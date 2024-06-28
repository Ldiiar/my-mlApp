import React from "react";
import { Link } from 'react-router-dom';
import unknown from '../../assets/baseImage.jpg';
import './MovieCard.css';
import Landingcard from './Landingcard';


const MovieCard = (props) => {
	const yearObj = new Date(props.data.release_date)
	const popularity = Math.round(props.data.popularity)
	function roundPopularity(num) {
		if ( num > 1000 ) {
			num /= 1000 
			let newNum = num.toFixed(2) + 'k'
			return newNum
		} else{
			return num
		}
	}
	const popularityRounded = roundPopularity(popularity)
	const year = yearObj.getFullYear()
	const cardImgLink = props.data.poster_path ? `https://image.tmdb.org/t/p/original${ props.data.poster_path}`
	: undefined ;
	const scrollToTop = () => {
		window.scrollTo(0,0)
	}

	return (
		<div className="card-item">
			<Link to={`/movie/${props.data.id}`} onClick={scrollToTop}>
			{ props.type  === `landing-page`
			? <Landingcard cardImgLink={cardImgLink} popularity={popularityRounded}/>
			:	<div className={ props.type  === `found` ? `card-inner-found` : `card-inner`}>
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
