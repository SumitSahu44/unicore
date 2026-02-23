import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const TyreRevolutionSection = () => {
  const containerRef = useRef(null);

  // useScroll on the whole container to handle the "Pinning" feel
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001
  });

  // Background Text (REVOLUTION) - Starts at right, ends at left
  // Isko thoda lamba rakha hai taaki scroll feel ho
  const textX = useTransform(smoothProgress, [0, 1], ["80%", "-100%"]);

  // Tyre animations (Pin feel ke liye constant scale with subtle rotate)
  const tyreScale = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.9]);
  const tyreRotate = useTransform(smoothProgress, [0, 1], [0, 45]);

  // Circle Orbital Animation
  const circleRotate = useTransform(smoothProgress, [0, 1], [0, 720]); // Double rotation for speed
  const circleDashoffset = useTransform(smoothProgress, [0, 1], [280, 0]);

  return (
    // Height 300vh ki hai taaki 2-3 scroll tak "Pin" rahe
    <div ref={containerRef} className="relative h-[300vh] bg-black">
      
      {/* Sticky Wrapper - Ye screen ko ek jagah rokega */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Subtle Background Mesh */}
        <div className="absolute inset-0 opacity-10" 
             style={{ 
               backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', 
               backgroundSize: '40px 40px' 
             }} 
        />

        {/* 1. Background Text: Pure White & Massive */}
        <motion.h2 
          style={{ x: textX }}
          className="absolute text-[25vw] font-black uppercase whitespace-nowrap text-white leading-none tracking-tighter select-none z-10"
        >
          REVOLUTION
        </motion.h2>

        {/* 2. Main Container (Tyre + Circles) */}
        <div className="relative z-20 flex items-center justify-center w-full h-full">
          
          <motion.div 
            style={{ scale: tyreScale, rotate: tyreRotate }}
            className="relative w-[280px] md:w-[450px] z-30"
          >
            {/* The Tyre */}
            <img 
              src="/images/tyre.png" 
              alt="Unicore Tyre" 
              className="w-full h-auto drop-shadow-[0_0_100px_rgba(255,255,255,0.1)]"
            />

            {/* Orbital Animated Circles */}
            <motion.svg 
              viewBox="0 0 100 100" 
              style={{ rotate: circleRotate }}
              className="absolute inset-0 w-[140%] h-[140%] -left-[20%] -top-[20%] z-40 pointer-events-none"
            >
              {/* Main Lime Green Circle */}
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                stroke="#39ff14"
                strokeWidth="0.5"
                fill="none"
                strokeDasharray="100 200"
                style={{ strokeDashoffset: circleDashoffset }}
                strokeLinecap="round"
              />
              
              {/* Secondary White Ghost Circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="white"
                strokeWidth="0.1"
                fill="none"
                opacity="0.2"
              />
            </motion.svg>
          </motion.div>

          {/* Bottom Branding Tag */}
          <motion.div 
            style={{ opacity: useTransform(smoothProgress, [0.4, 0.6], [0, 1]) }}
            className="absolute bottom-12 px-6 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full"
          >
            <span className="text-[#39ff14] font-mono text-[10px] tracking-[0.3em] uppercase italic">
              Unicore / High-Velocity Shield
            </span>
          </motion.div>
        </div>

        {/* Top/Bottom Cinematic Fades */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black to-transparent z-50" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent z-50" />
      </div>
    </div>
  );
};

export default TyreRevolutionSection;