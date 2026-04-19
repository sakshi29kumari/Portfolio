import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import tocImage from '../assets/TOC.jpg';

const tocItems = [
  { num: '01', label: 'INTRODUCTION', href: '#about' },
  { num: '02', label: 'EDUCATION', href: '#education' },
  { num: '03', label: 'EXPERIENCE', href: '#experience' },
  { num: '04', label: 'SKILLS', href: '#skills' },
  { num: '05', label: 'PROJECTS', href: '#projects' },
  { num: '06', label: 'CONTACT', href: '#contact' },
];

/* ── keyframe styles injected once ── */
const injectStyles = (() => {
  let injected = false;
  return () => {
    if (injected) return;
    injected = true;
    const style = document.createElement('style');
    style.textContent = `
      .toc-noise::after {
        content: '';
        position: absolute;
        inset: 0;
        opacity: 0.03;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        background-size: 128px;
        pointer-events: none;
        z-index: 10;
      }
      
      .toc-card {
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
      }
      .group:hover .toc-card {
        border-color: rgba(166, 77, 121, 0.5);
        background: rgba(255, 255, 255, 0.08);
        transform: translateY(-10px);
        box-shadow: 0 40px 80px rgba(0, 0, 0, 0.6), 0 0 20px rgba(166, 77, 121, 0.1);
      }

      .toc-link-line {
        height: 1px;
        background: linear-gradient(to right, #A64D79, #8E3A8D);
        width: 0;
        transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .group:hover .toc-link-line {
        width: 100%;
      }

    `;
    document.head.appendChild(style);
  };
})();

