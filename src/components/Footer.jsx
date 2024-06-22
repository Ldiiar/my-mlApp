import React from "react";
import "../index.css";

const Footer = () => {
	const thisYear = new Date().getFullYear();
	return (
		<footer>
			<div className="container">
				<div className="footer-wrap">
					<div className="sector-one">
						<div className="footer-logo">MovieLab</div>
						<div className="social-links">
							<i class="fa-brands fa-facebook"></i>
							<i class="fa-brands fa-twitter"></i>
							<i class="fa-brands fa-instagram"></i>
							<i class="fa-brands fa-tiktok"></i>
							<i class="fa-brands fa-youtube"></i>
						</div>
					</div>
					<span className="rights">
					© Copyright {thisYear}. All Rights Reserved. Made with the intention of practising skills
					</span>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
