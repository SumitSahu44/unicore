import React from 'react';
import { motion } from 'framer-motion';

const StickyRevealSection = () => {
  return (
    <div className="relative w-full bg-[#050505]">
      
      {/* Scroll Wrapper */}
      <div className="relative h-[200vh] w-full"> 
        
        {/* SECTION 1: Sticky Background (Piche wala) */}
        <section className="sticky top-0 h-screen w-full overflow-hidden bg-[#050505] flex items-center justify-center z-10">
          <div className="absolute inset-0">
            <img 
              src="/images/car.jpg" 
              className="w-full h-full object-cover opacity-30 grayscale hover:grayscale-0 transition-all duration-1000"
              alt="Background"
            />
            {/* Dark Overlays for better text contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-transparent to-[#050505]" />
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative z-20 text-center px-6"
          >
            <h2 className="text-white text-6xl md:text-[120px] font-black uppercase tracking-tighter italic leading-[0.85]">
              BEYOND <br />
              <span className="text-[#39ff14] drop-shadow-[0_0_30px_rgba(57,255,20,0.3)]">DURABLE</span>
            </h2>
            <p className="text-gray-500 mt-8 text-lg md:text-xl max-w-xl mx-auto font-light tracking-wide uppercase">
              Tested in the harshest terrains of Indore & Beyond.
            </p>
          </motion.div>
        </section>

        {/* SECTION 2: Overlapping Reveal Card (Upar se aane wala) */}
        <section className="relative z-30 min-h-screen bg-white  shadow-[0_-50px_100px_rgba(0,0,0,0.9)] py-32 px-6">
          <div className="max-w-7xl mx-auto">
            
            {/* Creative Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              
              {/* Left Side: Professional Content (7 Cols) */}
              <div className="lg:col-span-7 space-y-8">
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-black/[0.03] border border-black/5 rounded-full">
                  <div className="w-2 h-2 bg-[#39ff14] rounded-full animate-pulse" />
                  <span className="text-black font-bold tracking-widest uppercase text-[10px]">Real-World Performance</span>
                </div>
                
                <h3 className="text-5xl md:text-8xl font-black text-black tracking-tighter leading-none">
                  TRUSTED BY <br /> 500K+ DRIVERS.
                </h3>
                
                <p className="text-gray-600 text-xl md:text-2xl font-light leading-relaxed max-w-2xl">
                  Unicore provides an <span className="text-black font-bold underline decoration-[#39ff14] decoration-4">invisible shield</span> that 
                  seals punctures instantly without you even noticing. 
                </p>
                
                <div className="flex flex-wrap gap-6 pt-4">
                  <button className="px-12 py-5 bg-black text-white rounded-full font-black uppercase tracking-tighter hover:bg-[#39ff14] hover:text-black transition-all shadow-2xl active:scale-95">
                    View Lab Test Results
                  </button>
                  <div className="flex items-center gap-4 px-6 py-4 border border-black/5 rounded-full">
                    <span className="text-2xl">🌍</span>
                    <p className="text-[10px] font-bold text-gray-400 uppercase leading-tight">Certified for <br/>Global Standards</p>
                  </div>
                </div>
              </div>

              {/* Right Side: Creative Feature Card (5 Cols) */}
              <div className="lg:col-span-5 relative">
                <motion.div 
                  initial={{ rotate: 2, y: 40, opacity: 0 }}
                  whileInView={{ rotate: 0, y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="bg-black rounded-[50px] p-12 text-white shadow-[0_40px_80px_rgba(0,0,0,0.2)] relative overflow-hidden group"
                >
                  {/* Subtle Glow inside card */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#39ff14]/10 blur-[60px] rounded-full group-hover:bg-[#39ff14]/20 transition-all" />
                  
                  <div className="flex justify-between items-start mb-20">
                    <div className="w-16 h-16 bg-[#39ff14] rounded-3xl flex items-center justify-center text-black shadow-[0_10px_30px_rgba(57,255,20,0.3)]">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-[10px] font-black tracking-widest text-[#39ff14] uppercase border border-[#39ff14]/30 px-3 py-1 rounded-full">ISO: 2026</span>
                  </div>

                  <h4 className="text-3xl font-black italic mb-6 leading-tight">
                    "THE FASTEST SEAL WE'VE EVER TESTED IN OUR LAB."
                  </h4>
                  <div className="h-[1px] w-full bg-white/10 mb-6" />
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">— AutoTech International</p>
                </motion.div>

                {/* Decorative floating element */}
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-[#39ff14] rounded-full blur-[80px] opacity-20" />
              </div>

            </div>
          </div>
        </section>
      </div>

    </div>
  );
};

export default StickyRevealSection;