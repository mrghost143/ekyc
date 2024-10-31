import ReactSlick from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import sliderimg from "@assets/images/sliderimg.svg";
import "./slider.scss";

export const Slider = () => {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    // autoplay: true,     
    // autoplaySpeed: 1500, 
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const slides = [
    {
      imgSrc: sliderimg,
      title: "Manage all your investments in one place with Bajaj Broking",
      subtitle: "Invest and trade in Stocks, IPOs, F&O, Bonds, NCDs, ETFs, and more.",
    },
    {
      imgSrc: sliderimg,
      title: "Manage all your investments in one place with Bajaj Broking",
      subtitle: "Invest and trade in Stocks, IPOs, F&O, Bonds, NCDs, ETFs, and more.",
    },
    {
      imgSrc: sliderimg,
      title: "Manage all your investments in one place with Bajaj Broking",
      subtitle: "Invest and trade in Stocks, IPOs, F&O, Bonds, NCDs, ETFs, and more.",
    },
  ];

  return (
    <div className="slider-container">
      <ReactSlick {...settings}>
        {slides.map((slide, index) => (
          <div key={index}>
            <img src={slide.imgSrc} alt={`slide-${index}`} />
            {/* {slide.title &&  */}
            <h4 className="slider-title">{slide.title}</h4>
            {/* } */}
            {/* {slide.subtitle &&  */}
            <p className="slider-subtitle">{slide.subtitle}</p>
            {/* } */}
          </div>
        ))}
      </ReactSlick>
    </div>
  );
};
