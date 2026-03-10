import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const products = [
  { id: 1, name: "KITAMURA", color: "#622599", img: "/images/unicore-1.png", bgImg: "/images/bg1.png", price: "$649" },
  { id: 2, name: "HYPERION", color: "#1a1a1a", img: "/images/unicore-2.png", bgImg: "/images/bg2.png", price: "$720" },
  { id: 3, name: "ZENITH", color: "#004d40", img: "/images/unicore-3.png", bgImg: "/images/bg3.png", price: "$580" },
];

const ModernSlider = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => changeSlide(1), 5000);
    return () => clearInterval(timer);
  }, [index]);

  const changeSlide = (newDirection) => {
    setDirection(newDirection);
    setIndex((prev) => (prev + newDirection + products.length) % products.length);
  };

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden font-sans bg-black">
      
      {/* --- BACKGROUND LAYER (CROSS-FADE) --- */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={`bg-img-${index}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }} // Match duration with content
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${products[index].bgImg})` }}
          >
            {/* Color Overlay - Isko bhi animate kiya hai taaki white flash na aaye */}
            <motion.div 
              animate={{ backgroundColor: products[index].color }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 opacity-60"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="relative w-full max-w-7xl h-[600px] flex items-center justify-center z-10">
        <AnimatePresence custom={direction} mode="popLayout">
          
          {/* BIG TEXT */}
          <motion.h1
            key={`text-${index}`}
            initial={{ x: direction > 0 ? 600 : -600, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction > 0 ? -600 : 600, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-10 text-[16vw] font-black text-white whitespace-nowrap select-none tracking-tighter"
          >
            {products[index].name}
          </motion.h1>

          {/* PRODUCT IMAGE */}
          <motion.div
            key={`img-${index}`}
            initial={{ x: direction > 0 ? -400 : 400, rotate: direction > 0 ? -25 : 25, opacity: 0 }}
            animate={{ x: 0, rotate: -15, opacity: 1 }}
            exit={{ x: direction > 0 ? 400 : -400, rotate: direction > 0 ? 25 : -25, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-20 w-[300px] md:w-[500px] pointer-events-none"
          >
            <motion.img
              src={products[index].img}
              alt="product"
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="w-full h-auto drop-shadow-2xl"
            />
          </motion.div>

        </AnimatePresence>
      </div>

      {/* --- NAVIGATION & OVERLAYS --- */}
      <div className="absolute bottom-16 left-10 md:left-24 z-50 text-white">
        <AnimatePresence mode="wait">
          <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
             <p className="text-4xl font-black">{products[index].price}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-6 md:px-12 z-50">
        <button onClick={() => changeSlide(-1)} className="p-4 border border-white/20 rounded-full text-white hover:bg-white/10 transition-all">←</button>
        <button onClick={() => changeSlide(1)} className="p-4 border border-white/20 rounded-full text-white hover:bg-white/10 transition-all">→</button>
      </div>

      <button className="absolute bottom-10 right-10 md:right-24 z-50 px-10 py-4 bg-white text-black font-black uppercase tracking-widest skew-x-[-15deg] transition-transform hover:scale-105">
        BUY NOW
      </button>

    </section>
  );
};

export default ModernSlider;