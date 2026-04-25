import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, MapPin, Github, Instagram } from 'lucide-react';
import meImage from '../assets/me.png';

/* ── inject global styles once ── */
const injectAboutStyles = (() => {
  let injected = false;
  return () => {
    if (injected) return;
    injected = true;
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;700;900&display=swap');

      @keyframes aboutFloat {
        0%, 100% { transform: translateY(0px); }
        50%       { transform: translateY(-14px); }
      }
      @keyframes aboutPulseGlow {
        0%, 100% { opacity: 0.4; transform: scale(1); }
        50%       { opacity: 0.7; transform: scale(1.08); }
      }
      @keyframes aboutLineExpand {
        from { width: 0; }
        to   { width: 100%; }
      }
      .about-noise::after {
        content: '';
        position: absolute;
        inset: 0;
        opacity: 0.035;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        background-size: 128px;
        pointer-events: none;
        z-index: 1;
      }
      .about-heading {
        font-family: 'Bebas Neue', 'Outfit', sans-serif;
        line-height: 0.88;
        letter-spacing: 0.02em;
      }
      .about-image-float {
        animation: aboutFloat 7s ease-in-out infinite;
      }
      .about-glow-orb {
        animation: aboutPulseGlow 4s ease-in-out infinite;
      }
      .about-strip-item {
        position: relative;
      }
      .about-strip-item::after {
        content: '·';
        position: absolute;
        right: -1px;
        top: 50%;
        transform: translateY(-50%);
        color: rgba(166,77,121,0.4);
        font-size: 1.2rem;
      }
      .about-strip-item:last-child::after {
        display: none;
      }
    `;
    document.head.appendChild(style);
  };
})();

const About = () => {
  const sectionRef = React.useRef(null);
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = React.useState(false);
  const [cursorVariant, setCursorVariant] = React.useState("default");

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  React.useEffect(() => { injectAboutStyles(); }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-4%', '4%']);

  const headingVariants = {
    hidden: { opacity: 0, x: -80 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.75, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: 'easeOut' } },
  });

  return (
    <section
      id="about"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setCursorVariant('default');
      }}
      className="relative about-noise overflow-hidden cursor-none"
      style={{
        minHeight: window.innerWidth > 768 ? '100vh' : 'auto',
        background: 'linear-gradient(145deg, #0D0D0D 0%, #111118 40%, #130B10 100%)',
      }}
    >
      {/* DIFFERENCE HIGHLIGHTER CURSOR */}
      <motion.div
        className="fixed top-0 left-0 rounded-full flex items-center justify-center pointer-events-none z-[9999]"
        animate={{
          x: mousePos.x - (cursorVariant === 'hover' ? 65 : 6),
          y: mousePos.y - (cursorVariant === 'hover' ? 65 : 6),
          width: cursorVariant === 'hover' ? 90 : 30,
          height: cursorVariant === 'hover' ? 90 : 30,
          opacity: isHovering ? 1 : 0,
          backgroundColor: '#fff',
          mixBlendMode: 'difference',
          scale: isHovering ? 1 : 0
        }}
        transition={{ type: "spring", stiffness: 450, damping: 30, mass: 0.2 }}
      />
      {/* ─── Background radial glows ─── */}
      <div
        className="absolute about-glow-orb pointer-events-none"
        style={{
          width: '50vw',
          height: '50vw',
          top: '-5%',
          right: '-10%',
          background: 'radial-gradient(circle, rgba(224, 36, 130, 0.18) 0%, transparent 65%)',
          filter: 'blur(60px)',
          zIndex: 0,
        }}
      />
      <div
        className="absolute about-glow-orb pointer-events-none"
        style={{
          width: '45vw',
          height: '45vw',
          bottom: '10%',
          left: '-5%',
          background: 'radial-gradient(circle, rgba(142,58,141,0.14) 0%, transparent 65%)',
          filter: 'blur(70px)',
          zIndex: 0,
        }}
      />
      <div
        className="absolute animate-pulse pointer-events-none opacity-40"
        style={{
          width: '30vw',
          height: '30vw',
          top: '30%',
          left: '20%',
          background: 'radial-gradient(circle, rgba(166,77,121,0.06) 0%, transparent 60%)',
          filter: 'blur(90px)',
          zIndex: 0,
        }}
      />

      {/* ─── Main 2-column grid ─── */}
      <div
        className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 flex flex-col lg:flex-row items-center min-h-0 lg:min-h-screen gap-6 lg:gap-0 py-8 md:py-16"
      >

        <div className="w-full lg:w-[60%] flex flex-col justify-center py-8 lg:py-0 lg:pr-16">

          {/* Eyebrow tag */}
          <motion.div
            variants={fadeUp(0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-10"
          >
            <span
              className="inline-block w-10 h-[2px]"
              style={{ background: 'linear-gradient(to right, #A64D79, #8E3A8D)' }}
            />
            <span
              className="text-[11px] font-bold tracking-[0.45em] uppercase"
              style={{ color: '#A64D79', fontFamily: '"Inter", sans-serif' }}
            >
              Introduction
            </span>
          </motion.div>

          {/* ── Big Heading ── */}
          <div className="overflow-hidden mb-4">
            {['HELLO, I\'M', 'SAKSHI', 'KUMARI'].map((line, i) => (
              <motion.div
                key={line}
                custom={i}
                variants={headingVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="about-heading block"
                style={{
                  fontSize: 'clamp(4.5rem, 11vw, 9rem)',
                  color: i === 0 ? 'rgba(240,240,240,0.55)' : '#F0F0F0',
                  background: i === 1
                    ? 'linear-gradient(90deg, #F0F0F0 30%, #A64D79 100%)'
                    : 'none',
                  WebkitBackgroundClip: i === 1 ? 'text' : 'unset',
                  WebkitTextFillColor: i === 1 ? 'transparent' : 'unset',
                  backgroundClip: i === 1 ? 'text' : 'unset',
                }}
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
              >
                {line}
              </motion.div>
            ))}
          </div>

          {/* Gradient divider line */}
          <motion.div
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.5, ease: 'easeOut' }}
            className="mb-10"
            style={{
              height: '1px',
              background: 'linear-gradient(to right, #A64D79, rgba(142,58,141,0.3), transparent)',
              maxWidth: '480px',
            }}
          />

          {/* ── Description ── */}
          <motion.p
            variants={fadeUp(0.5)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
              color: '#9A9A9A',
              lineHeight: 1.95,
              maxWidth: '480px',
            }}
          >
            I am a final-year B.Tech student and a Full Stack Developer, focused on building responsive, clean, and visually appealing web applications. I create websites that not only look good but also provide a smooth and efficient user experience.
          </motion.p>
        </div>

        {/* ══════════════════════════════
            RIGHT – Image Panel (40%)
        ══════════════════════════════ */}
        <div className="hidden lg:flex w-full lg:w-[40%] items-center justify-center relative py-12 lg:py-0">

          {/* Pink / purple decorative circle */}
          <div
            className="absolute about-glow-orb rounded-full pointer-events-none"
            style={{
              width: '75%',
              aspectRatio: '1',
              background: 'radial-gradient(ellipse, rgba(166,77,121,0.25) 0%, rgba(142,58,141,0.15) 45%, transparent 70%)',
              filter: 'blur(2px)',
              zIndex: 0,
            }}
          />

          {/* Crisp outer ring */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: '72%',
              aspectRatio: '1',
              border: '1px solid rgba(166,77,121,0.25)',
              zIndex: 0,
            }}
          />
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: '80%',
              aspectRatio: '1',
              border: '1px dashed rgba(166,77,121,0.1)',
              zIndex: 0,
            }}
          />

          {/* High-Fidelity Editorial Image Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
            style={{ y: imgY, zIndex: 1 }}
            className="relative flex items-center justify-center cursor-pointer"
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
          >
            <div className="relative" style={{ width: 'clamp(450px, 50vw, 750px)', height: 'clamp(650px, 80vh, 950px)' }}>

              {/* The "Japan/Editorial" Bold Circle */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  width: '55%',
                  aspectRatio: '1',
                  background: '#A64D79', // Bold solid brand color
                  zIndex: -1,
                  boxShadow: '0 0 60px rgba(166,77,121,0.2)'
                }}
              />

              {/* The Profile Image - Assuming cutout or using object-contain to overlap */}
              <div className="absolute inset-x-0 bottom-0 h-full flex items-end justify-center">
                <img
                  src={meImage}
                  alt="Sakshi Kumari"
                  className="w-auto h-[110%] object-contain select-none pointer-events-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                  style={{
                    filter: 'contrast(1.05) brightness(1.05)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                    maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ─── Section number ─── */}
      <div
        className="absolute bottom-10 left-8 md:left-16 z-10 hidden md:block"
        style={{
          fontFamily: '"Outfit", sans-serif',
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.4em',
          color: 'rgba(255,255,255,0.12)',
          textTransform: 'uppercase',
        }}
      >
        01 · Introduction
      </div>
    </section>
  );
};

export default About;
