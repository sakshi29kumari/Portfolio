import React from 'react';
import { motion } from 'framer-motion';
import { 
  Instagram, 
  Github, 
  Linkedin, 
  ChevronRight, 
  Download,
  Facebook,
  Palette,
  Figma
} from 'lucide-react';
import './Footer.css';

const ShapeWrapper = ({ children, color, hoverColor, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 50, color }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{ color: hoverColor }}
    viewport={{ once: true }}
    transition={{ 
      duration: 0.8, 
      delay,
      color: { duration: 0.3 }
    }}
    className="shape-item"
    style={{ color }}
  >
    <div className="shape-svg-container">
      {children}
    </div>
  </motion.div>
);

const Footer = () => {
  return (
    <footer className="footer-section">
      {/* Floating Glass Container */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="footer-content-grid"
      >
        {/* Zone 1: Identity (Left) */}
        <div className="branding-zone">
           <motion.h2 
             className="branding-name"
             whileHover={{ scale: 1.02 }}
           >
             SAKSHI<br />KUMARI
           </motion.h2>
           <div className="tagline-container">
              <span className="portfolio-tag">Portfolio &copy; 2026</span>
              <span className="desc-tag">Frontend Developer | UI Designer</span>
           </div>
        </div>

        {/* Zone 2: Resources (Middle) */}
        <motion.div 
          className="links-zone"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1, delayChildren: 0.2 }
            }
          }}
        >
           {/* Navigation Links */}
           <div className="link-group">
              <h4 className="link-title">Navigation</h4>
              <ul className="link-list">
                 {[
                   { label: 'Home', href: '#hero' },
                   { label: 'About', href: '#about' },
                   { label: 'Projects', href: '#projects' },
                   { label: 'Skills', href: '#skills' },
                   { label: 'Contact', href: '#contact' },
                 ].map((item) => (
                   <motion.li 
                     key={item.label}
                     variants={{
                       hidden: { opacity: 0, x: 20 },
                       visible: { opacity: 1, x: 0 }
                     }}
                   >
                     <a 
                       href={item.href} 
                       className="footer-link"
                       onClick={(e) => {
                         e.preventDefault();
                         const target = document.querySelector(item.href);
                         if (target) {
                           target.scrollIntoView({ behavior: 'smooth' });
                         }
                       }}
                     >
                       <ChevronRight size={18} />
                       {item.label}
                     </a>
                   </motion.li>
                 ))}
              </ul>
           </div>

           {/* Social Connects */}
           <div className="link-group">
              <h4 className="link-title">Connect</h4>
              <ul className="link-list">
                 {[
                   { name: 'GitHub', icon: Github, url: 'https://github.com/sakshi29kumari' },
                   { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/sakshi-kumari04/' }
                 ].map((s) => (
                    <motion.li 
                      key={s.name}
                      variants={{
                        hidden: { opacity: 0, x: 20 },
                        visible: { opacity: 1, x: 0 }
                      }}
                    >
                      <a href={s.url} className="footer-link">
                        <s.icon size={20} />
                        {s.name}
                      </a>
                    </motion.li>
                 ))}
              </ul>
           </div>
        </motion.div>

        {/* Zone 3: Connectivity (Right) */}
        <motion.div 
          className="inquiries-zone"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
           <h4 className="link-title">Inquiries</h4>
           <div className="contact-list">
             <a href="mailto:sakshi04292004@gmail.com" className="email-card">
                <span>Email</span>
                <span>sakshi04292004@gmail.com</span>
             </a>
           </div>
        </motion.div>
      </motion.div>

      {/* Rhythmic Abstract Shapes Row */}
      <div className="decorative-strip">
         {/* 1. Rounded X (Cyan -> Pink) */}
         <ShapeWrapper color="#00F0FF" hoverColor="#FF00E5" delay={0.05}>
            <svg viewBox="0 0 100 100" style={{ height: '85%', fill: 'currentColor' }}>
               <rect x="32" y="4" width="36" height="92" rx="18" transform="rotate(45 50 50)" />
               <rect x="32" y="4" width="36" height="92" rx="18" transform="rotate(-45 50 50)" />
            </svg>
         </ShapeWrapper>

         {/* 2. 4 Dots (Pink -> Blue) */}
         <ShapeWrapper color="#FF00E5" hoverColor="#6D4AFF" delay={0.1}>
            <svg viewBox="0 0 100 100" style={{ height: '85%', fill: 'currentColor' }}>
               <circle cx="25" cy="25" r="23" />
               <circle cx="75" cy="25" r="23" />
               <circle cx="25" cy="75" r="23" />
               <circle cx="75" cy="75" r="23" />
            </svg>
         </ShapeWrapper>

         {/* 3. Half Moon (Lime -> Blue) */}
         <ShapeWrapper color="#B6FF00" hoverColor="#00A3FF" delay={0.15}>
            <svg viewBox="0 0 100 100" style={{ height: '95%', fill: 'currentColor' }}>
               <path d="M78 5 A48 48 0 0 0 78 95 L78 95 L78 5 Z" transform="translate(-18, 0)" />
            </svg>
         </ShapeWrapper>

         {/* 4. Donut (Purple -> Lime) */}
         <ShapeWrapper color="#6D4AFF" hoverColor="#B6FF00" delay={0.2}>
            <svg viewBox="0 0 100 100" style={{ height: '95%', fill: 'currentColor' }}>
               <path d="M50 5 A 48 48 0 1 0 50 95 A 48 48 0 1 0 50 5 M 50 40 A 10 10 0 1 1 50 60 A 10 10 0 1 1 50 40 Z" />
            </svg>
         </ShapeWrapper>

         {/* 5. Triple Strike (New: Blue -> Orange) */}
         <ShapeWrapper color="#00A3FF" hoverColor="#FF9500" delay={0.25}>
            <svg viewBox="0 0 100 100" style={{ height: '90%', fill: 'currentColor' }}>
               <rect x="10" y="10" width="20" height="80" rx="10" />
               <rect x="40" y="10" width="20" height="80" rx="10" />
               <rect x="70" y="10" width="20" height="80" rx="10" />
            </svg>
         </ShapeWrapper>

         {/* 6. Diamond (Cyan -> Pink) */}
         <ShapeWrapper color="#00F0FF" hoverColor="#FF00E5" delay={0.3}>
            <svg viewBox="0 0 100 100" style={{ height: '95%', fill: 'currentColor' }} className="rotate-45">
               <rect x="2" y="2" width="96" height="96" rx="12" />
            </svg>
         </ShapeWrapper>

         {/* 7. Rounded Delta (New: Orange -> Cyan) */}
         <ShapeWrapper color="#FF9500" hoverColor="#00F0FF" delay={0.35}>
            <svg viewBox="0 0 100 100" style={{ height: '90%', fill: 'currentColor' }}>
               <path d="M50 5 L95 85 Q95 95 85 95 L15 95 Q5 95 5 85 L50 5 Z" />
            </svg>
         </ShapeWrapper>

         {/* 8. Cross Dots (New: Purple -> Pink) */}
         <ShapeWrapper color="#6D4AFF" hoverColor="#FF00E5" delay={0.4}>
            <svg viewBox="0 0 100 100" style={{ height: '90%', fill: 'currentColor' }}>
               <circle cx="50" cy="50" r="18" />
               <circle cx="50" cy="15" r="15" />
               <circle cx="50" cy="85" r="15" />
               <circle cx="15" cy="50" r="15" />
               <circle cx="85" cy="50" r="15" />
            </svg>
         </ShapeWrapper>

         {/* 9. Dual Moons (Orange -> Blue) */}
         <ShapeWrapper color="#FF9500" hoverColor="#6D4AFF" delay={0.45}>
            <svg viewBox="0 0 100 100" style={{ height: '95%', fill: 'currentColor' }}>
               <path d="M40 10 A42 42 0 0 0 40 90 Z" />
               <path d="M60 10 A42 42 0 0 1 60 90 Z" />
            </svg>
         </ShapeWrapper>
      </div>
    </footer>
  );
};

export default Footer;
