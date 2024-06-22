import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BackBtn from './common/BackBtn';
import { Link } from 'react-router-dom';


export default function WatchlistPage() {
    const watchlist = useSelector((state) => state.detailsPage.watchlist)
    const quantityWatchlist = useSelector((state) => state.detailsPage.quantityWatchlist)
  	const dispatch = useDispatch();
    console.log(watchlist);
    const renderList = watchlist.map(item => <Link to={`/${item.message}/${item.id}`}> <img src={item.cover} alt="" key={item.id}/> </Link> )


  return (
    <div className="container">
      <div className="watchlist-page">
        <BackBtn />
        <h2>Watchlist ({quantityWatchlist})</h2>
          <div className="list-wrapper">
             {renderList}
          </div>
      </div>
    </div>
  )
}
