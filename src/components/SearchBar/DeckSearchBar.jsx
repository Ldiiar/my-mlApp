import React from "react";
import { Link } from "react-router-dom";
import './deckSearch.css'

import searchIcon from "../../assets/search.png";


const DeckSearchBar = () => {

	const [inputValue, setInputValue] = React.useState("");
	const handleInputChange = (event) => {
		setInputValue(event.target.value);
	};


	return (
				<form action="" className="searchBar">
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
	);
};

export default DeckSearchBar;
