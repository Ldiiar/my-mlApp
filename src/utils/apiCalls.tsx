import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
    addMovies,
	setFoundMovies,
	setSearchingPromt,
} from "../features/Movies/movieSlice";

const dispatch = useDispatch();

// function encode(text) {
//     return text.replace("%20", " ");
// }

export function searchPromt(name) {
        // dispatch(setSearchingPromt(encode(name)));
        fetch(
            `https://api.themoviedb.org/3/search/movie?query=${name}&api_key=0bf633ba86a7dcd730bf18d481aa851d&language=en-US&page=1`
        )
            .then((res) => res.json())
            .then((data) => dispatch(setFoundMovies(data)));
}
