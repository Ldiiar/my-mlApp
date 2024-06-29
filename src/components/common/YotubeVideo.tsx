import React, { useState } from 'react'
import YouTube from 'react-youtube'

export default function YotubeVideo(props) {
    const [currVid, setCurrVid] = useState(0)
    const [trailerLink, setTrailerLink] = useState('XtFI7SNtVpY')
    async function getAllTrailers(id) {
        const apiKey = '0bf633ba86a7dcd730bf18d481aa851d';
        const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=en-US`;
      
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Failed to fetch trailers for movie ${id}: ${response.statusText}`);
          }
          const data = await response.json();
          return data;
        } catch (error) {
          console.error('Error fetching trailers:', error);
          return [];
        }
      }
      
      async function getAllIds() {
        const allVids = props.vids.map(el => el.id);
        console.log('Movie IDs:', allVids);
      
       let trailerLinks = await Promise.all(allVids.map(getAllTrailers));
       console.log(trailerLinks);
       
       setTrailerLink(trailerLinks[currVid].results[currVid].key)


       console.log(trailerLink);
       
        console.log('Trailer Links:', trailerLinks);
      }
      
      (async () => {
        await getAllIds();
      })();


    function nextVid() {
        setCurrVid(prevNum => prevNum < 3 ? prevNum + 1 : 0)
    }
    const opts ={
        width: "90%",
        height: '390px',
        playerVars: {
            autoplay: 0,
        }
    }

  return (
    <YouTube videoId={trailerLink} opts={opts} className='flex justify-center' onEnd={nextVid} />
  )
}