const TableOfContents = () => {
  const ref = useRef(null);

  // Inject styles on first render
  React.useEffect(() => { injectStyles(); }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Hides the global navbar when this section is active
  React.useEffect(() => {
    const navbar = document.querySelector('nav');
    if (!navbar) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          navbar.style.opacity = '0';
          navbar.style.pointerEvents = 'none';
        } else {
          navbar.style.opacity = '1';
          navbar.style.pointerEvents = 'auto';
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.8, 1], [1, 0.95]);
  
  // Parallax Values
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const imgScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05]);

  return (
    <div ref={ref} className="relative bg-[#050505] contact-noise" style={{ height: '180vh' }}>
      
      {/* Background Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(166,77,121,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(142,58,141,0.05)_0%,transparent_50%)] pointer-events-none" />

      {/* STICKY CONTAINER */}
      <motion.div
        style={{ opacity, scale }}
        className="sticky top-0 h-screen w-full flex overflow-hidden z-[150]"
      >
        {/* ═══ LEFT SIDE: Parallax Image Panel ═══ */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:block w-[22%] h-full relative overflow-hidden z-10 border-r border-white/5"
        >
          <motion.img
            src={tocImage}
            alt="Contents"
            style={{ y: imgY, scale: imgScale }}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
          />
          {/* Dark Gradient Overlays */}
          <div className="absolute inset-x-0 inset-y-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
          
          {/* Edge Blur Overlay */}
          <div className="absolute inset-0 backdrop-blur-[1px] pointer-events-none" />
        </motion.div>

        {/* ═══ RIGHT SIDE: Content Area ═══ */}
        <div className="flex-1 h-full flex flex-col justify-center py-24 px-6 md:px-12 lg:pl-32 lg:pr-24 relative z-10">

          <div className="w-full max-w-6xl mx-auto py-72">

            {/* ── Header Section ── */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex flex-col">
                  <span className="text-white/40 text-[clamp(1rem,2vw,1.5rem)] font-light tracking-[0.6em] uppercase mb-4 block">
                    Table of
                  </span>
                  <h2
                    className="font-black uppercase tracking-tight leading-[0.85] text-transparent bg-clip-text bg-gradient-to-br from-[#A64D79] via-[#8E3A8D] to-[#A64D79]"
                    style={{
                      fontFamily: '"Outfit", "Inter", sans-serif',
                      fontSize: 'clamp(4rem, 10vw, 8.5rem)',
                      backgroundSize: '200% auto',
                      animation: 'tocShimmer 8s linear infinite',
                    }}
                  >
                    CONTENTS
                  </h2>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.6 }}
                className="max-w-[340px] pb-4 border-l-2 border-[#A64D79]/30 pl-8 translate-y-6"
              >
                <p
                  className="text-[11px] md:text-sm font-medium uppercase tracking-[0.2em] leading-relaxed text-white/60"
                  style={{ fontFamily: '"Outfit", sans-serif' }}
                >
                  "TRANSCENDING TRADITIONAL <span className="text-[#A64D79]">INTERFACES</span> TO BUILD THE FUTURE OF INTERACTIVE DESIGN."
                  <br />
                  <motion.span 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="text-[#A64D79] font-black mt-4 inline-block tracking-[0.5em] drop-shadow-[0_0_10px_rgba(166,77,121,0.3)]"
                  >
                    — INDEX 0.26
                  </motion.span>
                </p>
              </motion.div>
            </div>

            {/* ── Bento Grid ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-32">
              {tocItems.map((item, idx) => {
                return (
                  <motion.a
                    key={item.num}
                    href={item.href}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.8,
                      delay: 0.2 + idx * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={{ 
                      y: -10,
                      scale: 1.05,
                      transition: { duration: 0.4, ease: "easeOut" }
                    }}
                    className="group relative flex flex-col p-8 rounded-[2rem] toc-card cursor-pointer h-[150px] justify-end overflow-hidden"
                    style={{ textDecoration: 'none' }}
                  >
                    {/* Background Index Number (Enhanced Visibility) */}
                    <div className="absolute top-4 right-10 pointer-events-none transition-all duration-700 group-hover:scale-110 group-hover:translate-x-2 group-hover:-translate-y-2">
                      <span
                        className="text-8xl md:text-9xl font-black italic select-none opacity-10 group-hover:opacity-30 group-hover:text-[#A64D79] transition-all duration-700"
                        style={{
                          fontFamily: '"Outfit", sans-serif',
                          WebkitTextStroke: '1px rgba(255,255,255,0.1)',
                          textShadow: '0 0 40px rgba(166,77,121,0)',
                        }}
                      >
                        {item.num}
                      </span>
                    </div>

                    <div className="relative z-10 w-full mb-4">
                      <h3
                        className="text-xl md:text-2xl font-black tracking-widest uppercase transition-all duration-500 group-hover:text-white"
                        style={{
                          fontFamily: '"Outfit", sans-serif',
                          color: 'rgba(255,255,255,0.8)',
                          textShadow: '0 0 30px rgba(0,0,0,0.5)',
                        }}
                      >
                        {item.label}
                      </h3>
                      
                      {/* Animated Bottom Line */}
                      <div className="toc-link-line mt-4 group-hover:shadow-[0_0_15px_rgba(166,77,121,0.5)]" />
                      
                      {/* Subtle hover glow gradient */}
                      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#A64D79]/0 group-hover:bg-[#A64D79]/10 rounded-full blur-3xl transition-all duration-700" />
                    </div>
                  </motion.a>
                );
              })}
            </div>

          </div>

          </div>

          {/* Scroll Progress Indicator (Right Side) */}
          <div className="absolute bottom-12 right-6 md:right-12 hidden md:flex flex-col items-center gap-6 h-40">
            <div className="relative w-[1px] h-full bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                style={{ height: '100%', scaleY: scrollYProgress, originY: 0 }}
                className="w-full bg-gradient-to-b from-[#A64D79] to-[#8E3A8D] shadow-[0_0_10px_rgba(166,77,121,0.5)]"
              />
              {/* Moving Dot */}
              <motion.div 
                style={{ top: useTransform(scrollYProgress, [0, 1], ['0%', '100%']) }}
                className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white border-2 border-[#A64D79] shadow-[0_0_15px_rgba(166,77,121,0.8)] z-20"
              />
            </div>
        </div>

      </motion.div>

    </div>
  );
};

export default TableOfContents;
