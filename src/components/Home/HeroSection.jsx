import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const HeroSection = () => {
  const { scrollY } = useScroll();

  // Yahan values badha di hain taaki content turant gayab na ho
  // Pehle 300 pe 0 opacity ho rahi thi, ab 800 tak handle karega
  const yParallax = useTransform(scrollY, [0, 800], [0, 200]);
  const contentOpacity = useTransform(scrollY, [0, 600], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#050505] flex flex-col items-center justify-center overflow-hidden font-sans">
      
      {/* 1. Background Grid */}
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

      {/* 2. Glow Accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-5%] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#39ff14]/[0.03] blur-[100px] rounded-full" />
      </div>

      {/* 3. Main Content Section */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        // Opacity aur Parallax ko aur "Loose" rakha hai taaki smooth transition ho
        style={{ opacity: contentOpacity, y: yParallax }}
        className="relative z-10 max-w-6xl px-6 text-center"
      >
        {/* Animated Badge */}
        <motion.div variants={itemVariants} className="inline-flex mt-10 md:mt-0 items-center gap-2 px-4 py-2 mb-8 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-xl">
          <div className="w-1.5 h-1.5 rounded-full bg-[#39ff14] animate-pulse" />
          <span className="text-gray-400 font-bold tracking-[0.2em] text-[10px] uppercase">
            Unicore Premium Protection
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1 
          variants={itemVariants}
          className="text-5xl md:text-8xl lg:text-[110px] font-black text-white tracking-tighter leading-[0.85] mb-8 italic"
        >
          ENGINEERED <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-500">
            FOR EXTREME
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p 
          variants={itemVariants}
          className="text-gray-400 text-base md:text-xl max-w-2xl mx-auto font-light leading-relaxed mb-12 tracking-wide"
        >
          Seals instantly. Lasts for years. The definitive 2-in-1 technology 
          designed for those who refuse to stop.
        </motion.p>

        {/* Buttons */}
     <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-6">
  {/* Explore Products Button -> Scrolls to #products */}
  <a 
    href="#products"
    onClick={(e) => {
      e.preventDefault();
      document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' });
    }}
    className="group relative px-12 py-4 bg-[#39ff14] text-black font-extrabold rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(57,255,20,0.15)] text-center cursor-pointer"
  >
    <span className="relative z-10 uppercase tracking-tighter text-sm">Explore Products</span>
  </a>
  
  {/* Watch the Tech Button -> Scrolls to #tech (or your video section ID) */}
  <a 
    href="#watch"
    onClick={(e) => {
      e.preventDefault();
      document.querySelector('#watch')?.scrollIntoView({ behavior: 'smooth' });
    }}
    className="group px-8 py-4 bg-transparent text-white font-bold rounded-full border border-white/10 hover:bg-white/5 transition-all flex items-center justify-center gap-3 cursor-pointer"
  >
     <span className="uppercase tracking-tighter text-sm opacity-70 group-hover:opacity-100">Watch the Tech</span>
     <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#39ff14]">
        <div className="w-0 h-0 border-t-[3px] border-t-transparent border-l-[6px] border-l-white border-b-[3px] border-b-transparent ml-0.5" />
     </div>
  </a>
</motion.div>
      </motion.div>

      {/* 4. Bottom Perspective Fade (Isko kam kiya taaki black out na lage) */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#050505] to-transparent z-20 pointer-events-none" />
    </div>
  );
};

export default HeroSection;