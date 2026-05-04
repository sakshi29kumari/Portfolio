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
        className="flex flex-col md:flex-row-reverse items-end md:items-center gap-2 p-2 rounded-[1.5rem] md:rounded-full transition-all duration-500 bg-[#0A0A0B]/80 backdrop-blur-3xl border border-white/10 hover:border-[#A64D79]/30 shadow-2xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className="bg-[#A64D79] text-white px-7 py-3 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest shadow-2xl hover:scale-105 transition-all flex items-center gap-3 group whitespace-nowrap z-50 cursor-pointer"
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
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex items-center md:items-center gap-2 md:gap-4 px-4 py-2 md:py-0"
            >
              <ul className="flex flex-col md:flex-row items-end md:items-center gap-1 md:gap-2">
                {navLinks.map((link, idx) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.03 }}
                  >
                    <a
                      href={link.href}
                      onClick={() => {
                        setIsOpen(false);
                        setIsHovered(false);
                      }}
                      className="text-[10px] uppercase tracking-[0.2em] font-black text-[#F3E5F5]/40 hover:text-[#A64D79] transition-colors whitespace-nowrap block py-3 px-3 cursor-pointer"
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
