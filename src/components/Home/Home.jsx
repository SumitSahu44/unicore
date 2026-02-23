import HeroSection from "./HeroSection";
import ProductShowcase from "./ProductShowcase";
import TechCoreSection from "./TechCoreSection";
import MinimalVideoSection from "./MinimalVideoSection";
import StickyRevealSection from "./StickyRevealSection";
import InteractiveProductSlider from "./InteractiveProductSlider";
import ScrollRevealSection from "./ScrollRevealSection";
import TyreRevolutionSection from "./TyreRevolutionSection";

const Home = () => {
  return (
    <>
      <HeroSection />
       <ProductShowcase />
     <MinimalVideoSection />
     <TyreRevolutionSection />
       <TechCoreSection />
       <ScrollRevealSection />
         <InteractiveProductSlider />
       <StickyRevealSection />
    
      </>
  );
};

export default Home;
