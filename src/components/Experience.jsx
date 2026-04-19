import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Experience = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // PHASES REFINED:
  // 0.1 - 0.3: Box grows to 50vh height and 100% width (Text is centered)
  // 0.5 - 0.7: Box grows from 50vh to 100vh (Text stays centered)
  // 0.7 - 0.8: Experience text shifts UP
  // 0.8 - 0.9: Card reveals
  
  const justTextOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  
  const boxOpacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);
  const boxWidth = useTransform(scrollYProgress, [0.1, 0.3], ["0.1%", "100%"]);
  
  const boxHeight = useTransform(scrollYProgress, 
    [0.1, 0.3, 0.5, 0.7], 
    ["1vh", "50vh", "50vh", "100vh"]
  );
 
  const expTextOpacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);
  const expTextYShift = useTransform(scrollYProgress, [0.7, 0.85], [0, -300]);
  
  const cardOpacity = useTransform(scrollYProgress, [0.8, 0.9], [0, 1]);
  const cardY = useTransform(scrollYProgress, [0.8, 0.9], [150, 0]);
  
  const blueOpacity = useTransform(scrollYProgress, [0.45, 0.55], [0, 1]);
  const orangeOpacity = useTransform(scrollYProgress, [0.45, 0.55], [0, 1]);

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-[#D1D1D1]">
      {/* Sticky view wrapper */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        


        {/* The Black Transition Box */}
        <motion.div
          style={{ width: boxWidth, height: boxHeight, opacity: boxOpacity }}
          className="relative bg-black flex items-center justify-center overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.3)]"
        >
          {/* Blue Gradient Lines (Top) */}
          <motion.div 
            className="absolute top-0 left-0 w-full h-[60px] pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, #A64D79 0%, #8E3A8D 40%, transparent 100%)',
              opacity: blueOpacity
            }}
            
          />

          {/* Blue Gradient Lines (Bottom) */}
          <motion.div 
            className="absolute bottom-0 left-0 w-full h-[120px] pointer-events-none"
            style={{
              background: 'linear-gradient(to top, #A64D79 0%, #8E3A8D 30%, #5C235A 60%, transparent 100%)',
              opacity: blueOpacity
            }}
          />

          {/* Tiny Orange marker */}
          <motion.div
            style={{ opacity: orangeOpacity }}
            className="absolute top-8 right-[35%] w-3 h-3 bg-[#A64D79] rounded-sm shadow-[0_0_15px_rgba(166,77,121,0.4)]"
          />

          {/* EXPERIENCE TEXT (Inside the Box - Only one text now) */}
          <motion.div
            style={{ opacity: expTextOpacity, y: expTextYShift }}
            className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
          >
             <h2 
                className="text-white text-4xl md:text-[12vw] font-[1000] tracking-tighter select-none uppercase leading-none"
                style={{ fontFamily: '"Outfit", sans-serif' }}
              >
                Experience
              </h2>
          </motion.div>

          {/* EXPERIENCE CARD: AThena LMS */}
          <motion.div
            style={{ opacity: cardOpacity, y: cardY }}
            className="absolute inset-0 flex items-center justify-center z-20"
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] shadow-2xl overflow-hidden relative group">
               {/* Subtle gradient glow */}
               <div className="absolute inset-0 bg-gradient-to-br from-[#A64D79]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
               
               <div className="relative z-10 flex flex-col gap-2">
                 <div className="flex justify-between items-start">
                    <span className="text-[#A64D79] text-xs font-black tracking-[0.3em] uppercase">Internship</span>
                    <span className="text-white/30 text-[10px] font-bold tracking-widest uppercase">Feb — April 2024</span>
                 </div>
                 <h3 className="text-white text-3xl md:text-4xl font-black uppercase tracking-tight mt-2" style={{ fontFamily: '"Outfit", sans-serif' }}>
                    AThena LMS
                 </h3>
                 <div className="w-12 h-[2px] bg-[#A64D79] mt-4" />
                 <p className="text-white/50 text-xs md:text-sm font-medium leading-relaxed mt-4 max-w-[90%]">
                    Contributed to the development of a modern Learning Management System, 
                    focusing on intuitive user interfaces and seamless frontend-to-backend integration.
                 </p>
               </div>
            </div>
          </motion.div>



        </motion.div>



        {/* Start Hint */}
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-black/30 text-[10px] font-black tracking-[0.5em] uppercase"
        >
          Scroll to explore
        </motion.div>

      </div>
    </div>
  );
};

export default Experience;
