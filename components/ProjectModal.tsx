
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import type { Project } from '../types';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ThreeViewer: React.FC<{ modelUrl: string }> = ({ modelUrl }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;
    
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf3f5f7);
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);
    
    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    // Model Loader
    const loader = new GLTFLoader();
    loader.load(
      modelUrl,
      (gltf) => {
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const center = box.getCenter(new THREE.Vector3());
        gltf.scene.position.sub(center); // Center the model
        scene.add(gltf.scene);
      },
      undefined,
      (error) => {
        console.error('An error happened while loading the model:', error);
      }
    );
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (currentMount) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [modelUrl]);

  return <div ref={mountRef} className="w-full h-full bg-muted rounded-lg" />;
};


const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const canShow3d = !!project.model;
  const canShowGallery = project.images && project.images.length > 0;
  
  const [activeTab, setActiveTab] = useState<'3d' | 'gallery'>(canShow3d ? '3d' : 'gallery');

  useEffect(() => {
    const modalElement = modalRef.current;
    if (modalElement) {
      modalElement.showModal();
    }
    return () => {
        if(modalElement) modalElement.close();
    }
  }, []);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDialogElement, MouseEvent>) => {
    if (event.target === modalRef.current) {
      onClose();
    }
  };

  return (
    <dialog
      ref={modalRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 w-full h-full max-w-none max-h-none m-0 bg-black/50 backdrop-blur-sm p-4"
    >
      <div className="bg-background rounded-2xl shadow-2xl max-w-4xl w-full mx-auto my-8 p-6 sm:p-8 relative animate-fade-in-up flex flex-col max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-text/50 hover:text-text transition-colors z-10"
          aria-label="Close project details"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <div className="flex-shrink-0">
          <h2 className="text-2xl sm:text-3xl font-bold font-heading mb-4 pr-8">{project.title}</h2>
          <p className="text-text/70 mb-6">{project.description}</p>
        </div>
        
        {canShow3d && canShowGallery && (
          <div className="flex border-b border-border mb-4 flex-shrink-0">
            <button 
              onClick={() => setActiveTab('3d')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === '3d' ? 'border-b-2 border-accent text-accent' : 'text-text/60 hover:text-text'}`}
              aria-selected={activeTab === '3d'}
              role="tab"
            >
              3D Viewer
            </button>
            <button 
              onClick={() => setActiveTab('gallery')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === 'gallery' ? 'border-b-2 border-accent text-accent' : 'text-text/60 hover:text-text'}`}
              aria-selected={activeTab === 'gallery'}
              role="tab"
            >
              Photos
            </button>
          </div>
        )}

        <div className="flex-grow overflow-y-auto min-h-[400px] h-[500px]">
          {(activeTab === '3d' && canShow3d) && <ThreeViewer modelUrl={project.model!} />}
          {(activeTab === 'gallery' && canShowGallery) && (
              <div className="w-full h-full flex overflow-x-auto snap-x snap-mandatory gap-4">
                {project.images.map((img, index) => (
                  <div key={index} className="snap-center flex-shrink-0 w-full h-full flex items-center justify-center">
                    <img 
                      src={img} 
                      alt={`${project.title} screenshot ${index + 1}`} 
                      className="rounded-lg h-full w-auto object-contain"
                    />
                  </div>
                ))}
              </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mt-6 flex-shrink-0">
            <span className="font-semibold mr-2">Tools:</span>
            {project.tools.map(tool => (
                <span key={tool} className="bg-muted text-text/80 text-sm font-medium px-3 py-1 rounded-full">{tool}</span>
            ))}
        </div>
      </div>
       <style>{`
          dialog[open] { display: flex; align-items: center; justify-content: center; }
          @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(20px) scale(0.98); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
          .animate-fade-in-up {
            animation: fade-in-up 0.3s ease-out forwards;
          }
      `}</style>
    </dialog>
  );
};

export default ProjectModal;