import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';


import referal1 from "../assets/referal1.png";
import referal2 from "../assets/referal2.png";
import referal3 from "../assets/referal3.png";


const slides = [
  {
    image: referal1,  // No curly braces here
    title: 'Referral Program Features',
    description: 'Create custom referral programs to boost your brand reach and grow your customer base effortlessly.'
  },
  {
    image: referal2,
    title: 'Track Referral Results',
    description: 'Monitor and analyze the success of your referral campaigns with real-time performance tracking.'
  },
  {
    image: referal3,
    title: 'Customer Rewards',
    description: 'Reward your customers for bringing in new leads with attractive incentives and bonuses.'
  },
  {
    image: referal2,
    title: 'Automated Referral Workflows',
    description: 'Simplify your referral processes with automated workflows that save you time and effort.'
  },
  {
    image: referal2,
    title: 'Referral Integrations',
    description: 'Seamlessly integrate our referral software with your existing tools for smooth operation.'
  },
  {
    image: referal2,
    title: 'Analytics and Reporting',
    description: 'Gain insights into your referral performance with detailed analytics and reporting.'
  }
];

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  return (
    <div className="relative w-full h-screen max-h-[80vh] md:max-h-screen overflow-hidden">
  {slides.map((slide, index) => (
    <div
      key={index}
      className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out ${
        index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
      }`}
    >
      <LazyLoadImage
        src={slide.image}
        alt={slide.title}
        effect="blur"
        className="w-full h-full object-cover"
        placeholderSrc="/placeholder-image.jpg" // Add a low-res placeholder
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-4 md:p-8">
        <div className="container mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
            {slide.title}
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl">
            {slide.description}
          </p>
        </div>
      </div>
    </div>
  ))}
  
  {/* Navigation Arrows */}
  <button
    onClick={goToPrevSlide}
    className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-all duration-300 z-20"
    aria-label="Previous slide"
  >
    <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8" />
  </button>
  <button
    onClick={goToNextSlide}
    className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-all duration-300 z-20"
    aria-label="Next slide"
  >
    <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8" />
  </button>

  {/* Indicators */}
  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
    {slides.map((_, index) => (
      <button
        key={index}
        onClick={() => goToSlide(index)}
        className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 ${
          index === currentSlide 
            ? 'bg-white scale-125' 
            : 'bg-white/50 hover:bg-white/75'
        }`}
        aria-label={`Go to slide ${index + 1}`}
      />
    ))}
  </div>
</div>
  );
}
