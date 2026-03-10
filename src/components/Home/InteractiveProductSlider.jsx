import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const products = [
  { 
    id: 1, name: "KITAMURA", color: "#5a189a", glow: "#9d4edd", img: "/images/unicore-1.png", price: "$649",
    decor: ["/images/obj2-1.png", "/images/obj1-2.png"] // In jagah apni images dalna
  },
  { 
    id: 2, name: "HYPERION", color: "#0f172a", glow: "#38bdf8", img: "/images/unicore-2.png", price: "$720",
    decor: ["/images/obj2-1.png", "/images/obj2-2.png"]
  },
  { 
    id: 3, name: "ZENITH", color: "#064e3b", glow: "#34d399", img: "/images/unicore-3.png", price: "$580",
    decor: ["/images/obj3-1.png", "/images/obj3-2.png"]
  },
];

const ModernSlider = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => changeSlide(1), 6000);
    return () => clearInterval(timer);
  }, [index]);

  const changeSlide = (newDirection) => {
    setDirection(newDirection);
    setIndex((prev) => (prev + newDirection + products.length) % products.length);
  };

  // Variants
  const textVariants = {
    initial: (dir) => ({ x: dir > 0 ? 1000 : -1000, opacity: 0 }),
    animate: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -1000 : 1000, opacity: 0 }),
  };

  const imageVariants = {
    initial: (dir) => ({ x: dir > 0 ? -800 : 800, opacity: 0, rotate: dir > 0 ? -45 : 45 }),
    animate: { x: 0, opacity: 1, rotate: -15 },
    exit: (dir) => ({ x: dir > 0 ? 800 : -800, opacity: 0, rotate: dir > 0 ? 45 : -45 }),
  };

  // Decor Objects Animation (Opposite to Product)
  const decorVariants = {
    initial: (dir) => ({ y: dir > 0 ? 500 : -500, opacity: 0, scale: 0.5 }),
    animate: { y: 0, opacity: 1, scale: 1 },
    exit: (dir) => ({ y: dir > 0 ? -500 : 500, opacity: 0, scale: 1.5 }),
  };

  return (
    <motion.section
      animate={{ backgroundColor: products[index].color }}
      transition={{ duration: 1 }}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden font-sans"
    >
      {/* Background Glow */}
      <motion.div 
        key={`glow-${index}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        className="absolute w-[600px] h-[600px] rounded-full blur-[150px] z-0"
        style={{ backgroundColor: products[index].glow }}
      />

      <div className="relative w-full max-w-7xl h-screen flex items-center justify-center">
        <AnimatePresence custom={direction} mode="wait">
          
          <motion.div key={index} custom={direction} className="relative w-full h-full flex items-center justify-center">
            
            {/* --- RANDOM DECOR OBJECTS --- */}
            {products[index].decor.map((obj, i) => (
              <motion.img
                key={`decor-${i}`}
                src={obj}
                custom={direction}
                variants={decorVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 1, delay: i * 0.1, ease: "circOut" }}
                className="absolute z-40 w-24 md:w-40 pointer-events-none drop-shadow-lg"
                style={{
                  top: i === 0 ? "15%" : "65%",
                  left: i === 0 ? "10%" : "75%",
                }}
              />
            ))}

            {/* 1. BACK TEXT */}
            <motion.h1
              variants={textVariants}
              custom={direction}
              initial="initial" animate="animate" exit="exit"
              transition={{ duration: 0.8, ease: "anticipate" }}
              className="absolute z-10 text-[18vw] font-black text-white whitespace-nowrap select-none tracking-tighter"
            >
              {products[index].name}
            </motion.h1>

            {/* 2. PRODUCT & SHADOW */}
            <motion.div
              variants={imageVariants}
              custom={direction}
              initial="initial" animate="animate" exit="exit"
              transition={{ duration: 0.8, delay: 0.1, ease: "circOut" }}
              className="relative z-20 flex flex-col items-center justify-center"
            >
              <motion.img
                src={products[index].img}
                animate={{ y: [0, -25, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="w-[320px] md:w-[500px] h-auto drop-shadow-2xl"
              />
              <motion.div 
                animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.2, 0.4] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="w-full h-10 bg-black/40 blur-3xl rounded-[100%] mt-[-20px] -z-10"
              />
            </motion.div>

            {/* 3. FRONT TEXT (Outline) */}
            <motion.h1
              variants={textVariants}
              custom={direction}
              initial="initial" animate="animate" exit="exit"
              transition={{ duration: 0.8, ease: "anticipate" }}
              className="absolute z-30 text-[18vw] font-black whitespace-nowrap select-none tracking-tighter pointer-events-none"
              style={{ 
                color: 'transparent',
                WebkitTextStroke: '2.5px rgba(255, 255, 255, 0.7)',
                opacity: 0.8
              }}
            >
              {products[index].name}
            </motion.h1>

          </motion.div>
        </AnimatePresence>
      </div>

      {/* --- UI ELEMENTS --- */}
      <div className="absolute bottom-10 left-10 md:left-20 z-50 text-white font-black text-5xl">
        {products[index].price}
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6 z-50 bg-black/10 p-2 rounded-full backdrop-blur-md">
        <button onClick={() => changeSlide(-1)} className="text-white text-3xl">←</button>
        <div className="flex gap-2">
          {products.map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${index === i ? "w-10 bg-white" : "w-2 bg-white/20"}`} />
          ))}
        </div>
        <button onClick={() => changeSlide(1)} className="text-white text-3xl">→</button>
      </div>

      <button className="absolute bottom-10 right-10 md:right-20 px-10 py-4 bg-white text-black font-black uppercase tracking-widest skew-x-[-15deg] z-50">
        Buy Now
      </button>

    </motion.section>
  );
};

export default ModernSlider;