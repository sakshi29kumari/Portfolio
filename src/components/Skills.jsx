import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  SiJavascript, SiC, SiHtml5, SiNodedotjs, SiTailwindcss,
  SiMysql, SiGit, SiVercel, SiPostman, SiReact,
  SiSpringboot, SiGithub, SiPython, SiTypescript, SiDocker, SiMongodb
} from 'react-icons/si';
import { FaCss3, FaJava } from 'react-icons/fa';
import { VscVscode } from 'react-icons/vsc';

const ORIGINAL_SKILLS = [
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#339933" },
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  { name: "Tailwind", Icon: SiTailwindcss, color: "#06B6D4" },
  { name: "HTML5", Icon: SiHtml5, color: "#E34F26" },
  { name: "CSS3", Icon: FaCss3, color: "#1572B6" },
  { name: "Java", Icon: FaJava, color: "#007396" },
  { name: "Spring Boot", Icon: SiSpringboot, color: "#6DB33F" },
  { name: "MySQL", Icon: SiMysql, color: "#4479A1" },
  { name: "Git", Icon: SiGit, color: "#F05032" },
  { name: "GitHub", Icon: SiGithub, color: "#FFFFFF" },
  { name: "VS Code", Icon: VscVscode, color: "#007ACC" },
  { name: "Postman", Icon: SiPostman, color: "#FF6C37" },
  { name: "Vercel", Icon: SiVercel, color: "#FFFFFF" },
  { name: "C", Icon: SiC, color: "#A8B9CC" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "Python", Icon: SiPython, color: "#3776AB" },
];

const BackgroundGrid = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {/* Noise Texture */}
    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

    {/* Animated Breathing Aura - Intensified */}
    <motion.div
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.2, 0.4, 0.2]
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(166,77,121,1)_0%,transparent_70%)]"
    />

    <svg className="absolute w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
          <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" strokeDasharray="2,4" />
        </pattern>
        <mask id="fade-mask">
          <radialGradient id="grad-center" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <rect width="100%" height="100%" fill="url(#grad-center)" />
        </mask>
      </defs>
      <g style={{ transform: 'perspective(1200px) rotateX(55deg) translateY(-10%) scale(1.5)' }}>
        <rect width="100%" height="100%" fill="url(#grid)" mask="url(#fade-mask)" />
      </g>
    </svg>
  </div>
);

const TechCard = ({ skill, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: 0, scale: 1.08 }}
    transition={{ type: "spring", stiffness: 300, damping: 20, delay: index * 0.04 }}
    className="relative group w-20 h-20 md:w-28 md:h-28 m-2"
  >
    {/* Outer Glow System */}
    <div className="absolute inset-0 bg-white/[0.08] backdrop-blur-xl rounded-2xl border border-white/10 transition-all duration-500 group-hover:bg-white/[0.12] group-hover:border-[#A64D79]/50 group-hover:shadow-[0_0_50px_rgba(166,77,121,0.2)]" />

    {/* Inner Bevel Highight */}
    <div className="absolute inset-[1px] rounded-[0.95rem] border border-white/10 opacity-40 pointer-events-none" />

    {/* Background Aura */}
    <div
      className="absolute inset-4 opacity-0 group-hover:opacity-10 transition-opacity duration-700 blur-2xl rounded-full"
      style={{ backgroundColor: skill.color }}
    />

    <div className="relative h-full flex flex-col items-center justify-center gap-2 p-4">
      <div className="relative group/icon">
        <skill.Icon
          className="text-2xl md:text-3xl transition-all duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100"
          style={{
            color: 'inherit' // Controlled by conditional logic or the style below
          }}
        />
        {/* Colorful Icon Overlay on hover */}
        <skill.Icon
          className="absolute inset-0 text-2xl md:text-3xl transition-all duration-700 scale-110 opacity-0 group-hover:opacity-100"
          style={{ color: skill.color }}
        />
        {/* Subtle drop shadow that appears on hover */}
        <div
          className="absolute inset-0 blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none"
          style={{ backgroundColor: skill.color }}
        />
      </div>

      <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-white/50 group-hover:text-[#A64D79] transition-colors duration-500">
        {skill.name}
      </span>
    </div>


  </motion.div>
);

const Skills = () => {
  const tiers = [
    ORIGINAL_SKILLS.slice(0, 6),
    ORIGINAL_SKILLS.slice(6, 11),
    ORIGINAL_SKILLS.slice(11, 15),
    ORIGINAL_SKILLS.slice(15, 17),
  ];

  return (
    <section id="skills" className="relative py-10 bg-[#050505] overflow-hidden min-h-[auto]">
      <BackgroundGrid />

      <div className="max-w-[1400px] mx-auto px-8 relative z-10 flex flex-col items-center mt-2">
        <div className="mb-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h2
              className="text-[10vw] md:text-[7vw] font-black uppercase tracking-[-0.04em] leading-none mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-[#A64D79]"
              style={{ fontFamily: '"Outfit", sans-serif' }}
            >
              Tech Stack
            </h2>
          </motion.div>
        </div>

        {/* Staggered Rows Pyramid */}
        <div className="flex flex-col items-center gap-1">
          {tiers.map((row, rowIndex) => (
            <div key={rowIndex} className="flex flex-wrap justify-center items-center">
              {row.map((skill, i) => (
                <TechCard key={skill.name} skill={skill} index={i + (rowIndex * 6)} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
