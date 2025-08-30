
import React from 'react';
import type { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onProjectSelect: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onProjectSelect }) => {
  return (
    <div
      className="group bg-muted rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 cursor-pointer"
      onClick={() => onProjectSelect(project)}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onProjectSelect(project)}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${project.title}`}
    >
      <div className="relative overflow-hidden">
        <img
          src={project.cover}
          alt={project.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold font-heading text-text mb-2">{project.title}</h3>
        <p className="text-text/70 mb-4">{project.summary}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="bg-border text-text/80 text-xs font-semibold px-3 py-1 rounded-full capitalize">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
