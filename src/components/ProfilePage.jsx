import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { changeAvatar } from '../features/Movies/profileSlice'

export default function ProfilePage() {
    const dispatch = useDispatch()
    const quantityWatchlist = useSelector((state) => state.detailsPage.quantityWatchlist)
    const quantityLikes = useSelector((state) => state.detailsPage.quantityLikes)
    const quantityWatched = useSelector((state) => state.detailsPage.quantityWatched)
    const avatar = useSelector(state => state.profile.avatar)
    const [url, setUrl] = useState(avatar === '' ? 'https://a0.anyrgb.com/pngimg/1140/162/user-profile-login-avatar-heroes-user-blue-icons-circle-symbol-logo-thumbnail.png' : avatar)
    
    function handleChangeAvatar(event){
      const files = event.target.files;
      let newAvatar = URL.createObjectURL(files[0])
      dispatch(changeAvatar(newAvatar))
      setUrl(newAvatar)
    }

  return (
    <div className="container">
      <div className="flex justify-center mb-4 mt-8">
        <div className="flex flex-col justify-center items-center w-32 h-32 rounded-full border-white border-solid border-2">
          <div className="flex flex-col items-center justify-center w-full h-full">
            <img className='w-full h-full rounded-full object-cover' src={url} alt="" />
          </div>
        </div>
      </div>

      <div className="w-full text-center mb-8">
          <label for='input-avatar' className='hover:text-green-500 font-semibold'>CHANGE AVATAR</label>
      </div>
          <input type='file' accept='image/jpeg, image/jpg, image/png' id='input-avatar' className='hidden' onChange={handleChangeAvatar}></input>

      <div className="flex flex-col">
        <Link to='./watchlist'> <div className="flex justify-between hover:bg-gray-500 duration-200 p-2">
          <span>Watchlist</span> <span className='text-zinc-400'>({quantityWatchlist})</span></div>
        </Link> 
        <Link to='./likes'> <div className="flex justify-between hover:bg-gray-500 duration-200 p-2">
          <span>Likes</span> <span className='text-zinc-400'>({quantityLikes})</span></div>
        </Link> 
        <Link to='./watched'> <div className="flex justify-between hover:bg-gray-500 duration-200 p-2">
          <span>Watched</span> <span className='text-zinc-400'>({quantityWatched})</span></div>
        </Link> 
      </div>
    </div>
  )
}
