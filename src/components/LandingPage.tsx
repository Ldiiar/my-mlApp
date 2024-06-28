import React, { useEffect } from 'react'
// import landPoster from '../assets/land-poster.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import landPoster2 from '../assets/poster-second.jpeg'
import { addMovies } from '../features/Movies/movieSlice'
import MovieCard from './MovieCard/MovieCard'


export default function LandingPage() {

  const dispatch = useDispatch()
  let fisrtFourPopMovies
  dispatch(addMovies())
  const popMovies = useSelector(state => state.movies.movies.results)

  function getFourMovies(){
      fisrtFourPopMovies = popMovies?.slice(0,4)
      console.log(fisrtFourPopMovies);
      return fisrtFourPopMovies
  }

  const renderList = getFourMovies().length > 0 ? (
    fisrtFourPopMovies.map(el => <MovieCard data={el} key={el.id} type='landing-page'/>)
  ) : <p></p>


  return (
    <div className='container'>
      <div className="">
        <img src={landPoster2} className='back-poster' alt="" />
        <div className='flex flex-col justify-center items-center mt-4 mb-8 '>
            <span className='sm:text-xl md:text-2xl lg:text-4xl font-serif'>Start your journey to the cinema: track what</span>
            <span className='sm:text-xl md:text-2xl lg:text-4xl font-serif'> you've watched, like, save</span>
            <span className='sm:text-xl md:text-2xl lg:text-4xl font-serif'> to watch later, etc.</span>
        </div>
        <div className="flex justify-center mb-4">
          <Link to='./home'>
          <button className='bg-green-600 p-3 text-xl rounded font-semibold hover:bg-green-700'>
                Let's get started!
            </button>
          </Link>
        </div>
        <div className="flex justify-center mb-4">
          <p className='font-serif font-medium text-zinc-400'>It's free for usage as a social networking platform</p>
        </div>
        <div className="flex justify-center">
            {renderList}
        </div>
    </div>
    </div>
  )
}
