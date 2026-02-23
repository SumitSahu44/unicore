import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const MinimalVideoSection = () => {
  const sectionRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Scroll karne pe size 60% se 100% tak jayega
  const scale = useTransform(scrollYProgress, [0.1, 0.4], [0.6, 1]);
  // Border radius 40px se 0px ho jayega jab full screen hoga
  const borderRadius = useTransform(scrollYProgress, [0.1, 0.4], [40, 0]);
  // Text opacity control
  const textOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);

  return (
    <section ref={sectionRef} className="relative h-[150vh] bg-white flex flex-col items-center">
      
      {/* Sticky Container taaki animation screen pe lock rahe */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        {/* Intro Text (Minimalist) */}
        <motion.div 
          initial={{ opacity: 1 }}
          style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) }}
          className="absolute top-20 text-center"
        >
          <span className="text-gray-400 uppercase tracking-widest text-sm">Experience the Quality</span>
          <h2 className="text-4xl font-light text-black mt-2">Precision in Every Drop.</h2>
        </motion.div>

        {/* The Expanding Container (Video or High-Res Image) */}
        <motion.div 
          style={{ 
            scale, 
            borderRadius,
            width: "100%",
            height: "100vh"
          }}
          className="relative overflow-hidden bg-[#111] shadow-2xl origin-center"
        >
          {/* Replace with actual product video or high-quality render */}
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-full object-cover opacity-80"
          >
            <source src="/videos/unicore-video.mp4" type="video/mp4" />
          </video>

          {/* Overlay Text that appears when video is full-sized */}
          <motion.div 
            style={{ opacity: textOpacity }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-black/20"
          >
            <h3 className="text-white text-6xl md:text-8xl font-bold tracking-tighter">
              UNCOMPROMISED.
            </h3>
            <p className="text-white/70 mt-4 text-lg font-light tracking-wide">
              The Gold Standard of Tyre Safety.
            </p>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
           style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
           className="absolute bottom-10 flex flex-col items-center"
        >
          <div className="w-[1px] h-12 bg-gray-300 relative overflow-hidden">
            <motion.div 
              animate={{ y: [0, 48] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="absolute top-0 w-full h-1/2 bg-black"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MinimalVideoSection;