import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin } from 'lucide-react';

const Navbar = () => {
  const [isHovered, setIsHovered] = useState(false);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-8 right-8 md:right-12 z-[100]">
      <div
        className="flex flex-row-reverse items-center gap-4 p-2 rounded-full transition-all duration-500 bg-[#1A1A1D]/40 backdrop-blur-xl border border-[#A64D79]/10 hover:border-[#A64D79]/30"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* The Menu Trigger Button */}
        <motion.button
          className="bg-[#A64D79] text-[#1A1A1D] px-6 py-2.5 rounded-full text-[10px] md:text-xs font-bold shadow-2xl hover:bg-[#F3E5F5] transition-all flex items-center gap-2 group whitespace-nowrap"
        >
          Menu <span className="opacity-30">|</span>
          <motion.span
            animate={{ rotate: isHovered ? 90 : 0 }}
            className="inline-block"
          >
            —
          </motion.span>
        </motion.button>

        {/* The Inline Links */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: 20, width: 0 }}
              animate={{ opacity: 1, x: 0, width: 'auto' }}
              exit={{ opacity: 0, x: 20, width: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="flex items-center gap-6 pr-4 overflow-hidden"
            >
              <ul className="flex items-center gap-6">
                {navLinks.map((link, idx) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.03 }}
                  >
                    <a
                      href={link.href}
                      className="text-[10px] uppercase tracking-widest font-bold text-[#F3E5F5]/60 hover:text-[#A64D79] transition-colors whitespace-nowrap"
                      onClick={() => setIsHovered(false)}
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="h-4 w-[1px] bg-[#A64D79]/20" />

              <div className="flex items-center gap-4">
                <a href="#" className="text-[#F3E5F5]/40 hover:text-[#A64D79] transition-colors">
                  <Github size={16} />
                </a>
                <a href="#" className="text-[#F3E5F5]/40 hover:text-[#A64D79] transition-colors">
                  <Linkedin size={16} />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
