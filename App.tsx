
import React, { useState, useRef, useEffect } from 'react';
import type { Project } from './types';
import Header from './components/Header';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';

const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const aboutRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const sectionRefs = {
    about: aboutRef,
    projects: projectsRef,
    contact: contactRef,
  };

  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = '';
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && selectedProject) {
        closeProjectModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  return (
    <div className="flex flex-col min-h-screen">
      <a href="#main" className="absolute left-[-9999px] top-auto w-px h-px overflow-hidden focus:left-1/2 focus:-translate-x-1/2 focus:top-2 focus:w-auto focus:h-auto focus:overflow-auto bg-accent text-white p-4 rounded-lg z-50">
        Skip to content
      </a>
      <Header sectionRefs={sectionRefs} />
      <main id="main" className="flex-grow">
        <AboutSection ref={aboutRef} />
        <ProjectsSection ref={projectsRef} onProjectSelect={openProjectModal} />
        <ContactSection ref={contactRef} />
      </main>
      <Footer />
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={closeProjectModal} />
      )}
    </div>
  );
};

export default App;
