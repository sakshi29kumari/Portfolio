import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github } from 'lucide-react';
import meImage from '../assets/me.png';

const Hero = () => {
  const portfolioText = "PORTFOLIO";
  const [visibleLetters, setVisibleLetters] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (visibleLetters < portfolioText.length) {
      const timeout = setTimeout(() => {
        setVisibleLetters(prev => prev + 1);
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [visibleLetters]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  // Custom Mouse Cursor Logic
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [cursorVariant, setCursorVariant] = useState("default"); // 'default' | 'hover'

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="relative min-h-screen bg-[#1A1A1D] text-[#F3E5F5] overflow-hidden flex flex-col font-sans tracking-tight cursor-none"
    >
      {/* DYNAMIC CUSTOM CURSOR */}
      <motion.div
        className="fixed top-0 left-0 rounded-full flex items-center justify-center pointer-events-none z-[9999] overflow-visible"
        animate={{
          x: mousePos.x - (cursorVariant === 'hover' ? 17.5 : 30),
          y: mousePos.y - (cursorVariant === 'hover' ? 17.5 : 30),
          width: cursorVariant === 'hover' ? 35 : 60,
          height: cursorVariant === 'hover' ? 35 : 60,
          opacity: isHovering ? 1 : 0,
          backgroundColor: cursorVariant === 'hover' ? '#fff' : 'rgba(20,20,20,0.15)',
          mixBlendMode: cursorVariant === 'hover' ? 'difference' : 'normal',
          scale: isHovering ? 1 : 0.5
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25, mass: 0.2 }}
        style={{
          backdropFilter: cursorVariant === 'hover' ? 'none' : 'blur(12px)',
          backgroundImage: cursorVariant === 'default' ? 'radial-gradient(circle at center, rgba(166,77,121,0.4) 0%, transparent 70%)' : 'none'
        }}
      >
        {/* Rotating SCROLL Text (Only on Default Variant) */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, ease: "linear", repeat: Infinity }}
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${cursorVariant === 'default' ? 'opacity-100' : 'opacity-0'}`}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
            <defs>
              <path id="scrollPath" d="M 50, 50 m -34, 0 a 34,34 0 1,1 68,0 a 34,34 0 1,1 -68,0" />
            </defs>
            <text fill="rgba(255,255,255,0.75)" fontSize="11" fontWeight="600" className="uppercase" style={{ fontFamily: '"Inter", sans-serif' }}>
              <textPath href="#scrollPath" startOffset="0%" textLength="213" lengthAdjust="spacing">
                S C R O L L  ✦  S C R O L L  ✦
              </textPath>
            </text>
          </svg>
        </motion.div>
      </motion.div>

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#A64D79]/5 rounded-full blur-[150px]" />
      </div>

      {/* Top */}
      <div className="relative z-50 flex justify-between px-6 md:px-12 pt-6">
        <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-[#F3E5F5]/30">
          ©2026
        </span>
      </div>

      {/* Main */}
      <div className="flex-1 flex items-center justify-center relative z-10 px-6 md:px-12">

          {/* TEXT GROUP CONTAINER */}
          <div className="relative flex items-center justify-center">
            
            {/* SVG Filter for clean merged outline */}
            <svg width="0" height="0" className="absolute pointer-events-none">
              <filter id="merged-outline">
                <feMorphology in="SourceAlpha" result="DILATED" operator="dilate" radius="3" />
                <feFlood floodColor="#A64D79" />
                <feComposite in2="DILATED" operator="in" result="OUTLINE" />
                <feComposite in="OUTLINE" in2="SourceAlpha" operator="out" />
              </filter>
            </svg>

            {/* BACK TEXT (Solid Pink) */}
            <h1 
              className="absolute text-[20vw] md:text-[17vw] lg:text-[16vw] font-[950] tracking-normal uppercase text-[#A64D79] select-none flex whitespace-nowrap"
              style={{ 
                fontFamily: '"Outfit", "Inter", sans-serif',
                lineHeight: '0.85',
                letterSpacing: '-0.01em', // Increased gap
                transform: 'scaleY(1.25)', // Stretches height by 35%
                transformOrigin: 'bottom'
              }}
            >
              {portfolioText.split('').map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={index < visibleLetters ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {letter}
                </motion.span>
              ))}
            </h1>

            {/* FRONT TEXT (Outline) */}
            <h1
              className="relative z-40 text-[20vw] md:text-[17vw] lg:text-[16vw] font-[950] uppercase select-none flex whitespace-nowrap"
              style={{
                color: 'black',
                filter: 'url(#merged-outline)',
                fontFamily: '"Outfit", "Inter", sans-serif',
                lineHeight: '0.85',
                letterSpacing: '-0.01em',
                transform: 'scaleY(1.25)',
                transformOrigin: 'bottom'
              }}
            >
              {portfolioText.split('').map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  animate={index < visibleLetters ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                  transition={{ duration: 0.4 }}
                >
                  {letter}
                </motion.span>
              ))}

              {/* Cursor */}
              <span
                className="inline-block ml-2 self-center"
                style={{
                  width: '4px',
                  height: '12vw',
                  background: '#A64D79',
                  opacity: showCursor ? 1 : 0,
                  display: visibleLetters >= portfolioText.length ? 'none' : 'inline-block',
                }}
              />
            </h1>
          </div>

          {/* STATIC IMAGE */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] w-full max-w-[90vw] md:max-w-3xl lg:max-w-4xl aspect-square z-20 pointer-events-none"
          >
            <img
              src={meImage}
              alt="Sakshi Kumari"
              className="w-full h-full object-contain drop-shadow-[0_0_60px_rgba(166,77,121,0.12)]"
            />
          </div>

        </div>

      {/* Bottom Left - Presented By */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="absolute left-6 md:left-12 bottom-8 md:bottom-12 z-50 flex flex-col gap-2"
      >
        <div className="flex flex-col gap-1 items-start">
          <p className="text-xl md:text-2xl lg:text-3xl font-[950] tracking-tight text-[#F3E5F5]/30 uppercase">
            Presented by
          </p>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-[900] tracking-tight text-[#F3E5F5]/90 uppercase">
            Sakshi <span className="text-[#A64D79]">Kumari</span>
          </h2>
        </div>
      </motion.div>
      {/* Bottom Right - Social Links */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.4, duration: 0.8 }}
        className="absolute right-6 md:right-12 bottom-8 md:bottom-12 z-50 flex flex-col items-end gap-6"
      >
        <div className="flex flex-col gap-4 items-start">
          <a
            href="mailto:sakshi04292004@gmail.com"
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
            className="flex items-center gap-3 group transition-all"
          >
            <div className="p-2 rounded-full bg-[#A64D79]/10 text-[#A64D79] group-hover:bg-[#A64D79] group-hover:text-white transition-all">
              <Mail size={18} />
            </div>
            <span className="text-sm md:text-base font-medium tracking-wide text-[#F3E5F5]/60 group-hover:text-[#A64D79] transition-colors">
              sakshi04292004@gmail.com
            </span>
          </a>

          <a
            href="https://linkedin.com/in/sakshi-kumari"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
            className="flex items-center gap-3 group transition-all"
          >
            <div className="p-2 rounded-full bg-[#A64D79]/10 text-[#A64D79] group-hover:bg-[#A64D79] group-hover:text-white transition-all">
              <Linkedin size={18} />
            </div>
            <span className="text-sm md:text-base font-medium tracking-wide text-[#F3E5F5]/60 group-hover:text-[#A64D79] transition-colors">
              in/sakshi-kumari
            </span>
          </a>

          <a
            href="https://github.com/sakshi"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
            className="flex items-center gap-3 group transition-all"
          >
            <div className="p-2 rounded-full bg-[#A64D79]/10 text-[#A64D79] group-hover:bg-[#A64D79] group-hover:text-white transition-all">
              <Github size={18} />
            </div>
            <span className="text-sm md:text-base font-medium tracking-wide text-[#F3E5F5]/60 group-hover:text-[#A64D79] transition-colors">
              github.com/sakshi
            </span>
          </a>
        </div>
      </motion.div>

    </section>
  );
};

export default Hero;