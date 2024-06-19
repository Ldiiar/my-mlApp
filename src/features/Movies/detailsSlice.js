import { createSlice } from "@reduxjs/toolkit";

let initialState = {
	watchlist: []
}

const detailsSlice = createSlice({
	name: 'detailsPage',
	initialState,
	reducers: {
		addToWatchlist: (state, action) => {
			const [id, cover] = action.payload
			state.watchlist = [...state.watchlist, {id: id, cover: cover}] 
			console.log(state.watchlist);
		},
		removeFromWatchlist: (state, action) => {
			const [id, cover] = action.payload
			const mathingItem = state.watchlist.find((el) => el.id === id)
			const filteredNewWatchlist = state.watchlist.filter((item) => item !== mathingItem)
			state.watchlist = [...filteredNewWatchlist]
		},
	}
})

export default detailsSlice.reducer
export const {addToWatchlist, removeFromWatchlist} = detailsSlice.actions
export const getAllWatchlist = (state) => state.detailsPage.watchlist