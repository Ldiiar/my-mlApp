import {configureStore} from '@reduxjs/toolkit'
import movieReducer from  './Movies/movieSlice'
import reviewReducer from  './Movies/reviewSlice'
import detailsReducer from  './Movies/detailsSlice'
import burgerReducer from  './Movies/burgerSlice'

// REDUX-PERSIST
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';

const persistCongif = {
	key: 'root',
	version: 1,
	storage
}

const reducer = combineReducers({
	movies: movieReducer,
	reviewsPage: reviewReducer,  
	detailsPage: detailsReducer,  
	burgerMenu: burgerReducer,  
})

const persistedReducer = persistReducer(persistCongif, reducer)

//END


export const store = configureStore({
	reducer: persistedReducer
})
