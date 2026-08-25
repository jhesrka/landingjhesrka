import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { db } from "@/db";
import { projects as projectsSchema } from "@/db/schema";
import { desc } from "drizzle-orm";
import { ProjectsClient } from "./ProjectsClient";

export const Projects = async () => {
  let dbProjects: any[] = [];
  
  try {
    dbProjects = await db.select().from(projectsSchema).orderBy(desc(projectsSchema.createdAt));
  } catch (error) {
    console.error("Database connection failed, using fallback data:", error);
  }

  // Select 4 random projects
  type ProjectData = {
    title: string;
    category: string;
    categoryId: string;
    image: string;
    previewImage?: string;
    gallery?: string[];
    link: string;
  };

  let projects: ProjectData[] = dbProjects.length > 0 
    ? [...dbProjects]
        .sort(() => 0.5 - Math.random())
        .slice(0, 4)
        .map(p => ({
          title: p.title,
          category: p.subtitle || "",
          categoryId: p.categoryId || "todos",
          image: p.imageUrl || "",
          previewImage: p.previewImageUrl || "",
          gallery: Array.isArray(p.gallery) ? p.gallery : [],
          link: p.link || "#",
        }))
    : [];

  // Default fallback if DB is empty or fails
  if (projects.length === 0) {
    projects = [
      { 
        title: "ATUCUCHO SHOP", 
        category: "Super App / Marketplace", 
        categoryId: "aplicaciones-web",
        image: "/destacado1.webp", 
        link: "#" 
      },
      { 
        title: "WISHWAY", 
        category: "Plataforma de Rifas Online", 
        categoryId: "sistemas",
        image: "/destacado1.webp", 
        gallery: ["/destacado1.webp", "/tarjetas.jpg"],
        link: "#" 
      },
      { 
        title: "OLA PREMIUM", 
        category: "Transporte Ejecutivo", 
        categoryId: "aplicaciones-web",
        image: "/tarjetas.jpg", 
        link: "#" 
      },
      { 
        title: "CV3 TALLER", 
        category: "Sitio Web Automotriz", 
        categoryId: "paginas-web",
        image: "/landing1.webp", 
        previewImage: "/tarjetas.jpg",
        link: "#" 
      },
    ];
  }

  return (
    <section className="py-8 relative border-b border-white/5 overflow-hidden" id="portafolio">
      {/* Background Image Overlay */}
      <Image 
        src="/fondosseccion.png" 
        alt="" 
        fill 
        sizes="(max-width: 768px) 100vw, 50vw"
        className="opacity-[0.15] mix-blend-screen pointer-events-none object-cover object-center absolute inset-0 z-0" 
      />

      <div className="container mx-auto px-4 lg:px-8 max-w-[1400px] relative z-10">
        
        {/* Animated Border Container */}
        <div className="relative rounded-2xl bg-[#060D1A]/80 border border-[#1A2333] p-6 lg:p-8 backdrop-blur-md group overflow-hidden shadow-[0_0_30px_rgba(0,210,255,0.03)]">
          
          {/* 1) The main gradient border tracing effect */}
          <div className="absolute inset-0 z-0 block rounded-2xl overflow-hidden p-[1px]">
            <div className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] opacity-50 
              bg-[conic-gradient(from_90deg_at_50%_50%,#01040A_0%,#00D2FF_25%,#01040A_50%,#FABB18_75%,#01040A_100%)]" 
            />
          </div>
          
          {/* Inner content wrapper */}
          <div className="absolute inset-[1px] bg-[#01040A] rounded-2xl z-0" />

          {/* 2) Corner Glow Effects */}
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#00D2FF]/20 rounded-full blur-[50px] opacity-100 pointer-events-none z-10" />
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#FABB18]/20 rounded-full blur-[50px] opacity-100 pointer-events-none z-10" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#FABB18]/20 rounded-full blur-[50px] opacity-100 pointer-events-none z-10" />
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#00D2FF]/20 rounded-full blur-[50px] opacity-100 pointer-events-none z-10" />

          {/* Content Area */}
          <div className="relative z-20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[20px] md:text-[24px] font-bold text-white tracking-wide uppercase">
                PROYECTOS DESTACADOS
              </h2>
              <Link href="/portafolio#proyectos" className="text-[#00D2FF] hover:text-[#FABB18] text-[10px] md:text-[11px] font-bold flex items-center gap-2 transition-colors uppercase tracking-widest">
                VER TODOS LOS PROYECTOS <ArrowRight size={14} />
              </Link>
            </div>

            {/* Grid Container for Cards via Client Component */}
            <ProjectsClient projects={projects} />

          </div> {/* End of relative z-20 */}
        </div> {/* End of Animated Border Container */}
      </div>
    </section>
  );
};
