import { createSlice } from "@reduxjs/toolkit";

let initialState = {
	isBurgerMenuOpen: false,
};

const burgerSlice = createSlice({
	name: "burgerMenu",
	initialState,
	reducers: {
		toggleBurgerMenu: (state) =>{
			state.isBurgerMenuOpen = !state.isBurgerMenuOpen
		},
	},
});


export default burgerSlice.reducer;
export const { toggleBurgerMenu } = burgerSlice.actions;

