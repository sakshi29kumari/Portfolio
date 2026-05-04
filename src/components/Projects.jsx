import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Asset Imports
import RentPe1 from '../assets/RentPe1.png';
import RentPe2 from '../assets/RentPe2.png';
import PrintingPress1 from '../assets/PrintingPress1.png';
import PrintingPres2 from '../assets/PrintingPres2.png';
import learning from '../assets/projects/learning.png';
import ai_career from '../assets/projects/ai_career.png';
import p1 from '../assets/projects/p1.png';
import p2 from '../assets/projects/p2.png';
import p3 from '../assets/projects/p3.png';

const PROJECTS = [
  {
    number: '01',
    client: 'RentPe',
    title: 'Fashion Rental Website',
    images: [RentPe2, RentPe1, RentPe1],
    glow: 'rgba(166, 77, 121, 0.9)', // Pink Glow
    tags: ['REACT', 'TAILWIND', 'NODE.JS', 'E-COMMERCE'],
  },
  {
    number: '02',
    client: 'Industrial',
    title: 'Printing Press Website',
    images: [PrintingPress1, PrintingPres2, PrintingPres2],
    glow: 'rgba(106, 27, 154, 0.9)', // Purple Glow
    tags: ['NEXT.JS', 'POSTGRESQL', 'INDUSTRIAL'],
  },
  {
    number: '03',
    client: 'EdTech',
    title: 'Gamified Learning Platform',
    images: [learning, learning, learning],
    glow: 'rgba(21, 101, 192, 0.9)', // Blue Glow
    tags: ['REACT', 'FRAMER MOTION', 'GAMIFICATION'],
  },
  {
    number: '04',
    client: 'AI Career Suite',
    title: 'AI Career Guidance and Skill Recommendation System',
    images: [ai_career, p1, p3],
    glow: 'rgba(0, 150, 136, 0.9)', // Teal/Dark Glow
    tags: ['GENERATIVE AI', 'PYTHON', 'REACT', 'DATA'],
  }
];

const ProjectCard = ({ project, index, range, targetScale }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  });

  const scale = useTransform(scrollYProgress, range, [1, targetScale]);

  return (
    <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
      <motion.div
        className="relative h-[90vh] md:h-[85vh] w-full max-w-[1400px] rounded-[2rem] md:rounded-[3rem] bg-[#0D0D0E] border border-white/10 shadow-2xl overflow-hidden flex flex-col p-6 md:p-12 group transition-all duration-700 hover:border-white/40"
        style={{
          scale,

          top: `calc(-5vh + ${index * 40}px)`,
          willChange: "transform",
        }}
      >
        {/* Dynamic Project Glow Aura - Simplified */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity duration-1000"
          style={{
            background: `radial-gradient(circle at 100% 0%, ${project.glow} 0%, transparent 60%), 
                        radial-gradient(circle at 0% 100%, ${project.glow} 0%, transparent 60%)`
          }}
        />

        {/* Card Noise Texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
        />

        {/* Card Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-6 mb-8 relative z-10 w-full">
          <div className="flex gap-4 md:gap-8 items-start">
            <div className="relative group/num">
              <span className="text-6xl md:text-9xl font-black text-white leading-none relative z-10" style={{ fontFamily: '"Outfit", sans-serif' }}>
                {project.number}
              </span>
              {/* Number Glow Aura - Simplified */}
              <div
                className="absolute inset-0 blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"
                style={{ backgroundColor: project.glow }}
              />
            </div>
            <div className="flex flex-col mt-2">
              <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-white/40 mb-2">
                Project Evolution
              </span>
              <h3
                className="text-2xl md:text-5xl font-bold text-white uppercase tracking-tight mb-4 transition-all duration-500"
                style={{ fontFamily: '"Outfit", sans-serif' }}
              >
                {project.client}
              </h3>
              <div className="flex flex-wrap gap-3">
                {project.tags.map(tag => (
                  <span key={tag}
                    className="text-[10px] font-black tracking-widest px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white/50 transition-all duration-300 group-hover:bg-white/10 group-hover:text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <motion.div
            className="group/btn relative px-6 py-3 md:px-8 md:py-4 rounded-full border border-white/20 text-white text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] overflow-hidden cursor-pointer bg-white/5 whitespace-nowrap self-start sm:self-auto"
            whileHover={{
              scale: 1.02
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
            <span className="relative z-10 group-hover/btn:text-black transition-colors duration-500">Live Project</span>
          </motion.div>
        </div>

        {/* 3-Image Grid Layout Centered */}
        <div className="flex-1 overflow-hidden flex flex-col md:grid md:grid-cols-12 gap-4 md:gap-5 min-h-0 relative z-10 p-0 md:p-6">
          {/* Left Small Image (Hidden on mobile for better focus) */}
          <div className="hidden md:block md:col-span-3 relative rounded-[2.5rem] overflow-hidden border border-white/20 h-full shadow-xl group/img2 bg-zinc-900">
            <img
              src={project.images[1]}
              className="w-full h-full object-cover transition-transform duration-700 group-hover/img2:scale-105"
              alt=""
              style={{ transform: 'translateZ(0)' }}
            />
            <div className="absolute inset-0 bg-black/40 transition-opacity duration-700 group-hover/img2:opacity-20" />
          </div>

          {/* Center Large Image (Main Impact) */}
          <div className="flex-1 md:col-span-6 relative rounded-[1.5rem] md:rounded-[3rem] overflow-hidden border border-white/20 h-full shadow-2xl group/img bg-zinc-900">
            <motion.img
              src={project.images[0]}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              loading="lazy"
              style={{ transform: 'translateZ(0)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 transition-opacity duration-700" />
          </div>

          {/* Right Small Image (Hidden on mobile for better focus) */}
          <div className="hidden md:block md:col-span-3 relative rounded-[2.5rem] overflow-hidden border border-white/20 h-full shadow-xl group/img3 bg-zinc-900">
            <img
              src={project.images[2]}
              className="w-full h-full object-cover transition-transform duration-700 group-hover/img3:scale-105"
              alt=""
              style={{ transform: 'translateZ(0)' }}
            />
            <div className="absolute inset-0 bg-black/40 transition-opacity duration-700 group-hover/img3:opacity-20" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="relative bg-[#0A0A0B] py-15 pb-15 overflow-visible">
      <div className="max-w-[1400px] mx-auto px-8 md:px-16 mb-12 relative z-10">
        <div className="relative inline-block">
          <h2 className="text-[12vw] font-black uppercase text-white tracking-tighter leading-none" style={{ fontFamily: '"Outfit", sans-serif' }}>
            Project<span className="text-[#A64D79]">s</span>
          </h2>
          <div className="w-32 h-1 bg-[#A64D79] mt-6" />
        </div>
      </div>

      {/* Projects Stacking Container */}
      <div className="relative px-4 md:px-12 flex flex-col gap-[15vh]">
        {PROJECTS.map((project, i) => {
          const targetScale = 1 - ((PROJECTS.length - i) * 0.03);
          return (
            <ProjectCard
              key={project.number}
              index={i}
              project={project}
              range={[i * 0.2, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Projects;
