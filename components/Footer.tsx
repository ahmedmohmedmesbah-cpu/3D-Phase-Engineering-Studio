
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-text text-muted py-6">
      <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 text-center text-sm">
        <p>&copy; {currentYear} 3D Phase — Ahmed Mesbah. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;