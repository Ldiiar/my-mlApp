import {configureStore} from '@reduxjs/toolkit'
import movieReducer from  './Movies/movieSlice'
import reviewReducer from  './Movies/reviewSlice'
import detailsReducer from  './Movies/detailsSlice'
import burgerReducer from  './Movies/burgerSlice'

export const store = configureStore({
	reducer: { 
		movies: movieReducer,
		reviewsPage: reviewReducer,  
		detailsPage: detailsReducer,  
		burgerMenu: burgerReducer,  
	 }
})
