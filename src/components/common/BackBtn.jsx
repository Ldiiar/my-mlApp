import React from 'react';
import { Link } from 'react-router-dom';

export default function BackBtn() {
	return (
		<div>
			<Link to='/profile/'>
				<div className='backBtn'>
					<i className='fa-solid fa-angle-left'></i>
				</div>
			</Link>
		</div>
	);
}
