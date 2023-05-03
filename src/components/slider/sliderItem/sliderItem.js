import React, { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";

import "./sliderItem.css";
import Fir from "./1.png"
import Sec from "./2.png"
import Third from "./3.png"
export const CarouselItem = ({ children, width }) => {
    const arr=[Fir, Sec, Third]

  return (
    <div className="carousel-item" style={{ width: width }}>
     
   {/*  <img src={arr[activeIndex]} alt="fon" /> */}
   {children}
    </div>
  
   
  );
};

const Carousel = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = React.Children.count(children) - 1;
    } else if (newIndex >= React.Children.count(children)) {
      newIndex = 0;
    }

    setActiveIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        updateIndex(activeIndex + 1);
      }
    }, 12000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  });

  const handlers = useSwipeable({
    onSwipedLeft: () => updateIndex(activeIndex + 1),
    onSwipedRight: () => updateIndex(activeIndex - 1)
  });

  return (
    <div
      {...handlers}
      className="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="inner"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {React.Children.map(children, (child, index) => {
          return React.cloneElement(child, { width: "100%" });
        })}
      </div>
      <div className="indicators">
        <button
        style={{display: "none"}}
          onClick={() => {
            updateIndex(activeIndex - 1);
          }}
        >
          Prev
        </button>
        {React.Children.map(children, (child, index) => {
          return (
            <button 
              className={`${index === activeIndex ? "active" : ""}`}
              onClick={() => {
                updateIndex(index);
              }}
            >
              {index + 1}
            </button> 
          );
        })}
        <button style={{display: "none"}}
          onClick={() => {
            updateIndex(activeIndex + 1);
          }}
        >
       
        </button> 
       
      </div>
    </div>
  );
};

export default Carousel;
