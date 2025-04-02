import React, { useState, useEffect, useRef } from "react";
import { assets } from "../assets/assets";

const Banners = () => {
  const images = [assets.B2, assets.B3]; 
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null); 

 
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

 
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

 
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      handleNext();
    }, 4000);

    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="relative w-full mx-auto overflow-hidden h-full">
      
      <div
        className="relative w-full h-full flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Banner ${index + 1}`}
            className="w-full h-full object-cover flex-shrink-0"
          />
        ))}
      </div>

      {/* Left Arrow */}
     

      {/* Right Arrow */}
      
      
    </div>
  );
};

export default Banners;
