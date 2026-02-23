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

  // Stiffness badha di hai taaki snappy feel ho
  const smoothProgress = useSpring(scrollYProgress, { 
    stiffness: 100, 
    damping: 30,
    mass: 0.5
  });

  // --- BOTTLE ANIMATIONS ---
  // Mobile par scale 1.4 tak jayega (Badi Image)
  const bottleScale = useTransform(
    smoothProgress, 
    [0, 0.4, 0.8, 1], 
    isMobile ? [0.9, 1.4, 1.3, 1.1] : [0.7, 1.1, 1, 0.8]
  );
  
  // Mobile Y-axis movement ko kam rakha hai taaki text ko jagah mile
  const bottleY = useTransform(
    smoothProgress, 
    [0, 0.3, 0.6, 1], 
    isMobile ? ["5%", "-10%", "10%", "0%"] : ["0%", "0%", "0%", "0%"]
  );

  const bottleRotate = useTransform(smoothProgress, [0, 1], [-5, 15]);

  // --- TEXT ANIMATIONS (Ultra Fast for Mobile) ---
  
  // Intro: Turant gayab hoga
  const text1Opacity = useTransform(smoothProgress, [0, 0.08], [1, 0]);

  // Stage 2: Tech Text (0.1 pe hi aa jayega)
  const text2Opacity = useTransform(smoothProgress, [0.08, 0.15, 0.4, 0.5], [0, 1, 1, 0]);
  const text2Y = useTransform(smoothProgress, [0.08, 0.15], [30, 0]);

  // Stage 3: Family Lineup (0.55 pe start)
  const lineupOpacity = useTransform(smoothProgress, [0.55, 0.7, 0.9], [0, 1, 1]);
  const lineupY = useTransform(smoothProgress, [0.55, 0.7], [30, 0]);

  return (
    /* Height drastically reduced for faster scroll */
    <div ref={containerRef} className="relative h-[180vh] bg-[#050505] text-white antialiased font-sans">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* BG Grid - Subtle touch */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
          style={{ 
            backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(circle at center, black, transparent 85%)'
          }} 
        />

        {/* Stage 1: Intro */}
        <motion.div style={{ opacity: text1Opacity }} className="absolute z-50 text-center pointer-events-none">
          <h2 className="text-5xl md:text-[120px] font-black uppercase tracking-tighter opacity-10 italic">
            UNSTOPPABLE.
          </h2>
        </motion.div>

        {/* Main Content Wrapper */}
        <div className="relative w-full max-w-7xl h-full flex flex-col md:flex-row items-center justify-between px-6">
          
          {/* STAGE 2: Technology Text - Shifted up for mobile */}
          <div className="w-full md:w-1/3 h-1/2 md:h-full flex items-start md:items-center justify-center md:justify-start pt-20 md:pt-0">
            <motion.div 
              style={{ opacity: text2Opacity, y: text2Y }} 
              className="text-center md:text-left z-40"
            >
              <h2 className="text-4xl md:text-6xl font-black text-white mb-2 tracking-tighter uppercase leading-none">
                Active Fiber <br />
                <span className="text-[#39ff14]">Tech</span>
              </h2>
              <p className="text-xs md:text-lg text-gray-400 font-medium">
                Premium 2-in-1 formula. Seals instantly.
              </p>
            </motion.div>
          </div>

          {/* BOTTLE: Image size increased for Phone */}
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-30">
            <motion.div 
              style={{ scale: bottleScale, y: bottleY, rotateZ: bottleRotate }}
              className="w-[280px] md:w-[450px]" 
            >
              <img 
                src="/images/unicore-1.png" 
                alt="Product"
                className="w-full h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
              />
            </motion.div>
          </div>

          {/* STAGE 3: Lineup - Shifted down for mobile */}
          <div className="w-full md:w-1/3 h-1/2 md:h-full flex items-end md:items-center justify-center md:justify-end pb-20 md:pb-0">
            <motion.div 
              style={{ opacity: lineupOpacity, y: lineupY }} 
              className="flex flex-col items-center md:items-start gap-4 z-40"
            >
              <div className="text-center md:text-left">
                <h3 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none italic">The Family</h3>
              </div>

              <div className="flex gap-2">
                <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl flex flex-col items-center">
                  <span className="text-[9px] text-gray-500 font-bold uppercase">500ml</span>
                  <span className="text-lg font-black italic">Std.</span>
                </div>
                <div className="px-4 py-3 bg-white/5 border border-[#39ff14]/30 rounded-xl flex flex-col items-center">
                  <span className="text-[9px] text-[#39ff14] font-bold uppercase">1 Litre</span>
                  <span className="text-lg font-black italic">Pro</span>
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