import { createSlice } from "@reduxjs/toolkit";

let initialState = {
	currentOne: {},
	trailerLink : {},
	reviews: {},
	movieName: {},
	moviePoster: {},
};

const reviewSlice = createSlice({
	name: "reviewsPage",
	initialState,
	reducers: {
		//addCurrentOne: (state, {payload}) => {
		//	state.currentOne = payload
		//},		
		addTrailerLink: (state, {payload}) =>{
			state.trailerLink = payload
		},
		addReviews: (state, {payload}) => {
			state.reviews = payload
		},
		addMovieName: (state, {payload}) => {
			state.movieName = payload
		},
		addMoviePoster: (state, {payload}) => {
			state.moviePoster = payload
		},
		//removeCurrentOne: (state) => {
		//	state.currentOne = {}
		//	state.trailerLink = {}
		//	state.reviews = {}
		//}
	},
});


export default reviewSlice.reducer;
export const { 
	addCurrentOne, removeCurrentOne, addReviews,
	addMovieName, addMoviePoster} = reviewSlice.actions;
//export const getAllReviewData = (state)=> state.reviewPage.reviewPage

