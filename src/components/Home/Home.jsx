import HeroSection from "./HeroSection";
import ProductShowcase from "./ProductShowcase";
import TechCoreSection from "./TechCoreSection";
import MinimalVideoSection from "./MinimalVideoSection";
import StickyRevealSection from "./StickyRevealSection";
import InteractiveProductSlider from "./InteractiveProductSlider";
import ScrollRevealSection from "./ScrollRevealSection";
import TyreRevolutionSection from "./TyreRevolutionSection";
import ProductScrollSequence from "./ProductScrollSequence";

const Home = () => {
  return (
    <>
      <HeroSection />
       <ProductShowcase />
     <MinimalVideoSection />
     <TyreRevolutionSection />
       <TechCoreSection />
       <ProductScrollSequence />
       <ScrollRevealSection />
         <InteractiveProductSlider />
       <StickyRevealSection />
    
      </>
  );
};

export default Home;
