import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const HeroSection = () => {
  const { scrollY } = useScroll();

  // Scroll animations (Blur hataya, sirf subtle movement rakha hai)
  const yParallax = useTransform(scrollY, [0, 500], [0, 150]);
  const contentOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Animation Variants for Landing
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#050505] flex flex-col items-center justify-center overflow-hidden font-sans">
      
      {/* 1. Background Grid with subtle Pulse */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 z-0 pointer-events-none" 
        style={{ 
          backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse at center, black, transparent 80%)'
        }} 
      />

      {/* 2. Brand Accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#39ff14]/[0.05] blur-[120px] rounded-full" />
      </div>

      {/* 3. Main Content Section */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ opacity: contentOpacity, y: yParallax }}
        className="relative z-10 max-w-6xl px-6 text-center"
      >
        {/* Animated Badge */}
        <motion.div variants={itemVariants} className="inline-flex  mt-22 md:mt-0 items-center gap-2 px-4 py-2 mb-10 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-xl">
          <div className="w-1.5 h-1.5 rounded-full bg-[#39ff14] animate-pulse" />
          <span className="text-gray-400 font-bold tracking-[0.2em] text-[10px] uppercase">
            Unicore Premium Protection
          </span>
        </motion.div>

        {/* Heading with Character Reveal Feel */}
        <motion.h1 
          variants={itemVariants}
          className="text-6xl md:text-8xl lg:text-[120px] font-black text-white tracking-tighter leading-[0.85] mb-10 italic"
        >
          ENGINEERED <br />
          <motion.span 
            animate={{ 
              textShadow: ["0 0 0px rgba(57,255,20,0)", "0 0 20px rgba(57,255,20,0.2)", "0 0 0px rgba(57,255,20,0)"] 
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-600"
          >
            FOR EXTREME
          </motion.span>
        </motion.h1>

        {/* Subtext Reveal */}
        <motion.p 
          variants={itemVariants}
          className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed mb-14 tracking-wide"
        >
          Seals instantly. Lasts for years. The definitive 2-in-1 technology 
          designed for those who refuse to stop.
        </motion.p>

        {/* Buttons Reveal */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-8">
          <button className="group relative px-14 py-5 bg-[#39ff14] text-black font-extrabold rounded-full transition-all hover:scale-105 hover:shadow-[0_20px_40px_rgba(57,255,20,0.3)] active:scale-95">
            <span className="relative z-10 uppercase tracking-tighter text-sm">Explore Products</span>
          </button>
          
          <button className="group px-10 py-5 bg-transparent text-white font-bold rounded-full border border-white/10 hover:bg-white/5 transition-all flex items-center gap-4">
             <span className="uppercase tracking-tighter text-sm opacity-70 group-hover:opacity-100">Watch the Tech</span>
             <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#39ff14] transition-colors">
                <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[7px] border-l-white border-b-[4px] border-b-transparent ml-0.5" />
             </div>
          </button>
        </motion.div>
      </motion.div>

      {/* 4. Bottom Perspective Fade */}
      <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-[#050505] to-transparent z-20 pointer-events-none" />
    </div>
  );
};

export default HeroSection;