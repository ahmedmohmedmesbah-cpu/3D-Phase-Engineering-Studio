
import React, { forwardRef } from 'react';

const AboutSection = forwardRef<HTMLElement>((props, ref) => {
  const capabilities = [
    "3D modeling (parts/assemblies)",
    "SolidWorks surface modeling",
    "Technical drawings",
    "FEA stress checks",
    "Prototyping support",
    "DFM/DFA guidelines",
    "Basic motion studies",
    "Handoff for fabrication",
  ];

  const tools = ["SolidWorks", "Blender", "KeyShot", "Python", "Git"];

  return (
    <section id="about" ref={ref} className="py-20 lg:py-32 bg-muted">
      <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <h2 id="about-title" className="text-3xl lg:text-4xl font-bold font-heading text-text mb-6">About Me</h2>
            <p className="text-lg text-text/80 mb-6">
              I am Ahmed Mesbah, a Mechanical & SolidWorks Designer and the founder of 3D Phase Engineering Studio. I specialize in 3D modeling, CAD for assemblies, surface modeling, and manufacturing-ready documentation. My work bridges engineering precision with creative problem-solving across robotics, product design, and prototyping.
            </p>
            <div className="mb-6">
              <h3 className="text-xl font-semibold font-heading mb-3">Capabilities</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-text/70">
                {capabilities.map((item) => (
                  <li key={item} className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
             <div>
              <h3 className="text-xl font-semibold font-heading mb-3">Tools</h3>
              <div className="flex flex-wrap gap-2">
                {tools.map(tool => (
                   <span key={tool} className="bg-border text-text/80 text-sm font-medium px-3 py-1 rounded-full">{tool}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 flex justify-center">
            <img src="https://picsum.photos/seed/profile/500/500" alt="Ahmed Mesbah" className="rounded-full w-64 h-64 lg:w-96 lg:h-96 object-cover shadow-xl" />
          </div>
        </div>
      </div>
    </section>
  );
});

export default AboutSection;
