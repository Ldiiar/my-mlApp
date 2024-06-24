export const mobSettings = {
	className: "center",
	infinite: false,
	centerPadding: "60px",
	slidesToShow: 4,
	speed: 100,
	swipeToSlide: true,
	arrows : false,
	afterChange: function(index) {
	  console.log(
		 `Slider Changed to: ${index + 4}, background: #222; color: #bada55`
	  );
	}
 };