import React, { useEffect, useState } from "react";
import "./index.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import MovieDetail from "./components/MovieDetail";
import ShowDetail from "./components/ShowDetail";
import FoundMovies from "./components/FoundMovies";
import PageNotFound from "./components/PageNotFound";
import "./index.css";
import ReviewsPage from "./components/ReviewsPage";
import FoundShows from "./components/FoundShows";
import { useSelector } from "react-redux";
import WatchlistPage from './components/WatchlistPage';
import ProfilePage from './components/ProfilePage';
import LikesPage from './components/LikesPage';

export default function App() {
	const burgerMenu = useSelector((state) => state.burgerMenu.isBurgerMenuOpen)


	const router = createBrowserRouter([
		{
			path: "/",
			element: <Header />,
			errorElement: <PageNotFound />,
			children: [
				{
					path: "/",
					element: <Home />,
				},
				{
					path: "/movie/:id",
					element: <MovieDetail />,
				},
				{
					path: "/tv/:id",
					element: <ShowDetail />,
				},
				{
					path: "/search/movies/:name",
					element: <FoundMovies />,
				},
				{
					path: "/search/shows/:name",
					element: <FoundShows />,
				},
				{
					path: "/reviews/:channel/:id",
					element: <ReviewsPage />,
				},
				{
					path: "/profile",
					element: <ProfilePage />,
				},
				{
					path: "/profile/watchlist",
					element: <WatchlistPage />,
				},
				{
					path: "/profile/likes",
					element: <LikesPage />,
				},
			],
		},
	]);

	return (
		<div className={`app${burgerMenu ? ' app-fixed' : ''}`}>
			<RouterProvider router={router} />
			<Footer />
		</div>
	);
}
