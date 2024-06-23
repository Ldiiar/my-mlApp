import React, { useState, useEffect, useRef } from 'react';
import "./ReviewEl.css";
import {} from '../../features/Movies/movieSlice'
import goldStar from '../../assets/goldStar.png';
import userUnreg from '../../assets/user.png'
import TruncatedText from './TruncatedText'


const ReviewElement = (props) => {
	const reviewerLinktoIcon = props.data.author_details && props.data.author_details.avatar_path
	const reviewerIcon =  reviewerLinktoIcon ? `https://image.tmdb.org/t/p/original/${reviewerLinktoIcon}.jpg` : userUnreg;
	const reviewFullDate = props?.data.updated_at

	function getYearMonthDay(date) {
		const dateObj = new Date(date);
		return {
		  year: dateObj.getFullYear(),
		  month: dateObj.getMonth() + 1, // Months are zero-indexed in JavaScript
		  day: dateObj.getDate(),
		};
	 }
	 
	 // Example usage
	 const { year, month, day } = getYearMonthDay(reviewFullDate);
	 
	 function monthNumToString(monthNum) {
		const months = [
		  "Jan",
		  "Feb",
		  "Mar",
		  "Apr",
		  "May",
		  "Jun",
		  "Jul",
		  "Aug",
		  "Sep",
		  "Oct",
		  "Nov",
		  "Dec",
		];
	 
		if (monthNum < 1 || monthNum > 12) {
		  throw new Error("Invalid month number. Please provide a number between 1 and 12.");
		}
	 
		return months[monthNum - 1];
	 }

	 const reviewMonthStr = monthNumToString(month)
	 const reviewFullReleaseDate = reviewMonthStr + ' ' + day + ' ' + year 
	const ratingByAuthir = props.data.author_details.rating ? props.data.author_details.rating + '/10' : '';
	

	return (
		<div className="review-container">
			<div className="review-author-img">
				<img src={reviewerIcon} alt="Image" />
			</div>
			<div className="review-info">
				<p className="reviewed">
				{ratingByAuthir && <> <img src={goldStar} alt="" /> <span className='rating-of-ten'> {ratingByAuthir}</span></> }
				<span className='rev-by'> Review by </span>
				<span className='rev-by-author'>{props.data.author}</span> 
				<span className='review-date'>{reviewFullReleaseDate}</span>
				</p>
				{/*<p className="the-review" >{props.data.content}</p>*/}
				<TruncatedText text={props.data.content}/>
			</div>
		</div>
	);
};

export default ReviewElement;
