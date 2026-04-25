import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Calendar, Star, Zap } from 'lucide-react';

const Experience = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const headerRef = useRef(null);

  // Mouse spotlight values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [headerRelPos, setHeaderRelPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    // Card spotlight
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    }
    // Header reveal spotlight
    if (headerRef.current) {
      const rect = headerRef.current.getBoundingClientRect();
      setHeaderRelPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  // Smooth springs for scroll reveal
  const springConfig = { damping: 20, stiffness: 100 };
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2, 0.45], [0, 0, 1]), springConfig);
  const scale = useSpring(useTransform(scrollYProgress, [0.2, 0.45], [0.95, 1]), springConfig);
  const y = useSpring(useTransform(scrollYProgress, [0.2, 0.45], [50, 0]), springConfig);

  const isCardVisible = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative h-[600vh] bg-[#020203] w-full z-10"
    >
      {/* Dynamic Background Aura */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-violet-600/10 blur-[150px] rounded-full" />
      </div>

      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center gap-12 px-6 overflow-hidden z-50">

        {/* MATCHING EDUCATION STYLE HEADING WITH GRADIENT & ENHANCED VISIBILITY */}
        <div
          ref={headerRef}
          className="relative inline-block"
        >
          <h2
            className="text-[10vw] font-black uppercase text-white leading-none tracking-tighter whitespace-nowrap"
            style={{
              fontFamily: '"Outfit", sans-serif',
              WebkitTextStroke: "1px rgba(255,255,255,0.2)"
            }}
          >
            {"Experience".split("").map((char, i) => (
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
            className="text-[10vw] font-black uppercase leading-none tracking-tighter absolute inset-0 pointer-events-none whitespace-nowrap bg-gradient-to-r from-[#F0FF42] via-[#E2FF3B] to-[#F0FF42] bg-clip-text text-transparent"
            style={{
              fontFamily: '"Outfit", sans-serif',
              clipPath: `circle(120px at ${headerRelPos.x}px ${headerRelPos.y}px)`,
              WebkitClipPath: `circle(120px at ${headerRelPos.x}px ${headerRelPos.y}px)`,
            }}
          >
            {"Experience".split("").map((char, i) => (char === " " ? "\u00A0" : char)).map((char, i) => (
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

        {/* ENHANCED PREMIUM CARD */}
        <motion.div
          ref={cardRef}
          style={{ opacity, scale, y, pointerEvents: useTransform(isCardVisible, (v) => v > 0.5 ? "auto" : "none") }}
          className="relative z-[2147483647] w-full max-w-7xl bg-[#0A0A0F]/60 backdrop-blur-3xl border border-white/20 rounded-[4rem] shadow-[0_50px_200px_rgba(0,0,0,1)] overflow-hidden group transition-transform duration-500 hover:border-white/40"
        >
          {/* Animated Mouse Spotlight (Inside Card) */}
          <motion.div
            className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
            style={{
              background: useTransform(
                [mouseX, mouseY],
                ([x, y]) => `radial-gradient(800px circle at ${x}px ${y}px, rgba(139, 92, 246, 0.15), transparent 40%)`
              )
            }}
          />

          {/* Glowing Border Animation */}
          <div className="absolute inset-0 p-[2px] rounded-[4rem] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/30 via-transparent to-blue-500/30 opacity-50" />
          </div>

          <div className="relative z-20 p-8 md:p-12 flex flex-col gap-8">

            {/* Header with Glass Badges */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-violet-600/20 text-violet-400 border border-violet-500/30 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
                    <Zap size={10} className="fill-current" />
                    Internship
                  </span>
                </div>

                <h3 className="text-3xl md:text-5xl font-black tracking-tighter uppercase text-white drop-shadow-2xl" style={{ fontFamily: '"Outfit", sans-serif' }}>
                  <span className="bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent">Athena</span>
                  <span className="text-[#F0FF42] ml-3">LMS</span>
                </h3>
              </div>

              <div className="flex items-center gap-4 px-6 py-3 bg-white/5 rounded-2xl w-fit border border-white/10 shadow-inner backdrop-blur-3xl group-hover:bg-white/10 transition-colors">
                <Calendar size={16} className="text-[#F0FF42]" />
                <div className="flex flex-col">
                  <span className="text-white/40 text-[8px] font-black uppercase tracking-widest">Timeline</span>
                  <span className="text-white text-[10px] font-black uppercase tracking-widest">Feb 2026 – Present</span>
                </div>
              </div>
            </div>

            <div className="h-[1px] bg-gradient-to-r from-white/20 via-white/5 to-transparent w-full" />

            {/* Detailed Vertical 3 Achievement Points */}
            <div className="flex flex-col gap-8 max-w-5xl">
              {[
                "Spearheaded the end-to-end frontend architecture and development of the Virtual Instructor platform, delivering a robust and high-performance user interface from the ground up.",
                "Developed and integrated a sophisticated 3D Book viewing experience, leveraging modern web technologies to provide an immersive and interactive reading environment for users.",
                "Optimized the entire eBook ecosystem by implementing high-fidelity UI enhancements and consistency patterns, resulting in significantly improved platform usability."
              ].map((text, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="flex gap-5 items-center group/item"
                >
                  <div className="relative flex-shrink-0">
                    <div className="absolute inset-0 bg-[#F0FF42] blur-xl opacity-0 group-hover/item:opacity-20 transition-opacity" />
                    <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center group-hover/item:bg-[#F0FF42] transition-colors duration-500">
                      <Star size={16} className="text-[#F0FF42] group-hover/item:text-black transition-colors fill-current" />
                    </div>
                  </div>
                  <p className="text-white text-sm md:text-lg font-medium leading-relaxed opacity-70 group-hover/item:opacity-100 transition-opacity">
                    {text}
                  </p>
                </motion.div>
              ))}
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Experience;