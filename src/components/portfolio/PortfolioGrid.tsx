"use client";

import Image from "next/image";
import { ArrowRight, Code2, X, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { 
  SiReact, SiNextdotjs, SiNodedotjs, SiMysql, SiMongodb, SiPostgresql, 
  SiHtml5, SiCss, SiJavascript, SiTailwindcss, SiPhp,
  SiWordpress, SiWoocommerce, SiAstra
} from "react-icons/si";

interface Project {
  title: string;
  subtitle: string;
  categoryId: string;
  description: string;
  image: string;
  previewImage?: string;
  gallery?: string[];
  link: string;
  technologies: string[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TechConfig: Record<string, { icon: any; color: string }> = {
  "React": { icon: SiReact, color: "#61DAFB" },
  "Next.js": { icon: SiNextdotjs, color: "#FFFFFF" },
  "Node.js": { icon: SiNodedotjs, color: "#339933" },
  "MySQL": { icon: SiMysql, color: "#4479A1" },
  "MongoDB": { icon: SiMongodb, color: "#47A248" },
  "PostgreSQL": { icon: SiPostgresql, color: "#4169E1" },
  "HTML": { icon: SiHtml5, color: "#E34F26" },
  "CSS": { icon: SiCss, color: "#1572B6" },
  "JavaScript": { icon: SiJavascript, color: "#F7DF1E" },
  "Tailwind": { icon: SiTailwindcss, color: "#06B6D4" },
  "PHP": { icon: SiPhp, color: "#777BB4" },
  "WordPress": { icon: SiWordpress, color: "#21759B" },
  "WooCommerce": { icon: SiWoocommerce, color: "#96588A" },
  "Astra": { icon: SiAstra, color: "#874DFF" },
};

export const PortfolioGrid = ({ projects }: { projects: Project[] }) => {
  const [modalProject, setModalProject] = useState<Project | null>(null);
  const [modalType, setModalType] = useState<'scroll' | 'gallery' | null>(null);
  const [currentGalleryIdx, setCurrentGalleryIdx] = useState(0);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 4;

  // Reset page when category/projects change
  useEffect(() => {
    setCurrentPage(1);
  }, [projects]);

  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);
  const currentProjects = projects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

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

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {currentProjects.map((project, idx) => (
        <div 
          key={idx} 
          className="bg-[#060D1A]/60 rounded-2xl overflow-hidden border border-[#1A2333]/50 flex flex-col hover:border-[#00D2FF]/50 hover:shadow-[0_0_30px_rgba(0,210,255,0.1)] transition-all duration-300 group"
        >
          {/* Image Area */}
          <div className="h-[240px] w-full relative bg-black overflow-hidden flex-shrink-0">
            <Image 
              src={project.image} 
              alt={project.title} 
              fill 
              className="object-cover object-top group-hover:scale-105 transition-all duration-700"
            />
            {/* Bottom gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#060D1A] to-transparent" />
          </div>

          {/* Content Area */}
          <div className="p-6 flex flex-col flex-grow relative z-10 -mt-6">
            <h3 className="text-[16px] font-extrabold text-white uppercase tracking-wider mb-1">
              {project.title}
            </h3>
            <p className="text-[12px] text-[#8995A9] mb-4">
              {project.subtitle}
            </p>
            
            <p className="text-[13px] text-[#DCE6FF]/70 mb-6 leading-relaxed flex-grow">
              {project.description}
            </p>

            {/* Technologies */}
            <div className="mb-6">
              <p className="text-[11px] text-[#FABB18] mb-2 font-medium">Tecnologías:</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.technologies.map((tech, i) => {
                    const techData = TechConfig[tech] || { icon: Code2, color: "#8995A9" };
                    const Icon = techData.icon;
                    return (
                      <div 
                        key={i} 
                        className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:border-white/20 hover:scale-110" 
                        title={tech}
                        style={{ color: techData.color }}
                      >
                        <Icon size={16} />
                      </div>
                    );
                  })}
                </div>
            </div>
            
            <div className="mt-auto pt-4 border-t border-white/5">
              <button 
                onClick={(e) => handleProjectClick(project, e)}
                className="flex items-center justify-between w-full text-[#FABB18] text-[13px] font-bold group/link hover:text-white transition-colors"
              >
                <span>{project.categoryId === 'sistemas' ? 'Ver galería' : 'Ver proyecto'}</span>
                <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mb-16">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all ${
              currentPage === 1 
                ? 'bg-white/5 text-[#8995A9] cursor-not-allowed' 
                : 'bg-[#1A2333] text-white hover:bg-[#00D2FF] hover:text-[#01040A]'
            }`}
          >
            <ChevronLeft size={18} /> Anterior
          </button>
          
          <span className="text-[#8995A9] font-medium text-sm">
            Página {currentPage} de {totalPages}
          </span>
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all ${
              currentPage === totalPages 
                ? 'bg-white/5 text-[#8995A9] cursor-not-allowed' 
                : 'bg-[#1A2333] text-white hover:bg-[#00D2FF] hover:text-[#01040A]'
            }`}
          >
            Siguiente <ChevronRight size={18} />
          </button>
        </div>
      )}

      {/* Modal Render Logic */}
      {modalProject && modalType === 'scroll' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10">
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
      )}

      {modalProject && modalType === 'gallery' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10">
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
                       <button onClick={prevGalleryImage} className="absolute left-4 w-10 h-10 bg-black/50 border border-white/10 text-white rounded-full flex items-center justify-center hover:bg-[#00D2FF] hover:text-black hover:border-[#00D2FF] transition-all">
                         <ChevronLeft size={24} />
                       </button>
                       <button onClick={nextGalleryImage} className="absolute right-4 w-10 h-10 bg-black/50 border border-white/10 text-white rounded-full flex items-center justify-center hover:bg-[#00D2FF] hover:text-black hover:border-[#00D2FF] transition-all">
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
      )}

    </div>
  );
};
