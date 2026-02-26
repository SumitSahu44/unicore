import HeroSection from "./HeroSection";
import ProductShowcase from "./ProductShowcase";
import TechCoreSection from "./TechCoreSection";
import MinimalVideoSection from "./MinimalVideoSection";
import StickyRevealSection from "./StickyRevealSection";
import InteractiveProductSlider from "./InteractiveProductSlider";
import ScrollRevealSection from "./ScrollRevealSection";
import TyreRevolutionSection from "./TyreRevolutionSection";
import ProductScrollSequence from "./ProductScrollSequence";
import HeroSequence from "./HeroSequence";

const Home = () => {
  return (
    <>
    <HeroSequence />
      <TechCoreSection />
      
      {/* <HeroSection /> */}
       <ProductShowcase />
     <MinimalVideoSection />
     <TyreRevolutionSection />
      <ProductScrollSequence />
       <ScrollRevealSection />
         <InteractiveProductSlider />
       <StickyRevealSection />
    
      </>
  );
};

export default Home;
