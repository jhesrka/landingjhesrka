"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ArrowRight, X, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

interface Project {
  title: string;
  category: string;
  categoryId: string;
  image: string;
  previewImage?: string;
  gallery?: string[];
  link: string;
}

export const ProjectsClient = ({ projects }: { projects: Project[] }) => {
  const [modalProject, setModalProject] = useState<Project | null>(null);
  const [modalType, setModalType] = useState<'scroll' | 'gallery' | null>(null);
  const [currentGalleryIdx, setCurrentGalleryIdx] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleProjectClick = (project: Project, e: React.MouseEvent) => {
    e.preventDefault();
    if (project.categoryId === "aplicaciones-web") {
      window.open(project.link, "_blank");
    } else if (project.categoryId === "sistemas") {
      setModalProject(project);
      setModalType('gallery');
      setCurrentGalleryIdx(0);
    } else {
      setModalProject(project);
      setModalType('scroll');
    }
  };

  const nextGalleryImage = () => {
    if (modalProject?.gallery) {
      setCurrentGalleryIdx((prev) => (prev + 1) % modalProject.gallery!.length);
    }
  };

  const prevGalleryImage = () => {
    if (modalProject?.gallery) {
      setCurrentGalleryIdx((prev) => (prev - 1 + modalProject.gallery!.length) % modalProject.gallery!.length);
    }
  };

  const renderModal = () => {
    if (!modalProject) return null;

    if (modalType === 'scroll') {
      return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setModalProject(null)} />
          
          <div className="relative bg-[#060D1A] border border-[#1A2333] rounded-[24px] p-2 w-full max-w-5xl h-[85vh] flex flex-col shadow-[0_0_50px_rgba(0,210,255,0.15)] animate-in fade-in zoom-in duration-300">
            {/* Header del Modal */}
            <div className="flex justify-between items-start p-4 border-b border-white/10 shrink-0">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div>
                  <h3 className="text-white font-bold text-lg md:text-xl uppercase tracking-wider flex items-center gap-2">
                    {modalProject.title}
                  </h3>
                  <p className="text-[#00D2FF] text-[12px] font-semibold mt-1 opacity-80">
                    * Vista previa interactiva de la interfaz.
                  </p>
                </div>
                {modalProject.link && modalProject.link !== "#" && (
                   <a 
                     href={modalProject.link} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="flex items-center gap-2 bg-[#00D2FF]/10 text-[#00D2FF] hover:bg-[#00D2FF] hover:text-[#01040A] px-4 py-2 rounded-lg font-bold text-[12px] transition-all"
                   >
                     Ir a la página <ExternalLink size={14} />
                   </a>
                )}
              </div>
              <button onClick={() => setModalProject(null)} className="text-[#8995A9] hover:text-[#00D2FF] transition-colors p-1 bg-white/5 rounded-full hover:bg-white/10 mt-1">
                <X size={24} />
              </button>
            </div>
            
            {/* Contenedor de la Imagen con Scroll on Hover */}
            <div className="flex-1 overflow-hidden relative rounded-b-[20px] bg-[#02050A] group mt-2">
              <div className="absolute inset-0 flex items-center justify-center opacity-50 group-hover:opacity-0 transition-opacity">
                <p className="text-[#8995A9] text-sm animate-pulse border border-[#8995A9]/30 rounded-full px-4 py-2 bg-black/50 backdrop-blur-md z-10 pointer-events-none shadow-lg">
                  Pasa el mouse para hacer scroll ↓
                </p>
              </div>
              <Image 
                src={modalProject.previewImage || modalProject.image} 
                alt={`Preview ${modalProject.title}`} 
                fill
                className="object-cover object-top transition-all duration-[6000ms] ease-in-out group-hover:object-bottom"
                unoptimized
              />
            </div>
          </div>
        </div>
      );
    }

    if (modalType === 'gallery') {
      return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setModalProject(null)} />
          
          <div className="relative bg-[#060D1A] border border-[#1A2333] rounded-[24px] p-2 w-full max-w-5xl h-[85vh] flex flex-col shadow-[0_0_50px_rgba(0,210,255,0.15)] animate-in fade-in zoom-in duration-300">
            {/* Header del Modal */}
            <div className="flex justify-between items-start p-4 border-b border-white/10 shrink-0">
              <div>
                <h3 className="text-white font-bold text-lg md:text-xl uppercase tracking-wider flex items-center gap-2">
                  {modalProject.title} - Galería de Sistema
                </h3>
                <p className="text-[#FABB18] text-[12px] font-semibold mt-1 opacity-80">
                  * Vistas restringidas por confidencialidad.
                </p>
              </div>
              <button onClick={() => setModalProject(null)} className="text-[#8995A9] hover:text-[#00D2FF] transition-colors p-1 bg-white/5 rounded-full hover:bg-white/10 mt-1">
                <X size={24} />
              </button>
            </div>
            
            {/* Carrusel de Imágenes */}
            <div className="flex-1 relative rounded-b-[20px] bg-black mt-2 flex items-center justify-center overflow-hidden">
               {modalProject.gallery && modalProject.gallery.length > 0 ? (
                 <>
                   <Image 
                     src={modalProject.gallery[currentGalleryIdx]} 
                     alt={`Gallery image ${currentGalleryIdx + 1}`} 
                     fill
                     className="object-contain"
                     unoptimized
                   />
                   
                   {modalProject.gallery.length > 1 && (
                     <>
                       <button onClick={prevGalleryImage} aria-label="Imagen anterior" className="absolute left-4 w-10 h-10 bg-black/50 border border-white/10 text-white rounded-full flex items-center justify-center hover:bg-[#00D2FF] hover:text-black hover:border-[#00D2FF] transition-all">
                         <ChevronLeft size={24} />
                       </button>
                       <button onClick={nextGalleryImage} aria-label="Siguiente imagen" className="absolute right-4 w-10 h-10 bg-black/50 border border-white/10 text-white rounded-full flex items-center justify-center hover:bg-[#00D2FF] hover:text-black hover:border-[#00D2FF] transition-all">
                         <ChevronRight size={24} />
                       </button>
                       <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                         {modalProject.gallery.map((_, i) => (
                           <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i === currentGalleryIdx ? 'bg-[#00D2FF]' : 'bg-white/20'}`} />
                         ))}
                       </div>
                     </>
                   )}
                 </>
               ) : (
                 <div className="text-[#8995A9] text-center">
                   <p>No hay imágenes disponibles para este sistema.</p>
                 </div>
               )}
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="relative group">
      {/* 4-Column Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {projects.map((project, idx) => (
          <div 
            key={idx} 
            className="bg-[#040A15] rounded-xl overflow-hidden border border-[#1A2333]/50 flex flex-col hover:border-white/20 transition-all shadow-lg group/card"
          >
            {/* Image Area */}
            <div className="h-[220px] md:h-[280px] w-full relative bg-black overflow-hidden flex-shrink-0">
              <Image 
                src={project.image} 
                alt={project.title} 
                fill 
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-top group-hover/card:scale-105 transition-all duration-700"
              />
              {/* Bottom gradient to blend into content */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#040A15] to-transparent" />
            </div>

            {/* Content Area */}
            <div className="px-5 pb-6 flex flex-col flex-grow bg-[#040A15] relative z-10 -mt-8">
              <h3 className="text-[14px] md:text-[15px] font-extrabold text-white uppercase tracking-wider mb-1">
                {project.title}
              </h3>
              <p className="text-[11px] md:text-[12px] text-[#8995A9] mb-5">
                {project.category}
              </p>
              
              <div className="mt-auto">
                <button 
                  onClick={(e) => handleProjectClick(project, e)}
                  className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 text-white text-[10px] md:text-[11px] font-bold hover:bg-white hover:text-black transition-colors w-max"
                >
                  {project.categoryId === 'sistemas' ? 'Ver galería' : 'Ver proyecto'} <ArrowRight size={12} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Render Logic with React Portal */}
      {isMounted && modalProject && createPortal(renderModal(), document.body)}
    </div>
  );
};
