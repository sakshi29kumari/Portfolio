import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import TableOfContents from './components/TableOfContents';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';

function App() {
  return (
    <ThemeProvider>
      <div className="bg-[#0A0A0B]">
        <ScrollProgress />

        <div id="hero" className="snap-start snap-always">
          <Hero />
        </div>

        <div id="contents" className="snap-start snap-always">
          <TableOfContents />
        </div>

        <main>
          <div id="about">
            <About />
          </div>

          <div id="education">
            <Education />
          </div>

          <Experience />


          <div id="skills">
            <Skills />
          </div>

          <div id="projects">
            <Projects />
          </div>

          <div id="contact">
            <Contact />
          </div>
        </main>

        <Navbar />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
