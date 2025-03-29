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
    <div className="relative">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <LazyLoadImage
            src={slide.image}
            alt={slide.title}
            effect="blur"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
            <h2 className="text-xl md:text-2xl font-bold">{slide.title}</h2>
            <p className="text-sm md:text-base">{slide.description}</p>
          </div>
        </div>
      ))}
      <button
        onClick={goToPrevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-colors"
      >
        <ChevronLeft className="h-4 w-4 md:h-6 md:w-6 text-black" />
      </button>
      <button
        onClick={goToNextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-colors"
      >
        <ChevronRight className="h-4 w-4 md:h-6 md:w-6 text-black" />
      </button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${
              index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
