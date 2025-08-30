
import React, { useState, useEffect, forwardRef } from 'react';
import type { Project } from '../types';
import ProjectCard from './ProjectCard';

interface ProjectsSectionProps {
  onProjectSelect: (project: Project) => void;
}

const ProjectsSection = forwardRef<HTMLElement, ProjectsSectionProps>(({ onProjectSelect }, ref) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('data/projects.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Project[] = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section id="projects" ref={ref} className="py-20 lg:py-32">
      <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 id="projects-title" className="text-3xl lg:text-4xl font-bold font-heading text-text">My Work</h2>
          <p className="mt-4 text-lg text-text/70">A selection of my recent projects.</p>
        </div>
        
        {isLoading ? (
          <div className="text-center">Loading projects...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} onProjectSelect={onProjectSelect} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
});

export default ProjectsSection;