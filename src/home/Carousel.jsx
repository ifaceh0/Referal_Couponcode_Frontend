import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import referal1 from "../assets/referall1.png";
import referal2 from "../assets/referall2.png";
import referal3 from "../assets/referall3.png";
import referal4 from "../assets/referall4.png";
import slide3 from "../assets/slide3.jpg";
import slide2 from "../assets/slide2.jpeg";

const slides = [
  {
    image: referal1,
    title: 'Referral Program Features',
    description: 'Create custom referral programs to boost your brand reach and grow your customer base effortlessly.'
  },
  {
    image: referal3,
    title: 'Track Referral Results',
    description: 'Monitor and analyze the success of your referral campaigns with real-time performance tracking.'
  },
  {
    image: referal4,
    title: 'Customer Rewards',
    description: 'Reward your customers for bringing in new leads with attractive incentives and bonuses.'
  },
  {
    image: slide3,
    title: 'Automated Referral Workflows',
    description: 'Simplify your referral processes with automated workflows that save you time and effort.'
  },
  {
    image: slide2,
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
    // <div className="relative w-full h-[60vh] md:h-[80vh] lg:h-[80vh]  mt-3 overflow-hidden">
    <div className="relative w-full h-[250px] sm:h-[350px] md:h-[500px] lg:h-[650px] overflow-hidden rounded">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          } `}
        >
          <LazyLoadImage
            src={slide.image}
            alt={slide.title}
            effect="blur"
            className="w-screen h-full object-cover"
            placeholderSrc={referal1}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end">
            <div className="w-full p-4 sm:p-6 md:p-10 text-center text-white">
              <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
                {slide.title}
              </h2>

              <p className="text-xs sm:text-sm md:text-lg lg:text-xl max-w-3xl mx-auto">
                {slide.description}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevSlide}
        className="
          absolute
          left-2 md:left-4
          top-1/2
          -translate-y-1/2
          bg-black/40
          hover:bg-black/60
          text-white
          rounded-full
          p-2 md:p-3
          z-20
        "
      >
        <ChevronLeft className="w-5 h-5 md:w-7 md:h-7" />
      </button>

      <button
        onClick={goToNextSlide}
        className="
          absolute
          right-2 md:right-4
          top-1/2
          -translate-y-1/2
          bg-black/40
          hover:bg-black/60
          text-white
          rounded-full
          p-2 md:p-3
          z-20
        "
      >
        <ChevronRight className="w-5 h-5 md:w-7 md:h-7" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-3 md:bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`
              transition-all duration-300
              ${
                index === currentSlide
                  ? "w-6 md:w-8 h-2 bg-white rounded-full"
                  : "w-2 h-2 bg-white/50 rounded-full"
              }
            `}
          />
        ))}
      </div>
    </div>
  );
}
