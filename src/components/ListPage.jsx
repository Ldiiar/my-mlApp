import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import BackBtn from './common/BackBtn';
import { Link } from 'react-router-dom';


export default function WatchlistPage() {
  const watchlist = useSelector((state) => state.detailsPage.watchlist)
  const quantityWatchlist = useSelector((state) => state.detailsPage.quantityWatchlist)
  const watched = useSelector((state) => state.detailsPage.watched)
  const quantityWatched = useSelector((state) => state.detailsPage.quantityWatched)
  const likedOnes = useSelector((state) => state.detailsPage.likes)
  const quantityLikes = useSelector((state) => state.detailsPage.quantityLikes)


	  const url = window.location.href;
    let currPage
    let itsQuantity

    function whatPage() {
      if ( url.includes('watchlist')) {
           currPage = 'Watchlist'
           itsQuantity = quantityWatchlist
         return watchlist
      } else if (url.includes('likes')){
           currPage = 'Likes'
           itsQuantity = quantityLikes
        return likedOnes
      } else if (url.includes('watched')){
           currPage = 'Watched'
           itsQuantity = quantityWatched
        return watched
      }
  }

    const renderList = whatPage().map(item => <Link to={`/${item.message}/${item.id}`}> <img src={item.cover} alt="" key={item.id}/> </Link> )



  return (
    <div className="container">
      <div className="watchlist-page">
        <BackBtn />
        <h2>{currPage} ({itsQuantity})</h2>
          <div className="list-wrapper">
             {renderList}
          </div>
      </div>
    </div>
  )
}
