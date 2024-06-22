import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BackBtn from './common/BackBtn';
import { Link } from 'react-router-dom';


export default function LikesPage() {
    const likedOnes = useSelector((state) => state.detailsPage.likes)
    const quantityLikes = useSelector((state) => state.detailsPage.quantityLikes)
  	const dispatch = useDispatch();
    console.log(likedOnes);
    const renderList = likedOnes.map(item => <Link to={`/${item.message}/${item.id}`}>
       <img src={item.cover} alt="" key={item.id}/> </Link> )


  return (
    <div className="container">
      <div className="watchlist-page">
        <BackBtn />
        <h2>Likes ({quantityLikes})</h2>
          <div className="list-wrapper">
             {renderList}
          </div>
      </div>
    </div>
  )
}
