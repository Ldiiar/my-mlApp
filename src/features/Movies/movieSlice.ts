import { createSlice } from "@reduxjs/toolkit";

type MovieState = {
	movies: string,
	upcomingMovies: string,
}


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
		addMovies: (state, { payload }) => {
			state.movies = payload;
		},
		addUpcomingMovies: ( state, { payload } ) => {
			state.upcomingMovies = payload
		},
		addShows: (state, { payload }) => {
			state.shows = payload
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
		setSearchingPromt: (state, {payload}) => {
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
	addReviews} = movieSlice.actions;

export const getAllMovies = (state)=> state.movies.movies



