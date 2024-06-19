import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToWatchlist } from '../features/Movies/detailsSlice'
import MovieCard from './MovieCard/MovieCard'

export default function WatchlistPage() {
    const watchlist = useSelector((state) => state.detailsPage.watchlist)
  	const dispatch = useDispatch();
    console.log(watchlist);
    const renderList = watchlist.map(item => <img src={item.cover} alt=""/> )


  return (
    <div className="container">
      <div className="watchlist-page">
        <h2>Watchlist</h2>
          <div className="list-wrapper">
             {renderList}
          </div>
      </div>
    </div>
  )
}
