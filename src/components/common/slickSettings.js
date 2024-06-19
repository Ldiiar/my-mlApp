export const Settings = {
	dots: false,
	infinite: false,
	speed: 500,
	slidesToScroll: 4,
	slidesToShow: 6,
	initialSlide: 0,
	responsive: [
	 {
		breakpoint: 1500,
		settings: {
		  slidesToShow: 6,
		  slidesToScroll: 3,
		  infinite: true,
		  dots: false
		}
	 },
	 {
		breakpoint: 1300,
		settings: {
		  slidesToShow: 5,
		  slidesToScroll: 3,
		  infinite: true,
		  dots: false
		}
	 },
	 {
		breakpoint: 1024,
		settings: {
		  slidesToShow: 4,
		  slidesToScroll: 2,
		  infinite: true,
		  dots: false
		}
	 },
	 {
		breakpoint: 600,
		settings: {
		  slidesToShow: 4,
		  slidesToScroll: 2,
		  initialSlide: 4
		}
	 },
	 {
		breakpoint: 480,
		settings: {
		  slidesToShow: 3,
		  slidesToScroll: 2,
		}
	 }
  ]
 };