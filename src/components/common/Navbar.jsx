import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Products', href: '#products' },
    { name: 'Technology', href: '#tech' },
    { name: 'Safety', href: '#safety' },
    { name: 'Testimonials', href: '#reviews' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
        isScrolled || mobileMenuOpen
          ? 'py-4 bg-black/80 backdrop-blur-xl border-b border-white/5' 
          : 'py-8 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-2 group cursor-pointer relative z-[110]">
          <div className="w-8 h-8 bg-[#39ff14] rounded-lg flex items-center justify-center group-hover:rotate-[15deg] transition-transform">
            <span className="text-black font-black text-xl italic">U</span>
          </div>
          <span className="text-white font-black text-2xl tracking-tighter uppercase">
            Unicore<span className="text-[#39ff14]">.</span>
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              whileHover={{ y: -2 }}
              className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-[#39ff14] transition-colors"
            >
              {link.name}
            </motion.a>
          ))}
        </div>

        {/* Right Action Button (Desktop Only) */}
        <div className="hidden md:flex items-center gap-6">
          <button className="text-[11px] font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors">
            Login
          </button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2.5 bg-[#39ff14] text-black font-black text-[11px] uppercase tracking-wider rounded-full"
          >
            Buy Now
          </motion.button>
        </div>

        {/* --- MOBILE TOGGLE (Fixed Z-Index) --- */}
        <div 
          className="md:hidden relative z-[110] p-2 -mr-2 cursor-pointer" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <div className="space-y-1.5 flex flex-col items-end">
            <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
            <div className={`w-6 h-0.5 bg-[#39ff14] transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </div>
      </div>

      {/* --- MOBILE MENU OVERLAY --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 h-screen w-full bg-[#050505] z-[100] flex flex-col items-center justify-center gap-6 px-6"
          >
            {/* Background Text for Aesthetic */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/[0.02] text-[150px] font-black pointer-events-none uppercase">
              Menu
            </div>

            {navLinks.map((link, i) => (
              <motion.a 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                key={link.name} 
                href={link.href} 
                onClick={() => setMobileMenuOpen(false)}
                className="text-4xl font-black uppercase tracking-tighter text-white hover:text-[#39ff14] transition-colors relative z-10"
              >
                {link.name}
              </motion.a>
            ))}
            
            <motion.button 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-8 w-full max-w-xs py-4 bg-[#39ff14] text-black font-black rounded-full uppercase tracking-widest text-sm shadow-[0_10px_30px_rgba(57,255,20,0.3)]"
            >
              Get Started
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;