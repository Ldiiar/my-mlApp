import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import DeckSearchBar from "./SearchBar/DeckSearchBar";
import gun from "../assets/logo-main2.svg";
import { useDispatch, useSelector } from "react-redux";
import {toggleBurgerMenu} from '../features/Movies/burgerSlice'

function Header() {
	const url = window.location.href;
	const dispatch = useDispatch();
	const burgerMenu = useSelector((state) => state.burgerMenu.isBurgerMenuOpen)

	return (
		<div>
			<header>
				<div className="container container-flex">
					<div className="site-title">
						<Link to="/home">
							<div className="main-logo">
								<img src={gun} alt="" />
								<span>MovieLab</span>
							</div>
						</Link>
					</div>
					<nav>
						<ul className={burgerMenu ? "burger-active" : ""}>
							<li className={ url.includes('home') ? 'current-page': ''} onClick={() => dispatch(toggleBurgerMenu())}>
								<Link to='/home'>HOME</Link> 
							</li>
							<li className={ url.includes('profile') ? 'current-page': ''} onClick={() => dispatch(toggleBurgerMenu())}>
								 <Link to='/profile'> PROFILE </Link> 
							</li>
							<li><a href="#"> JOURNAL </a>
							</li>
						</ul>
						<div onClick={() => dispatch(toggleBurgerMenu())} 
						className={`burger-menu${burgerMenu ? ' burger-menu-fixed' : ''}`}>
							{ burgerMenu 
							? <i class="fa-solid fa-xmark"></i>
							: <i class="fa-solid fa-bars"></i>
							}
						</div>
					</nav>
					<DeckSearchBar />
				</div>
			</header>
			<div>
				<Outlet />
			</div>
		</div>
	);
}

export default Header;
