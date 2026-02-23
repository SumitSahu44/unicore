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
    stiffness: 70, // Fast response
    damping: 30,
    restDelta: 0.001 
  });

  // --- BOTTLE ANIMATIONS ---
  // Scale fast
  const bottleScale = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0.7, 1.1, 1, 0.8]);
  
  // Mobile par bottle ko center rakhenge but thoda upar/niche shift karenge space banane ke liye
  const bottleY = useTransform(
    smoothProgress, 
    [0, 0.3, 0.6, 0.9], 
    isMobile ? ["10%", "-15%", "15%", "0%"] : ["0%", "0%", "0%", "0%"]
  );

  const bottleX = useTransform(
    smoothProgress, 
    [0, 0.3, 0.6, 0.9], 
    isMobile ? ["0%", "0%", "0%", "0%"] : ["0%", "-25%", "25%", "0%"]
  ); 

  const bottleRotate = useTransform(smoothProgress, [0, 1], [-5, 10]);

  // --- TEXT ANIMATIONS (Timing fast kar di hai: 0.1 se start) ---
  
  // Stage 1: Intro (Jaldi fade out)
  const text1Opacity = useTransform(smoothProgress, [0, 0.1], [1, 0]);

  // Stage 2: Left Content (Jaldi aayega - 0.15 pe hi)
  const text2Opacity = useTransform(smoothProgress, [0.1, 0.2, 0.45, 0.55], [0, 1, 1, 0]);
  const text2Y = useTransform(smoothProgress, [0.1, 0.2], [40, 0]);

  // Stage 3: Right Content (0.6 se start)
  const lineupOpacity = useTransform(smoothProgress, [0.6, 0.75, 0.95], [0, 1, 1]);
  const lineupY = useTransform(smoothProgress, [0.6, 0.75], [40, 0]);

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-[#050505] text-white antialiased">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* BG Grid */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{ 
            backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(circle at center, black, transparent 80%)'
          }} 
        />

        {/* Stage 1: Intro */}
        <motion.div style={{ opacity: text1Opacity }} className="absolute z-50 text-center pointer-events-none">
          <h2 className="text-6xl md:text-[120px] font-black uppercase tracking-tighter opacity-20 italic">
            UNSTOPPABLE.
          </h2>
        </motion.div>

        {/* Main Content */}
        <div className="relative w-full max-w-7xl h-full flex flex-col md:flex-row items-center justify-between px-6">
          
          {/* STAGE 2: Technology Text */}
          <div className="w-full md:w-1/3 h-1/3 md:h-full flex items-center justify-center md:justify-start pt-10 md:pt-0">
            <motion.div 
              style={{ opacity: text2Opacity, y: text2Y }} 
              className="text-center md:text-left z-40"
            >
              <h2 className="text-4xl md:text-6xl font-black text-white mb-2 tracking-tighter uppercase leading-none">
                Active Fiber <br />
                <span className="text-[#39ff14]">Tech</span>
              </h2>
              <p className="text-sm md:text-lg text-gray-400 max-w-[280px] mx-auto md:mx-0">
                Premium 2-in-1 formula. Seals instantly.
              </p>
            </motion.div>
          </div>

          {/* BOTTLE: Isko absolute rakha hai taaki text layout disturb na ho */}
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-30">
            <motion.div 
              style={{ scale: bottleScale, x: bottleX, y: bottleY, rotateZ: bottleRotate }}
              className="w-[200px] md:w-[450px]"
            >
              <img 
                src="/images/unicore-1.png" 
                alt="Product"
                className="w-full h-auto drop-shadow-[0_30px_60px_rgba(0,0,0,0.9)]"
              />
            </motion.div>
          </div>

          {/* STAGE 3: Lineup */}
          <div className="w-full md:w-1/3 h-1/3 md:h-full flex items-center justify-center md:justify-end pb-10 md:pb-0">
            <motion.div 
              style={{ opacity: lineupOpacity, y: lineupY }} 
              className="flex flex-col items-center md:items-start gap-4 z-40"
            >
              <div className="text-center md:text-left">
                <h3 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">The Family</h3>
                <p className="text-[#39ff14] text-[10px] font-bold tracking-widest uppercase">Tailored for your ride</p>
              </div>

              <div className="flex gap-3 scale-90 md:scale-100">
                <div className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center">
                  <span className="text-[10px] text-gray-500 font-bold uppercase">500ml</span>
                  <span className="text-xl font-black">Standard</span>
                </div>
                <div className="px-6 py-4 bg-white/5 border border-[#39ff14]/40 rounded-2xl flex flex-col items-center">
                  <span className="text-[10px] text-[#39ff14] font-bold uppercase">1 Litre</span>
                  <span className="text-xl font-black">Pro</span>
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