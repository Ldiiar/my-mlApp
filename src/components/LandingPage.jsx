import React, { Suspense, useEffect, useState } from 'react'
// import landPoster from '../assets/land-poster.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
// import landPoster2 from '../assets/poster-second.jpeg'
import landPoster4 from '../assets/poster-fifth.webp'
import { addMovies } from '../features/Movies/movieSlice'
import MovieCard from './MovieCard/MovieCard'
import YotubeVideo from './common/YotubeVideo'
import Loading from './common/Loading'


export default function LandingPage() {
  // const [renderList, setRenderList] = useState('')
  const dispatch = useDispatch()
  useEffect(() => {
    function fetchMovies() {
			fetch(
				"https://api.themoviedb.org/3/movie/popular?api_key=0bf633ba86a7dcd730bf18d481aa851d&language=en-US"
			)
				.then((res) => res.json())
				.then((data) => dispatch(addMovies(data)));
		}
		fetchMovies();
  },[])
      const popMovies = useSelector(state => state.movies.movies)
      console.log(popMovies);
      
    
      let fisrtFourPopMovies = popMovies.results.slice(0,4)
      console.log(fisrtFourPopMovies);
      
      
      const renderList = fisrtFourPopMovies && fisrtFourPopMovies.length > 0 ? (
        fisrtFourPopMovies.map(el => <MovieCard data={el} key={el.id} type='landing-page'/>)
      ) : <p></p>
      console.log(renderList);
  



  return (
    <div className='container'>
      <div className="">
        <img src={landPoster4} className='back-poster' alt="" />
        <div className='flex flex-col justify-center items-center mt-4 mb-8 lg:mt-16 lg:mb-14'>
            <p className='font-serif text-center w-5/6 sm:w-3/4 text-lg font-semibold sm:text-xl md:text-2xl lg:text-4xl xl:font-semibold' >
            Start your journey to the cinema: track what you've watched, like, save to watch later, etc</p>
        </div>
        <div className="flex justify-center mb-4">
          <Link to='./home'>
          <button className='bg-green-600 p-3 text-sm rounded font-semibold hover:bg-green-700 md:text-xl'>
                Let's get started!
            </button>
          </Link>
        </div>
        <div className="flex justify-center mb-4 lg:mb-10">
          <p className='font-serif font-medium text-zinc-400 text-base sm:text-lg text-center'>It's free for usage as a social networking platform</p>
        </div>
        <div className="flex justify-center mb-8 lg:mb-16">
          <Suspense fallback={<Loading />}>
            {renderList}
          </Suspense>
        </div>
        <p className=" text-zinc-400 text-center mb-4 sm:text-sm  md:text-xl lg:text-2xl"> See trailers of these 4 trending movies:</p>
        <div className=" mb-10 sm:mb-20  md:mb-30 lg:mb-[150px]">
          <YotubeVideo vids={fisrtFourPopMovies}/>
        </div>
    </div>
    </div>
  )
}
