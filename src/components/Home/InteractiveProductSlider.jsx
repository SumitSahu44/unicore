import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const products = [
  { id: 1, name: "KITAMURA", color: "#622599", img: "/images/unicore-1.png", price: "$649", desc: "Tired of the same old, boring WooCommerce sliders? Get this next-level gallery now!" },
  { id: 2, name: "HYPERION", color: "#1a1a1a", img: "/images/unicore-2.png", price: "$720", desc: "Experience the ultimate comfort and futuristic design with our latest drop." },
  { id: 3, name: "ZENITH", color: "#004d40", img: "/images/unicore-3.png", price: "$580", desc: "Minimalist aesthetics meeting maximum performance. Engineered for the bold." },
];

const ModernSlider = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for next, -1 for prev

  // --- Auto Slide Logic ---
  useEffect(() => {
    const timer = setInterval(() => {
      changeSlide(1);
    }, 5000);
    return () => clearInterval(timer);
  }, [index]);

  const changeSlide = (newDirection) => {
    setDirection(newDirection);
    setIndex((prev) => (prev + newDirection + products.length) % products.length);
  };

  return (
    <motion.section
      animate={{ backgroundColor: products[index].color }}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden font-sans transition-colors duration-1000"
    >
      {/* 1. Main Content Wrapper (Center Aligned) */}
      <div className="relative w-full max-w-7xl h-[600px] flex items-center justify-center">
        
        <AnimatePresence custom={direction} mode="popLayout">
          {/* 2. BIG TEXT (Behind the shoe but slightly overlapping) */}
          <motion.h1
            key={`text-${index}`}
            initial={{ x: direction > 0 ? 500 : -500, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction > 0 ? -500 : 500, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-10 text-[15vw] md:text-[12vw] font-black text-white whitespace-nowrap select-none tracking-tighter"
          >
            {products[index].name}
          </motion.h1>

          {/* 3. PRODUCT IMAGE (Center, floats on top) */}
          <motion.div
            key={`img-${index}`}
            initial={{ x: direction > 0 ? -300 : 300, rotate: direction > 0 ? -20 : 20, opacity: 0 }}
            animate={{ x: 0, rotate: -15, opacity: 1 }} // Slanted look like your image
            exit={{ x: direction > 0 ? 300 : -300, rotate: direction > 0 ? 20 : -20, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-20 w-[300px] md:w-[550px] pointer-events-none"
          >
            <motion.img
              src={products[index].img}
              alt="shoe"
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="w-full h-auto drop-shadow-[0_60px_100px_rgba(0,0,0,0.7)]"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 4. OVERLAY INFO (Price, Desc, Buy Button) */}
      <div className="absolute bottom-20 left-10 md:left-24 z-30 text-white max-w-xs space-y-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <h3 className="text-3xl font-bold">{products[index].price}</h3>
            <div className="flex text-yellow-400 text-sm">★★★★☆</div>
            <p className="text-sm opacity-70 leading-relaxed mt-4">
              {products[index].desc}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 5. NAVIGATION ARROWS */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-6 md:px-12 z-40">
        <button 
          onClick={() => changeSlide(-1)} 
          className="w-12 h-12 flex items-center justify-center rounded-full border border-white/20 text-white hover:bg-white/10 transition-all"
        >
          ←
        </button>
        <button 
          onClick={() => changeSlide(1)} 
          className="w-12 h-12 flex items-center justify-center rounded-full border border-white/20 text-white hover:bg-white/10 transition-all"
        >
          →
        </button>
      </div>

      <button className="absolute bottom-10 right-10 md:right-24 z-30 text-white font-bold tracking-widest border-b-2 border-white pb-1 hover:scale-105 transition-transform">
        BUY NOW
      </button>

    </motion.section>
  );
};

export default ModernSlider;