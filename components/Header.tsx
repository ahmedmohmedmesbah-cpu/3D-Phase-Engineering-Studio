
import React, { useState, useEffect } from 'react';
import type { RefObject } from 'react';
import useOnScreen from '../hooks/useOnScreen';

interface NavLinkProps {
  href: string;
  label: string;
  isCurrent: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ href, label, isCurrent }) => (
  <a
    href={href}
    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
      isCurrent
        ? 'text-accent font-semibold'
        : 'text-text/70 hover:text-text'
    }`}
  >
    {label}
  </a>
);


interface HeaderProps {
    sectionRefs: {
        about: RefObject<HTMLElement>;
        projects: RefObject<HTMLElement>;
        contact: RefObject<HTMLElement>;
    }
}

const Header: React.FC<HeaderProps> = ({ sectionRefs }) => {
  const [hasScrolled, setHasScrolled] = useState(false);

  const isAboutVisible = useOnScreen(sectionRefs.about, "-30%");
  const isProjectsVisible = useOnScreen(sectionRefs.projects, "-30%");
  const isContactVisible = useOnScreen(sectionRefs.contact, "-30%");

  let currentSection = '';
  if (isContactVisible) currentSection = 'contact';
  else if (isProjectsVisible) currentSection = 'projects';
  else if (isAboutVisible) currentSection = 'about';

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#about', label: 'About', id: 'about' },
    { href: '#projects', label: 'Projects', id: 'projects' },
    { href: '#contact', label: 'Contact', id: 'contact' },
  ];

  return (
    <header className={`sticky top-0 z-40 w-full transition-shadow duration-300 ${hasScrolled ? 'shadow-md bg-background/80 backdrop-blur-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#about" className="text-xl font-bold font-heading text-text">
            3D Phase
          </a>
          <nav aria-label="Primary" className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.id}
                href={link.href}
                label={link.label}
                isCurrent={currentSection === link.id}
              />
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;