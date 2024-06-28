import React from 'react'
import unknown from '../../assets/baseImage.jpg';


export default function Landingcard(props) {
  return (
            <div className=''>
					<div className="max-h-80 max-w-52 rounded-lg relative bg-pink">
						<img className=' rounded-lg hover:border-4 border-solid border-green-600 hover:scale-105' 
                        src={props.cardImgLink ? props.cardImgLink : unknown } alt='Image' />
                        <div className="absolute flex flex-col left-8 top-11 w-2/3 h-2/3 bg-black rounded
                        text-white opacity-0 text-center p-4 md:hover:opacity-80">
								              <i className="fa-solid fa-eye text-green-400 opacity-100 text-4xl mt-6"></i>
                              <span className='opacity-100 text-4xl text-white'>{props.popularity}</span>
                        </div>
					</div>
			 </div>
  )
}
