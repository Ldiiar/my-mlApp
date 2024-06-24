export const mobSettings = {
	className: "center",
	infinite: false,
	centerPadding: "60px",
	slidesToShow: 4,
	swipeToSlide: true,
	arrows : false,
	afterChange: function(index) {
	  console.log(
		 `Slider Changed to: ${index + 3}, background: #222; color: #bada55`
	  );
	}
 };