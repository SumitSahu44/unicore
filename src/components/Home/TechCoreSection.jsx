import React from 'react';
import { motion } from 'framer-motion';

const TechCoreSection = () => {
  const features = [
    {
      title: "Nano-Seal Tech",
      desc: "Micro-fibers that instantly clog punctures up to 6mm.",
      // Icon with fixed motion path
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <motion.path 
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="1.5" 
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86 7.717l.641 2.564a2 2 0 003.136 1.022l1.492-1.492a2 2 0 00.547-1.022l.477-2.387a6 6 0 00-7.717-3.86l-2.564.641a2 2 0 00-1.022 3.136l1.492 1.492z" 
          />
        </svg>
      )
    },
    {
      title: "All-Weather Guard",
      desc: "Remains liquid from -20°C to 120°C. No freezing or drying.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M6.343 6.343l.707.707m11.314 11.314l.707.707M12 5a7 7 0 00-7 7 7 7 0 007 7 7 7 0 007-7 7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      title: "Eco-Safe Formula",
      desc: "Non-toxic, non-corrosive, and biodegradable chemical base.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      title: "2-Year Shield",
      desc: "One-time application keeps you protected for 24 months.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    }
  ];

  return (
    <section className="relative py-32 bg-[#050505] overflow-hidden" id='tech'>
      {/* Background Decor - Subtle Branding */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none flex items-center justify-center">
        <h2 className="text-[25vw] font-black uppercase tracking-tighter text-white select-none">CORE</h2>
      </div>

      <div className="container mx-auto px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-20">
          
          {/* Left Side: Product Focus */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="w-full lg:w-1/2 relative group"
          >
            <div className="relative aspect-square rounded-[48px] bg-white/[0.02] border border-white/5 flex items-center justify-center overflow-hidden">
              
              {/* Clean Status Badge */}
              <div className="absolute top-12 left-12 px-5 py-2 rounded-full border border-[#39ff14]/20 bg-[#39ff14]/5 backdrop-blur-md">
                <span className="text-[#39ff14] font-mono text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#39ff14] rounded-full animate-pulse" />
                  System: Active
                </span>
              </div>

              {/* Product Image - Assuming 'unicore-2.png' is your close-up */}
              <motion.img 
                src="images/unicore-2.png" 
                alt="Unicore Tech Detail" 
                className="w-3/5 h-auto transition-transform duration-1000 group-hover:scale-105 drop-shadow-[0_40px_80px_rgba(0,0,0,0.8)]"
              />

              {/* Data Overlays */}
              <div className="absolute bottom-12 right-12 flex flex-col items-end opacity-30">
                <p className="text-white font-mono text-[9px] uppercase tracking-tighter">Diagnostic: 100%</p>
                <div className="w-16 h-[1px] bg-white/20 mt-2 relative overflow-hidden">
                   <motion.div 
                     animate={{ x: [-64, 64] }} 
                     transition={{ repeat: Infinity, duration: 3, ease: "linear" }} 
                     className="w-full h-full bg-[#39ff14]" 
                   />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Features Grid */}
          <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-[40px] bg-white/[0.03] border border-white/10 hover:border-[#39ff14]/30 hover:bg-white/[0.05] transition-all duration-500 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-[#39ff14] mb-6 transition-transform duration-500 group-hover:scale-110">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2 tracking-tight">{item.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed font-light">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechCoreSection;