export const tabSettings = {
	className: "center",
	infinite: false,
	centerPadding: "60px",
	slidesToShow: 5,
	swipeToSlide: true,
	arrows : false,
	afterChange: function(index) {
	  console.log(
		 `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
	  );
	}
 };