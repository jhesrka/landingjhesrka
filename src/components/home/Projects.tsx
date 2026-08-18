import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/db";
import { projects as projectsSchema } from "@/db/schema";
import { desc } from "drizzle-orm";

export const Projects = async () => {
  let dbProjects: any[] = [];
  
  try {
    dbProjects = await db.select().from(projectsSchema).orderBy(desc(projectsSchema.createdAt));
  } catch (error) {
    console.error("Database connection failed, using fallback data:", error);
  }

  // Select 4 random projects
  let projects = dbProjects.length > 0 
    ? [...dbProjects]
        .sort(() => 0.5 - Math.random())
        .slice(0, 4)
        .map(p => ({
          title: p.title,
          category: p.subtitle,
          image: p.imageUrl,
          link: p.link || "#",
        }))
    : [];

  // Default fallback if DB is empty or fails
  if (projects.length === 0) {
    projects = [
      { title: "ATUCUCHO SHOP", category: "Super App / Marketplace", image: "/destacado1.webp", link: "#" },
      { title: "WISHWAY", category: "Plataforma de Rifas Online", image: "/mockups/wishway.jpg", link: "#" },
      { title: "OLA PREMIUM", category: "Transporte Ejecutivo", image: "/mockups/ola.jpg", link: "#" },
      { title: "CV3 TALLER", category: "Sitio Web Automotriz", image: "/mockups/cv3.jpg", link: "#" },
    ];
  }

  return (
    <section className="py-8 relative border-b border-white/5 overflow-hidden" id="portafolio">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.15] mix-blend-screen pointer-events-none"
        style={{
          backgroundImage: 'url(/fondosseccion.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
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

          {/* Grid Container for Cards */}
          <div className="relative group">
            
            {/* 4-Column Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {projects.map((project, idx) => (
                <div 
                  key={idx} 
                  className="bg-[#040A15] rounded-xl overflow-hidden border border-[#1A2333]/50 flex flex-col hover:border-white/20 transition-all shadow-lg"
                >
                  {/* Image Area */}
                  <div className="h-[220px] md:h-[280px] w-full relative bg-black overflow-hidden flex-shrink-0">
                    <Image 
                      src={project.image} 
                      alt={project.title} 
                      fill 
                      className="object-cover object-top hover:scale-105 transition-all duration-700"
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
                      <a 
                        href={project.link} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 text-white text-[10px] md:text-[11px] font-bold hover:bg-white hover:text-black transition-colors w-max"
                      >
                        Ver proyecto <ArrowRight size={12} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

          </div> {/* End of relative z-20 */}
        </div> {/* End of Animated Border Container */}
      </div>
    </section>
  );
};
