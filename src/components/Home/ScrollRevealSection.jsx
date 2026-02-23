import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const ScrollRevealSection = () => {
  const targetRef = useRef(null);
  
  // Tracking scroll within this section
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  // Smoothing the scroll value
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Transform values for animations
  // Text slides up and fades in
  const textY = useTransform(smoothProgress, [0, 0.4], [100, 0]);
  const textOpacity = useTransform(smoothProgress, [0, 0.35], [0, 1]);
  
  // Image scales up and tilts slightly
  const imgScale = useTransform(smoothProgress, [0.1, 0.5], [0.8, 1]);
  const imgRotate = useTransform(smoothProgress, [0.1, 0.5], [5, 0]);
  const imgOpacity = useTransform(smoothProgress, [0.1, 0.4], [0, 1]);

  return (
    <section 
    id="safety"
      ref={targetRef} 
      className="relative min-h-screen w-full bg-[#050505] py-24 flex items-center overflow-hidden"
    >
      {/* Background Accent - Very subtle glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-[#39ff14]/[0.02] blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* LEFT SIDE: Text Content */}
          <motion.div 
            style={{ y: textY, opacity: textOpacity }}
            className="w-full lg:w-1/2 space-y-8 text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#39ff14]/20 bg-[#39ff14]/5">
              <span className="text-[#39ff14] text-[10px] font-bold uppercase tracking-[0.2em]">Lab Tested</span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.9] uppercase italic">
              Extreme <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#39ff14] to-white">Performance</span>
            </h2>
            
            <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-lg">
              Our advanced sealant is engineered to handle high-velocity impacts. 
              Whether it's a 6mm puncture or extreme heat, Unicore keeps the 
              pressure stable so you never have to pull over.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row gap-6">
              <div className="flex flex-col">
                <span className="text-white text-3xl font-black italic">6MM+</span>
                <span className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">Puncture Seal Capacity</span>
              </div>
              <div className="w-[1px] h-12 bg-white/10 hidden sm:block" />
              <div className="flex flex-col">
                <span className="text-[#39ff14] text-3xl font-black italic">-20°C</span>
                <span className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">Operating Temp</span>
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-white text-black font-black uppercase tracking-tighter rounded-full text-sm hover:bg-[#39ff14] transition-colors"
            >
              See the data
            </motion.button>
          </motion.div>

          {/* RIGHT SIDE: Animated Image Reveal */}
          <motion.div 
            style={{ 
              scale: imgScale, 
              rotate: imgRotate, 
              opacity: imgOpacity 
            }}
            className="w-full lg:w-1/2 relative"
          >
            {/* Image Frame with Glassmorphism shadow */}
            <div className="relative z-10 rounded-[40px] overflow-hidden border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.5)]">
              <img 
                src="images/1.webp" // Aapki image ka path
                alt="Unicore Performance Test"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              
              {/* Overlay Glass Badge */}
              <div className="absolute bottom-6 left-6 p-4 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl">
                <p className="text-[10px] font-bold text-[#39ff14] uppercase tracking-widest mb-1">Live Telemetry</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-1 bg-white/20 rounded-full overflow-hidden">
                    <motion.div 
                      animate={{ width: ["20%", "90%", "60%"] }}
                      transition={{ repeat: Infinity, duration: 3 }}
                      className="h-full bg-[#39ff14]" 
                    />
                  </div>
                  <span className="text-white font-mono text-[10px]">98% SECURE</span>
                </div>
              </div>
            </div>

            {/* Decorative background element behind image */}
            <div className="absolute -top-10 -right-10 w-40 h-40 border-t-2 border-r-2 border-[#39ff14]/30 rounded-tr-[40px] -z-10" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 border-b-2 border-l-2 border-white/10 rounded-bl-[40px] -z-10" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ScrollRevealSection;