import React from "react";
import './MovieCard/MovieCard.css'
import {  Link } from 'react-router-dom'
import unknown from '../assets/baseImage.jpg'

export default function ShowCard (props) {
	const yearObj = new Date(props.data.first_air_date)
	const year = yearObj.getFullYear()
	const cardImgLink =  props.data.poster_path ? `https://image.tmdb.org/t/p/original${props.data.poster_path}`
	: undefined ;

	return(
			<div className="card-item">
			<Link to={`/tv/${props.data.id}`}>
			<div className={`card-inner ${'card-inner-'+ props.type}`}>
				<div className="card-top">
					<img src={cardImgLink ? cardImgLink : unknown} alt='Image' />
					</div>
				<div className="card-bottom">
					<div className="card-info">
						<h4> {props.data.name} </h4>
						<span>{year}</span>
					</div>
				</div>
			</div>
			</Link>
		</div>
	)
}