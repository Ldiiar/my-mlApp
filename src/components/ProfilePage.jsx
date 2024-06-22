import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function ProfilePage(props) {
    props.setCurrPage('profile')
    const quantityWatchlist = useSelector((state) => state.detailsPage.quantityWatchlist)
    const quantityLikes = useSelector((state) => state.detailsPage.quantityLikes)


  return (
    <div className="container">
      <div className="profile-page">
        <Link to='./watchlist'> Watchlist ({quantityWatchlist})</Link>  
        <Link to='./likes'> Likes ({quantityLikes})</Link>  
        <Link to='/'> Watched </Link>
      </div>
    </div>
  )
}
