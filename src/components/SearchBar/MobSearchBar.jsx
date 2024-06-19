import React from "react";
import { Link } from "react-router-dom";
import './mobSearch.css'

import searchIcon from "../../assets/search.png";


const MobSearchBar = () => {

	const [inputValue, setInputValue] = React.useState("");
	const handleInputChange = (event) => {
		setInputValue(event.target.value);
	};


	return (
				<form action="" className="mobSearchBar">
					<input
						type="text"
						value={inputValue}
						placeholder="Search"
						onChange={handleInputChange}
					/>
					<Link to={inputValue === '' ? "/" : `/search/movies/${inputValue}`} >
						<div>
							<button type="submit">
								<img src={searchIcon} alt="Image" />
							</button>
						</div>
					</Link>
				</form>
	)
};

export default MobSearchBar;
