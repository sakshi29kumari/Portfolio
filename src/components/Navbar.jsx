import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
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
    <nav className="fixed top-4 right-4 md:top-8 md:right-12 z-[2147483647]">
      <div
        className="flex flex-col md:flex-row-reverse items-end md:items-center gap-4 p-2 rounded-[2rem] md:rounded-full transition-all duration-500 bg-[#1A1A1D]/40 backdrop-blur-xl border border-[#A64D79]/10 hover:border-[#A64D79]/30"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* The Menu Trigger Button */}
        <motion.button
          className="bg-[#A64D79] text-[#1A1A1D] px-6 py-2.5 rounded-full text-[10px] md:text-xs font-bold shadow-2xl hover:bg-[#F3E5F5] transition-all flex items-center gap-2 group whitespace-nowrap"
        >
          Menu <span className="opacity-30">|</span>
          <motion.span
            animate={{ rotate: (isHovered || isOpen) ? 90 : 0 }}
            className="inline-block"
          >
            —
          </motion.span>
        </motion.button>

        <AnimatePresence>
          {(isHovered || isOpen) && (
            <motion.div
              initial={{ opacity: 0, y: 10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: 10, height: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="flex items-center md:items-center gap-4 md:gap-6 px-4 py-2 md:py-0 overflow-hidden"
            >
              <ul className="flex flex-col md:flex-row items-end md:items-center gap-4 md:gap-6">
                {navLinks.map((link, idx) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.03 }}
                  >
                    <a
                      href={link.href}
                      className="text-[10px] uppercase tracking-widest font-bold text-[#F3E5F5]/60 hover:text-[#A64D79] transition-colors whitespace-nowrap block"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsOpen(false);
                        setIsHovered(false);
                      }}
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
