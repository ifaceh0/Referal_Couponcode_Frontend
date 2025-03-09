
import { useInView } from 'react-intersection-observer';
import Carousel from '../../home/Carousel';
import CompanyInfo from '../../home/CompanyInfo';
import ProductShowcase from '../../home/ProductShowcase';

const Home = () => {
  const [carouselRef, carouselInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [infoRef, infoInView] = useInView({ triggerOnce: false, threshold: 0.1 });
  const [productShowCaseRef, productShowCaseInView] = useInView({ triggerOnce: false, threshold: 0.1 });

  return (
    <>
      <div ref={carouselRef} className={`transition-opacity duration-1000 ${carouselInView ? 'opacity-100' : 'opacity-0'}`}>
        <Carousel/>
      </div>

      <div 
        ref={infoRef} 
        className={`transition-all duration-1000 transform ${infoInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <CompanyInfo/>
      </div>

      <div 
        ref={productShowCaseRef} 
        className={`transition-all duration-1000 transform ${productShowCaseInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <ProductShowcase/>
      </div>
      
    </>
  );
};

export default Home;