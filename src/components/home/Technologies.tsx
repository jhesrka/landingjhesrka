"use client";
import Image from "next/image";

// We use simple placeholder components since we can't import SVG logos natively without the files.
// We will mimic the logos with colored text/shapes to match the structure perfectly.
const techs = [
  // Lenguajes
  { name: "TypeScript", color: "#3178C6", icon: "TS" },
  { name: "PHP", color: "#777BB4", icon: "PHP" },
  // Frameworks & Entornos
  { name: "React", color: "#61DAFB", icon: "⚛️" },
  { name: "Next.js", color: "#FFFFFF", icon: "N" },
  { name: "Laravel", color: "#FF2D20", icon: "🔺" },
  { name: "Node.js", color: "#339933", icon: "⬢" },
  { name: "FastAPI", color: "#009688", icon: "⚡" },
  { name: "Tailwind CSS", color: "#38B2AC", icon: "≈" },
  // Bases de Datos
  { name: "PostgreSQL", color: "#336791", icon: "🐘" },
  { name: "MySQL", color: "#4479A1", icon: "🐬" },
];

export const Technologies = () => {
  return (
    <section className="py-6 bg-[#01040A] border-b border-white/5">
      <div className="container mx-auto px-4 lg:px-8 max-w-[1400px]">
        <div className="relative rounded-[20px] p-[1px] overflow-hidden group">
          
          {/* Base dark blue edge color */}
          <div className="absolute inset-0 bg-[#0F2540]" />
          
          {/* Sequential Running Neon Line */}
          <div className="absolute top-1/2 left-1/2 w-[250%] h-[250%] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0%,transparent_85%,#00D2FF_100%)] animate-border-trace" />
          
          {/* Radial gradient glowing corners */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-[radial-gradient(circle_at_top_left,#00D2FF_0%,transparent_60%)] opacity-80 group-hover:opacity-100 transition-opacity" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,#00D2FF_0%,transparent_60%)] opacity-80 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[radial-gradient(circle_at_bottom_left,#00D2FF_0%,transparent_60%)] opacity-80 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_bottom_right,#00D2FF_0%,transparent_60%)] opacity-80 group-hover:opacity-100 transition-opacity" />

          {/* The Inner Content */}
          <div 
            className="relative w-full h-full rounded-[19px] bg-[#050A15] py-6 px-6 md:px-8 flex flex-col md:flex-row items-center gap-10 z-10 overflow-hidden shadow-inner shadow-[#00D2FF]/5"
          >
            <Image src="/fondosseccion.png" alt="" fill sizes="(max-width: 768px) 100vw, 100vw" className="object-cover object-center absolute inset-0 z-0 opacity-[0.15] mix-blend-screen pointer-events-none" />
            
            <div className="flex-shrink-0 text-left border-r border-white/10 pr-10 hidden lg:block relative z-10">
              <h2 className="text-[11px] font-bold text-white tracking-[0.2em] leading-relaxed">
                TECNOLOGÍAS QUE <br />
                UTILIZAMOS
              </h2>
            </div>
            
            <div className="flex-1 w-full overflow-hidden relative">
              <div className="flex items-center justify-between gap-6 overflow-x-auto no-scrollbar py-2">
                {techs.map((tech, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-4 group/item flex-shrink-0 w-[80px]">
                    <div 
                      className="flex items-center justify-center text-4xl font-bold transition-all duration-300 group-hover/item:scale-110 group-hover/item:-translate-y-1"
                      style={{ 
                        color: tech.color, 
                        textShadow: `0 0 15px ${tech.color}60, 0 0 30px ${tech.color}30` 
                      }}
                    >
                      {tech.icon}
                    </div>
                    <span className="text-[11px] text-[#8995A9] font-medium group-hover/item:text-white transition-colors">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
