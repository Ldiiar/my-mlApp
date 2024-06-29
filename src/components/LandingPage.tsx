import React, { useEffect } from 'react'
// import landPoster from '../assets/land-poster.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import landPoster2 from '../assets/poster-second.jpeg'
import landPoster4 from '../assets/poster-four.jpg'
import { addMovies } from '../features/Movies/movieSlice'
import MovieCard from './MovieCard/MovieCard'
import YotubeVideo from './common/YotubeVideo'


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
        <img src={landPoster4} className='back-poster' alt="" />
        <div className='flex flex-col justify-center items-center mt-4 mb-8 '>
            <p className='font-serif text-center w-3/4 text-base font-medium sm:text-xl md:text-2xl lg:text-4xl xl:font-semibold' >Start your journey to the cinema: track what you've watched, like, save to watch later, etc</p>
        </div>
        <div className="flex justify-center mb-4">
          <Link to='./home'>
          <button className='bg-green-600 p-3 text-sm rounded font-semibold hover:bg-green-700 md:text-xl'>
                Let's get started!
            </button>
          </Link>
        </div>
        <div className="flex justify-center mb-4">
          <p className='font-serif font-medium text-zinc-400 text-base sm:text-lg text-center'>It's free for usage as a social networking platform</p>
        </div>
        <div className="flex justify-center mb-8 lg:mb-16">
            {renderList}
        </div>
        <p className=" text-zinc-400 text-left text-center mb-4 sm:text-sm  md:text-xl lg:text-2xl"> TRAILERS:</p>
        <div className=" mb-10 sm:mb-20  md:mb-30 ">
          <YotubeVideo vids={fisrtFourPopMovies}/>
        </div>
    </div>
    </div>
  )
}
