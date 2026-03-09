import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const products = [
  { id: 1, name: "Unicore 2 in 1", color: "#74b637", img: "images/unicore-1.png", tagline: "Double Protection, Zero Hassle" },
  { id: 2, name: "Dazzler Sealant", color: "#1377c2", img: "images/unicore-2.png", tagline: "Ultimate Shine & Durability" },
  { id: 3, name: "Unicore Nextgen", color: "#222222", img: "images/unicore-3.png", tagline: "The Future of Tyre Safety" },
];

const InteractiveProductSlider = () => {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const nextProduct = () => setIndex((prev) => (prev + 1) % products.length);
  const prevProduct = () => setIndex((prev) => (prev - 1 + products.length) % products.length);

  const getPosition = (idx) => {
    const diff = (idx - index + products.length) % products.length;
    if (diff === 0) return "center";
    if (diff === 1 || diff === -2) return "right";
    return "left";
  };

  return (
    <motion.section
      animate={{ backgroundColor: products[index].color }}
      className="relative min-h-screen w-full flex flex-col md:flex-row items-center justify-center overflow-hidden font-sans perspective-[1200px] py-10 md:py-0"
      style={{ transition: "background-color 0.8s ease-in-out" }}
    >
      {/* Background Decor Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.h1
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.08, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            className="text-[30vw] md:text-[25vw] font-black text-white uppercase whitespace-nowrap select-none"
          >
            {products[index].name.split(" ")[0]}
          </motion.h1>
        </AnimatePresence>
      </div>

      {/* Product Image Section (Ab ye Mobile pe Center/Slightly Down rahega) */}
      <div className="relative z-20 flex-1 w-full h-[40vh] md:h-screen flex items-center justify-center order-1 md:order-2">
        <div className="relative w-full h-full flex items-center justify-center [transform-style:preserve-3d]">
          {products.map((item, i) => {
            const pos = getPosition(i);
            
            // Responsive X & Z axis for 3D look
            const mobileX = pos === "center" ? 0 : pos === "left" ? -120 : 120;
            const desktopX = pos === "center" ? 0 : pos === "left" ? -350 : 350;

            return (
              <motion.div
                key={item.id}
                animate={{
                  x: isMobile ? mobileX : desktopX,
                  z: pos === "center" ? 0 : -250,
                  rotateY: pos === "center" ? 0 : pos === "left" ? 40 : -40,
                  scale: pos === "center" ? 1 : (isMobile ? 0.55 : 0.65),
                  opacity: pos === "center" ? 1 : 0.4,
                  y: isMobile ? 20 : 0 // Mobile par thoda neeche push kiya hai
                }}
                transition={{ type: "spring", stiffness: 90, damping: 20 }}
                className="absolute w-[180px] sm:w-[280px] md:w-[450px] cursor-pointer"
                onClick={() => setIndex(i)}
              >
                <motion.img
                  src={item.img}
                  alt={item.name}
                  animate={pos === "center" ? { y: [0, -15, 0] } : {}}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="w-full h-auto drop-shadow-[0_40px_60px_rgba(0,0,0,0.5)]"
                />
                
                {/* Product Shadow */}
                {pos === "center" && (
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                    className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-6 bg-black/50 blur-2xl rounded-[100%] -z-10"
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Content Section */}
      <div className="relative z-30 flex-1 px-6 md:pl-24 text-white text-center md:text-left order-2 md:order-1 mt-4 md:mt-0">
        <motion.p 
          initial={{ opacity: 0 }} animate={{ opacity: 0.6 }}
          className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase mb-2"
        >
          Engineered for Safety
        </motion.p>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-black leading-tight">
              {products[index].name}
            </h2>
            <p className="text-sm md:text-xl font-medium opacity-80 mt-2 max-w-sm mx-auto md:mx-0">
              {products[index].tagline}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="flex flex-row gap-3 mt-8 justify-center md:justify-start">
          <button className="flex-1 md:flex-none px-6 py-3 bg-white text-black rounded-full font-bold text-sm shadow-xl hover:scale-105 transition-transform active:scale-95">
            SHOP NOW
          </button>
          <button className="flex-1 md:flex-none px-6 py-3 border border-white/30 backdrop-blur-md rounded-full font-bold text-sm hover:bg-white/10 transition-all">
            DETAILS
          </button>
        </div>
      </div>

      {/* Navigation Indicators & Buttons */}
      <div className="absolute bottom-6 md:bottom-12 left-0 right-0 md:left-auto md:right-24 flex flex-col items-center md:items-end gap-4 z-50 px-6">
        <div className="flex items-center gap-6 bg-black/10 backdrop-blur-xl p-2 px-6 rounded-full border border-white/10">
          <button onClick={prevProduct} className="text-white hover:scale-125 transition-transform">←</button>
          <div className="flex gap-2">
            {products.map((_, i) => (
              <div 
                key={i} 
                className={`h-1.5 rounded-full transition-all duration-500 ${index === i ? "w-8 bg-white" : "w-2 bg-white/20"}`}
              />
            ))}
          </div>
          <button onClick={nextProduct} className="text-white hover:scale-125 transition-transform">→</button>
        </div>
      </div>
    </motion.section>
  );
};

export default InteractiveProductSlider;