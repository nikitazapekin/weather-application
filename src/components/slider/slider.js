
//import Carousel from "./carouselItem/carouselItem";
import Carousel from "./sliderItem/sliderItem";
import "./slider.css"

import { CarouselItem } from "./sliderItem/sliderItem";
import Fir from "./1.png"
import Sec from "./2.png"
import Third from "./3.png"
export default function Sld() {
  return (
    <div className="sld">
      <Carousel>
        <CarouselItem><img  src={Fir} alt="sliderImage" className="sliderImage" /></CarouselItem>
        <CarouselItem><img src={Sec} alt="sliderImage" className="sliderImage" /></CarouselItem>
        <CarouselItem><img  src={Third} alt="sliderImage" className="sliderImage" /></CarouselItem>
      </Carousel>
    </div>
  );
}
