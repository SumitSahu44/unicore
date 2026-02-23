import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const products = [
   { id: 1, name: "Unicore 2 in 1", color: "#74b637", img: "/images/unicore-1.png",  },
    
 { id: 2, name: "Dazzler Sealant", color: "#1377c2", img: "/images/unicore-2.png", },
   { id: 3, name: "Unicore Nextgen", color: "#222222", img: "/images/unicore-3.png", },
 
];

const InteractiveProductSlider = () => {
  const [index, setIndex] = useState(0);

  const nextProduct = () => setIndex((prev) => (prev + 1) % products.length);
  const prevProduct = () => setIndex((prev) => (prev - 1 + products.length) % products.length);

  // Helper to get surrounding indices
  const prevIdx = (index - 1 + products.length) % products.length;
  const nextIdx = (index + 1) % products.length;

  return (
    <motion.section 
      animate={{ backgroundColor: products[index].color }}
      className="relative min-h-screen w-full transition-colors duration-700 ease-in-out flex flex-col md:flex-row overflow-hidden font-sans"
    >
      {/* Background Decor Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <h1 className="text-[25vw] font-black text-white opacity-5 uppercase whitespace-nowrap">
          {products[index].name.split(" ")[0]}
        </h1>
      </div>

      {/* Left Content Section */}
      <div className="flex-1 flex flex-col justify-center px-8 md:px-24 z-20 text-white pt-16 md:pt-0 text-center md:text-left">
        <motion.span 
          key={`tag-${index}`}
          initial={{ opacity: 0 }} animate={{ opacity: 0.7 }}
          className="uppercase tracking-widest text-xs font-bold"
        >
          Unicore TyreProtect
        </motion.span>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:h-[220px]"
          >
            <h2 className="text-5xl md:text-8xl font-black mt-2 leading-tight drop-shadow-md">
              {products[index].name}
            </h2>
            <p className="text-xl md:text-2xl mt-4 font-light italic opacity-90">
              {products[index].tagline}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="flex gap-4 mt-8 justify-center md:justify-start">
          <button className="px-8 py-3 bg-white text-black rounded-full font-bold shadow-xl hover:scale-105 transition-all">
            See product
          </button>
          <button className="px-8 py-3 border border-white/40 text-white rounded-full font-bold hover:bg-white/10 transition-all">
            Variants
          </button>
        </div>
      </div>

      {/* Right Slider Section - Clean Peek Effect */}
      <div className="flex-1 relative flex items-center justify-center h-[50vh] md:h-screen">
        <div className="relative w-full flex items-center justify-center">
          
          <AnimatePresence mode="popLayout">
            {/* PREVIOUS PRODUCT (Peek Left) */}
            <motion.img
              key={`prev-${index}`}
              src={products[prevIdx].img}
              initial={{ opacity: 0, x: -100 }}
              animate={{ 
                x: window.innerWidth < 768 ? -180 : -320, 
                opacity: 0.4, 
                scale: 0.5, 
                rotate: -10 
              }}
              className="absolute w-[150px] md:w-[250px] object-contain pointer-events-none filter brightness-75"
            />

            {/* MAIN PRODUCT (Center) */}
            <motion.img
              key={index}
              src={products[index].img}
              initial={{ x: 100, opacity: 0, scale: 0.8 }}
              animate={{ x: 0, opacity: 1, scale: 1, rotate: 0 }}
              exit={{ x: -100, opacity: 0, scale: 0.8 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(e, { offset }) => {
                if (offset.x > 70) prevProduct();
                else if (offset.x < -70) nextProduct();
              }}
              className="z-10 w-[240px] md:w-[450px] h-auto object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)] cursor-grab active:cursor-grabbing"
            />

            {/* NEXT PRODUCT (Peek Right) */}
            <motion.img
              key={`next-${index}`}
              src={products[nextIdx].img}
              initial={{ opacity: 0, x: 100 }}
              animate={{ 
                x: window.innerWidth < 768 ? 180 : 320, 
                opacity: 0.4, 
                scale: 0.5, 
                rotate: 10 
              }}
              className="absolute w-[150px] md:w-[250px] object-contain pointer-events-none filter brightness-75"
            />
          </AnimatePresence>

        </div>
      </div>

      {/* Navigation for Desktop */}
      <div className="absolute bottom-10 right-24 hidden md:flex gap-4 z-30">
        <button onClick={prevProduct} className="group p-4 bg-black/20 rounded-full hover:bg-white transition-all">
          <span className="group-hover:text-black text-white">←</span>
        </button>
        <button onClick={nextProduct} className="group p-4 bg-black/20 rounded-full hover:bg-white transition-all">
          <span className="group-hover:text-black text-white">→</span>
        </button>
      </div>
    </motion.section>
  );
};

export default InteractiveProductSlider;