import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const education = [
  {
    year: '2022 — 2026',
    degree: 'B.Tech in Computer Science',
    institution: 'Uttarakhand Technical University',
    description: 'Specializing in scalable architectures and distributive systems. Focused on bridging the gap between core computer science principles and modern, high-performance software engineering.'
  },
  {
    year: '2020 — 2022',
    degree: 'Higher Secondary Education',
    institution: 'DAV Public School',
    description: 'Rigorous academic focus on Mathematics, Physics, and Chemistry. Developed a strong analytical foundation and problem-solving mindset crucial for engineering.'
  },
  {
    year: '2018 — 2020',
    degree: 'Secondary Education',
    institution: 'DAV Public School',
    description: 'Early exploration of logical reasoning and programming fundamentals. Consistently maintained high academic performance with a focus on core scientific disciplines.'
  }
];

const EducationEntry = ({ item, index, setVariant, mousePos }) => {
  const containerRef = useRef(null);
  const [relPos, setRelPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setRelPos({
      x: mousePos.x - rect.left,
      y: mousePos.y - rect.top
    });
  }, [mousePos]);

  const content = (isPink) => (
    <div className={`flex flex-col gap-4 text-center md:text-left ${isPink ? 'text-[#A64D79]' : 'text-white'}`}>
      <span className={`text-sm md:text-base lg:text-lg font-bold tracking-wider ${isPink ? 'text-[#A64D79]' : 'text-white/50'}`}>
        {item.year}
      </span>
      <h3 className="text-xl md:text-2xl lg:text-3xl font-black leading-tight uppercase tracking-tight" style={{ fontFamily: '"Outfit", sans-serif' }}>
        {item.degree}
      </h3>
      <div className={`text-sm md:text-base lg:text-xl font-black uppercase tracking-tight text-[#A64D79]`}>
        {item.institution}
      </div>
      <p className={`text-[11px] md:text-xs lg:text-sm leading-relaxed mt-4 max-w-[90%] mx-auto md:mx-0 font-medium ${isPink ? 'text-[#A64D79]' : 'text-white/40'}`}>
        {item.description}
      </p>
    </div>
  );

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, delay: 0.5 + index * 0.3, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ y: -10 }}
      onMouseEnter={() => setVariant('hover')}
      onMouseLeave={() => setVariant('default')}
      className="relative cursor-none group"
    >
      {content(false)}
      <div
        className="absolute inset-0 pointer-events-none select-none z-10"
        style={{
          clipPath: `circle(50px at ${relPos.x}px ${relPos.y}px)`,
          WebkitClipPath: `circle(50px at ${relPos.x}px ${relPos.y}px)`,
        }}
      >
        {content(true)}
      </div>
    </motion.div>
  );
};

const Education = () => {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const [isHovering, setIsHovering] = useState(false);
  const headerRef = useRef(null);
  const [headerRelPos, setHeaderRelPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (headerRef.current) {
        const rect = headerRef.current.getBoundingClientRect();
        setHeaderRelPos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };
    window.addEventListener("mousemove", mouseMove);
    return () => window.removeEventListener("mousemove", mouseMove);
  }, []);

  return (
    <section
      id="education"
      className="relative py-20 bg-[#050505] overflow-hidden cursor-none"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
        animate={{
          x: mousePos.x - (cursorVariant === 'hover' ? 50 : 8),
          y: mousePos.y - (cursorVariant === 'hover' ? 50 : 8),
          width: cursorVariant === 'hover' ? 100 : 16,
          height: cursorVariant === 'hover' ? 100 : 16,
          backgroundColor: cursorVariant === 'hover' ? 'transparent' : '#A64D79',
          border: 'none',
          opacity: isHovering ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28, mass: 0.5 }}
      />

      <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">

        {/* HEADER WITH FIXED ALIGNMENT */}
        <div
          ref={headerRef}
          className="relative mb-4 md:mb-8 inline-block cursor-none"
          onMouseEnter={() => setCursorVariant('hover')}
          onMouseLeave={() => setCursorVariant('default')}
        >
          <h2
            className="text-[14vw] font-black uppercase text-white leading-none tracking-tighter whitespace-nowrap"
            style={{ fontFamily: '"Outfit", sans-serif' }}
          >
            {"Education".split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 100, rotate: 10 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </h2>
          <h2
            className="text-[14vw] font-black uppercase text-[#A64D79] leading-none tracking-tighter absolute inset-0 pointer-events-none whitespace-nowrap"
            style={{
              fontFamily: '"Outfit", sans-serif',
              clipPath: `circle(50px at ${headerRelPos.x}px ${headerRelPos.y}px)`,
              WebkitClipPath: `circle(50px at ${headerRelPos.x}px ${headerRelPos.y}px)`,
            }}
          >
            {"Education".split("").map((char, i) => (char === " " ? "\u00A0" : char)).map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 100, rotate: 10 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </h2>
        </div>

        {/* HEADER SUBTEXT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-4xl mb-10"
        >
          <p className="text-[11px] md:text-xs text-white/40 uppercase tracking-[0.2em] leading-relaxed font-bold">
            Building a solid theoretical foundation in computer science and engineering,
            mastering core algorithms to complex system architectures while maintaining
            academic excellence across all major scientific disciplines.
          </p>
        </motion.div>

        {/* DOUBLE DIVIDER LINES */}
        <div className="relative mb-10 md:mb-14">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
            className="h-[4px] w-full bg-[#A64D79] origin-left"
          />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="h-[1px] w-full bg-white/10 origin-left mt-2.5"
          />
        </div>

        {/* ACADEMIC GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 lg:gap-20">
          {education.map((item, i) => (
            <EducationEntry key={i} item={item} index={i} setVariant={setCursorVariant} mousePos={mousePos} />
          ))}
        </div>

      </div>

      <div className="absolute -bottom-10 right-10 text-[18vw] font-black text-white/[0.01] select-none pointer-events-none uppercase">
        Study
      </div>
    </section>
  );
};

export default Education;
