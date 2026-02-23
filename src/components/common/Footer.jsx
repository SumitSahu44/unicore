import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="relative bg-[#050505] pt-20 pb-10 overflow-hidden font-sans">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#39ff14]/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Section */}
          <div className="space-y-6">
            <h2 className="text-3xl font-black text-white tracking-tighter">
              UNICORE<span className="text-[#39ff14]">.</span>
            </h2>
            <p className="text-gray-400 leading-relaxed text-sm max-w-xs">
              Redefining tyre safety with advanced 2-in-1 technology. Engineered for the streets, trusted by the world.
            </p>
            <div className="flex gap-4">
                <motion.a 
                whileHover={{ y: -5 }}
                href="#"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#39ff14] transition-colors"
              >
                <FaFacebookF size={14} />
              </motion.a>

              <motion.a 
                whileHover={{ y: -5 }}
                href="#"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#39ff14] transition-colors"
              >
                <FaInstagram size={14} />
              </motion.a>

              <motion.a 
                whileHover={{ y: -5 }}
                href="#"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#39ff14] transition-colors"
              >
                <FaTwitter size={14} />
              </motion.a>

              <motion.a 
                whileHover={{ y: -5 }}
                href="#"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#39ff14] transition-colors"
              >
                <FaLinkedinIn size={14} />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-white font-bold uppercase tracking-widest text-xs">Products</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="hover:text-[#39ff14] transition-colors cursor-pointer">Unicore 2-in-1</li>
              <li className="hover:text-[#39ff14] transition-colors cursor-pointer">Dazzler Sealant</li>
              <li className="hover:text-[#39ff14] transition-colors cursor-pointer">Nextgen Pro</li>
              <li className="hover:text-[#39ff14] transition-colors cursor-pointer">Accessories</li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-6">
            <h4 className="text-white font-bold uppercase tracking-widest text-xs">Company</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="hover:text-[#39ff14] transition-colors cursor-pointer">About Us</li>
              <li className="hover:text-[#39ff14] transition-colors cursor-pointer">Safety Tests</li>
              <li className="hover:text-[#39ff14] transition-colors cursor-pointer">Distributors</li>
              <li className="hover:text-[#39ff14] transition-colors cursor-pointer">Privacy Policy</li>
            </ul>
          </div>

          {/* Newsletter / Contact */}
          <div className="space-y-6">
            <h4 className="text-white font-bold uppercase tracking-widest text-xs">Stay Protected</h4>
            <p className="text-gray-400 text-sm">Get the latest safety tips and product updates.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Your email" 
                className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-6 text-sm text-white focus:outline-none focus:border-[#39ff14]/50 transition-all"
              />
              <button className="absolute right-2 top-1.5 bg-[#39ff14] text-black px-4 py-1.5 rounded-full text-xs font-bold hover:scale-105 transition-transform">
                JOIN
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-xs">
            © 2026 UNICORE TYREPROTECT. ALL RIGHTS RESERVED.
          </p>
          {/* <div className="flex items-center gap-2">
            <span className="text-gray-500 text-xs italic">Crafted by</span>
            <span className="text-white font-bold text-xs tracking-tighter">Digital Success Solutions (DSS)</span>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          </div> */}
        </div>
      </div>

      {/* Large Background Text */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 select-none pointer-events-none opacity-[0.02]">
        <h1 className="text-[15vw] font-black text-white whitespace-nowrap">EXTREME PERFORMANCE</h1>
      </div>
    </footer>
  );
};

export default Footer;