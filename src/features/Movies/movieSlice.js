import { createSlice } from "@reduxjs/toolkit";

let initialState = {
	movies: {},
	upcomingMovies: {},
	shows: {},
	selectedOne: {},
	trailerLink : {},
	foundMovies : {},
	searchingPromt : {},
	reviews: {},
};

const movieSlice = createSlice({
	name: "movies",
	initialState,
	reducers: {
		addMovies: (state) => {
			fetch(
				"https://api.themoviedb.org/3/movie/popular?api_key=0bf633ba86a7dcd730bf18d481aa851d&language=en-US&page=1"
			)
				.then((res) => res.json())
				.then((data) => state.movies = data)
		},
		addUpcomingMovies: (state) => {
				fetch(
					"https://api.themoviedb.org/3/movie/upcoming?api_key=0bf633ba86a7dcd730bf18d481aa851d&language=en-US&page=1"
				)
					.then((res) => res.json())
					.then((data) => state.upcomingMovies = data);
		},
		addShows: (state) => {
			fetch(
				"https://api.themoviedb.org/3/tv/popular?api_key=0bf633ba86a7dcd730bf18d481aa851d&language=en-US&page=1"
			)
				.then((res) => res.json())
				.then((data) => state.shows = data);
		},
		addSelectedOne: (state, {payload}) => {
			state.selectedOne = payload
		},		
		addTrailerLink: (state, {payload}) =>{
			state.trailerLink = payload
		},
		setFoundMovies:(state, {payload}) => {
			state.foundMovies = payload
		},
		addReviews: (state, {payload}) => {
			state.reviews = payload
		},
		setSearchingPromt:(state, {payload}) => {
			state.searchingPromt = payload
		},
		removeSelectedOne: (state) => {
			state.selectedOne = {}
			state.trailerLink = {}
			state.reviews = {}
		}
	},
});


export default movieSlice.reducer;
export const { 
	addMovies , addUpcomingMovies, addShows, addSelectedOne, 
	addTrailerLink, removeSelectedOne, setFoundMovies, setSearchingPromt,
	addReviews, addReviewsMovieName} = movieSlice.actions;
export const getAllMovies = (state)=> state.movies.movies



