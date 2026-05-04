import React, { useRef, useEffect } from 'react';
import { Calendar, Star, Zap } from 'lucide-react';

const Experience = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    if (!section || !card) return;

    let rafId;
    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const sectionHeight = section.offsetHeight;
        const windowHeight = window.innerHeight;

        // Progress: 0 (top of section at viewport top) → 1 (bottom of section at viewport bottom)
        const scrolled = Math.max(0, -rect.top) / (sectionHeight - windowHeight);
        const progress = Math.min(1, Math.max(0, scrolled));

        // Scale from 0.3 → 1.0 during first 50% of scroll progress
        const scaleProgress = Math.min(progress / 0.5, 1);
        const scale = 0.3 + scaleProgress * 0.7;

        card.style.transform = `scale(${scale})`;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative h-[200vh] bg-[#0A0A0B] w-full z-10"
    >
      {/* Dynamic Background Aura */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-violet-600/10 blur-[150px] rounded-full" />
      </div>

      {/* Sticky container — pins content while scrolling through the 200vh section */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center gap-12 px-6 overflow-hidden z-50">

        {/* Heading */}
        <div className="relative inline-block">
          <h2
            className="text-[10vw] font-black uppercase text-white leading-none tracking-tighter whitespace-nowrap"
            style={{
              fontFamily: '"Outfit", sans-serif',
              WebkitTextStroke: "1px rgba(255,255,255,0.2)"
            }}
          >
            Experience
          </h2>
        </div>

        {/* CARD — starts at scale(0.3), grows to scale(1) via scroll */}
        <div
          ref={cardRef}
          style={{ transform: 'scale(0.3)', willChange: 'transform' }}
          className="relative w-full max-w-7xl bg-[#0D0D0E]/80 backdrop-blur-3xl border border-white/10 rounded-[3rem] md:rounded-[4rem] shadow-[0_50px_200px_rgba(0,0,0,0.8)] overflow-hidden group hover:border-white/20 transition-[border-color] duration-500"
        >
          {/* Card Noise Texture */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" 
               style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
          />
          {/* Glowing Border */}
          <div className="absolute inset-0 p-[2px] rounded-[4rem] overflow-hidden pointer-events-none">
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

            {/* Achievement Points */}
            <div className="flex flex-col gap-8 max-w-5xl">
              {[
                "Spearheaded the end-to-end frontend architecture and development of the Virtual Instructor platform, delivering a robust and high-performance user interface from the ground up.",
                "Developed and integrated a sophisticated 3D Book viewing experience, leveraging modern web technologies to provide an immersive and interactive reading environment for users.",
                "Optimized the entire eBook ecosystem by implementing high-fidelity UI enhancements and consistency patterns, resulting in significantly improved platform usability."
              ].map((text, idx) => (
                <div
                  key={idx}
                  className="flex gap-5 items-center group/item"
                >
                  <div className="relative flex-shrink-0">
                    <div className="absolute inset-0 bg-[#F0FF42] blur-xl opacity-0 group-hover/item:opacity-20 transition-opacity" />
                    <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center group-hover/item:bg-[#F0FF42] transition-colors duration-500">
                      <Star size={16} className="text-[#F0FF42] group-hover/item:text-black transition-colors fill-current" />
                    </div>
                  </div>
                  <p className="text-white text-sm md:text-xl font-medium leading-relaxed opacity-50 group-hover/item:opacity-100 transition-opacity" style={{ letterSpacing: '-0.01em' }}>
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Experience;