import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const ProductShowcase = () => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { 
    stiffness: 150, // Pehle se zyada responsive
    damping: 25,
    mass: 0.4 
  });

  // --- BOTTLE ANIMATIONS (Ultra Snappy) ---
  const bottleScale = useTransform(smoothProgress, [0, 0.4, 0.8], [0.85, 1.1, 0.95]);
  
  // Mobile Y-axis: Top spacing kam karne ke liye values adjust ki hain
  const bottleY = useTransform(
    smoothProgress, 
    [0, 0.3, 0.7, 1], 
    isMobile ? ["2%", "-12%", "12%", "0%"] : ["0%", "0%", "0%", "0%"]
  );

  const bottleX = useTransform(
    smoothProgress, 
    [0, 0.4, 0.7, 1], 
    isMobile ? ["0%", "0%", "0%", "0%"] : ["0%", "-28%", "28%", "0%"]
  ); 

  const bottleRotate = useTransform(smoothProgress, [0, 1], [-8, 15]);

  // --- TEXT ANIMATIONS (Zero Lag) ---
  const text1Opacity = useTransform(smoothProgress, [0, 0.08], [1, 0]);

  // Stage 2: Tech Text (Top se spacing kam di hai)
  const text2Opacity = useTransform(smoothProgress, [0.08, 0.15, 0.4, 0.5], [0, 1, 1, 0]);
  const text2Y = useTransform(smoothProgress, [0.08, 0.15], [15, 0]);

  // Stage 3: Family Lineup
  const lineupOpacity = useTransform(smoothProgress, [0.55, 0.65, 1], [0, 1, 1]);
  const lineupY = useTransform(smoothProgress, [0.55, 0.65], [15, 0]);

  return (
    // Height 150vh = Sirf 1 full swipe aur animation finish!
    <div ref={containerRef} className="relative h-[150vh] bg-[#050505] text-white antialiased">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* BG Grid - Thoda bright kiya taaki premium lage */}
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none" 
          style={{ 
            backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
            backgroundSize: '35px 35px',
            maskImage: 'radial-gradient(circle at center, black, transparent 85%)'
          }} 
        />

        {/* Intro Text */}
        <motion.div style={{ opacity: text1Opacity }} className="absolute z-50 text-center pointer-events-none">
          <h2 className="text-6xl font-black uppercase tracking-tighter opacity-10 italic">
            UNSTOPPABLE.
          </h2>
        </motion.div>

        <div className="relative w-full max-w-7xl h-full flex flex-col md:flex-row items-center justify-between px-6">
          
          {/* Tech Content - pt-12 (kam top spacing) */}
          <div className="w-full md:w-1/3 h-1/2 md:h-full flex items-start md:items-center justify-center md:justify-start pt-12 md:pt-0">
            <motion.div 
              style={{ opacity: text2Opacity, y: text2Y }} 
              className="text-center md:text-left z-40"
            >
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-[0.9]">
                Active Fiber <br />
                <span className="text-[#39ff14]">Tech</span>
              </h2>
              <p className="mt-2 text-xs text-gray-400 font-medium">Premium 2-in-1 formula.</p>
            </motion.div>
          </div>

          {/* Bottle */}
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-30">
            <motion.div 
              style={{ scale: bottleScale, x: bottleX, y: bottleY, rotateZ: bottleRotate }}
              className="w-[190px] md:w-[440px]"
            >
              <img 
                src="/images/unicore-1.png" 
                alt="Product"
                className="w-full h-auto drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)]"
              />
            </motion.div>
          </div>

          {/* Family Lineup Content - pb-16 (bottom se thoda upar) */}
          <div className="w-full md:w-1/3 h-1/2 md:h-full flex items-end md:items-center justify-center md:justify-end pb-16 md:pb-0">
            <motion.div 
              style={{ opacity: lineupOpacity, y: lineupY }} 
              className="flex flex-col items-center md:items-start gap-3 z-40"
            >
              <h3 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none">The Family</h3>

              <div className="flex gap-2">
                <div className="px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-center backdrop-blur-sm">
                  <p className="text-[9px] text-gray-500 font-bold">500ML</p>
                  <p className="text-lg font-black italic">STD</p>
                </div>
                <div className="px-5 py-3 bg-white/10 border border-[#39ff14]/40 rounded-xl text-center backdrop-blur-sm">
                  <p className="text-[9px] text-[#39ff14] font-bold">1 LITRE</p>
                  <p className="text-lg font-black italic text-[#39ff14]">PRO</p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductShowcase;