import React, { useState, useEffect, useRef } from "react";
import { assets } from "../assets/assets";

const Banners = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  
  const updateImages = () => {
    if (window.matchMedia("(max-width: 600px)").matches) {
      setImages([assets.banner2, assets.banner1]); 
    } else {
      setImages([assets.B2, assets.B3]); 
    }
  };

  useEffect(() => {
    updateImages(); 

    
    const handleResize = () => updateImages();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (images.length === 0) return;
    
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(intervalRef.current);
  }, [images]);

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
    </div>
  );
};

export default Banners;
