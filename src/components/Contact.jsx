import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, MapPin, Send } from 'lucide-react';

/* ── inject contact-specific styles once ── */
const injectContactStyles = (() => {
  let injected = false;
  return () => {
    if (injected) return;
    injected = true;
    const style = document.createElement('style');
    style.textContent = `
      .contact-noise::after {
        content: '';
        position: absolute;
        inset: 0;
        opacity: 0.03;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        background-size: 128px;
        pointer-events: none;
        z-index: 1;
      }
      .contact-input::placeholder {
        color: rgba(255, 255, 255, 0.2);
      }
      .magnetic-area {
        position: relative;
        padding: 40px;
        margin: -40px;
      }
    `;
    document.head.appendChild(style);
  };
})();

const ContactItem = ({ icon, label, value }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="flex items-center gap-6 group"
  >
    <div className="w-16 h-16 rounded-2xl bg-[#A64D79]/5 flex items-center justify-center text-[#A64D79] border border-[#A64D79]/10 group-hover:bg-[#A64D79] group-hover:text-white transition-all duration-500 shadow-lg">
      {icon}
    </div>
    <div>
      <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[#A64D79] mb-1">{label}</div>
      <div className="text-xl font-bold text-white/70 group-hover:text-white transition-all" style={{ fontFamily: '"Outfit", sans-serif' }}>{value}</div>
    </div>
  </motion.div>
);

const Contact = () => {
  const contactInfo = [
    { icon: <Mail size={24} />, label: 'Direct Email', value: 'sakshi04292004@gmail.com' },
  ];

  React.useEffect(() => { injectContactStyles(); }, []);

  return (
    <section id="contact" className="relative py-25 bg-[#050505] overflow-hidden contact-noise">
      {/* Background subtle radial glows */}
      <div className="absolute top-1/2 left-0 w-[50vw] h-[50vw] bg-[#A64D79]/5 rounded-full blur-[120px] -ml-[25vw] -translate-y-1/2 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center">

          {/* Left Column: Bold Text */}
          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="w-12 h-[1px] bg-[#A64D79]" />
              <span className="text-xs font-black tracking-[0.5em] uppercase text-[#A64D79]">Get In Touch</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
              className="text-[12vw] lg:text-[7vw] font-black uppercase leading-[0.85] tracking-tighter text-white mb-12"
              style={{ fontFamily: '"Outfit", sans-serif' }}
            >
              LET'S BUILD <br />
              <span className="text-[#A64D79]">SOMETHING</span> <br />
              GREAT.
            </motion.h2>

            <div className="space-y-10">
              {contactInfo.map((info, idx) => (
                <ContactItem key={idx} {...info} />
              ))}
            </div>
          </div>

          {/* Right Column: Premium Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <form className="bg-white/5 backdrop-blur-xl p-10 md:p-14 rounded-[3.5rem] border border-white/10 space-y-8 shadow-2xl">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3 group/input">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#A64D79] ml-6 italic opacity-70 group-focus-within/input:opacity-100 transition-opacity">01. Your Name</label>
                  <input
                    type="text"
                    className="w-full contact-input bg-white/[0.03] border border-white/10 rounded-2xl px-8 py-5 text-white focus:outline-none focus:border-[#A64D79] focus:ring-4 focus:ring-[#A64D79]/5 transition-all duration-500 font-medium shadow-sm hover:border-white/20"
                    placeholder="Who are you?"
                  />
                </div>
                <div className="space-y-3 group/input">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#A64D79] ml-6 italic opacity-70 group-focus-within/input:opacity-100 transition-opacity">02. Your Email</label>
                  <input
                    type="email"
                    className="w-full contact-input bg-white/[0.03] border border-white/10 rounded-2xl px-8 py-5 text-white focus:outline-none focus:border-[#A64D79] focus:ring-4 focus:ring-[#A64D79]/5 transition-all duration-500 font-medium shadow-sm hover:border-white/20"
                    placeholder="Where can I reach you?"
                  />
                </div>
              </div>
              <div className="space-y-3 group/input">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#A64D79] ml-6 italic opacity-70 group-focus-within/input:opacity-100 transition-opacity">03. Message</label>
                <textarea
                  rows="6"
                  className="w-full contact-input bg-white/[0.03] border border-white/10 rounded-2xl px-8 py-5 text-white focus:outline-none focus:border-[#A64D79] focus:ring-4 focus:ring-[#A64D79]/5 transition-all duration-500 font-medium resize-none shadow-sm hover:border-white/20"
                  placeholder="Tell me everything..."
                ></textarea>
              </div>

              <div className="pt-4 overflow-hidden rounded-2xl">
                <button
                  className="w-full bg-[#A64D79] text-white py-6 rounded-2xl font-black uppercase tracking-[0.4em] text-xs flex items-center justify-center gap-4 hover:bg-white transition-all duration-700 group relative overflow-hidden active:scale-[0.98] shadow-2xl shadow-[#A64D79]/20"
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="relative z-10">Send Message</span>
                  <Send size={18} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500 group-hover:text-[#A64D79]" />

                  {/* Button gloss and magnetic lift effect */}
                  <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:left-[100%] transition-all duration-1000" />
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <span className="absolute inset-0 flex items-center justify-center text-[#A64D79] opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-20">Send Message</span>
                </button>
              </div>
            </form>
          </motion.div>

        </div>
      </div>

      {/* Footer minimal label */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center">
        <span className="text-[10px] font-bold tracking-[0.8em] text-white/10 uppercase">Sakshi Kumari · 2026</span>
      </div>
    </section>
  );
};

export default Contact;
