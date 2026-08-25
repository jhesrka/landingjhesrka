"use client";
import Image from "next/image";

import { Edit3, PenTool, FileCode2, Rocket, ShieldCheck, Box } from "lucide-react";

const steps = [
  {
    num: 1,
    title: "DESCUBRIMIENTO",
    desc: "Entendemos tu negocio\ny tus objetivos.",
    icon: <Edit3 size={20} className="text-[#00D2FF]" />,
  },
  {
    num: 2,
    title: "DISEÑO",
    desc: "Diseñamos la mejor\nexperiencia para tus\nusuarios.",
    icon: <PenTool size={20} className="text-[#00D2FF]" />,
  },
  {
    num: 3,
    title: "DESARROLLO",
    desc: "Convertimos el diseño\nen una solución robusta\ny escalable.",
    icon: <FileCode2 size={20} className="text-[#00D2FF]" />,
  },
  {
    num: 4,
    title: "PRUEBAS",
    desc: "Probamos cada detalle\npara garantizar calidad\ny rendimiento.",
    icon: <Rocket size={20} className="text-[#00D2FF]" />,
  },
  {
    num: 5,
    title: "LANZAMIENTO",
    desc: "Publicamos tu proyecto\ny lo dejamos listo para\ncrecer.",
    icon: <ShieldCheck size={20} className="text-[#00D2FF]" />,
  },
  {
    num: 6,
    title: "SOPORTE",
    desc: "Te acompañamos\ny damos soporte\ncontinuo.",
    icon: <Box size={20} className="text-[#00D2FF]" />,
  },
];

export const Process = () => {
  return (
    <section className="py-8 bg-[#01040A] relative border-b border-white/5 overflow-hidden">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#FABB18]/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 max-w-[1400px] relative z-10">
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
            className="relative w-full h-full rounded-[19px] bg-[#050A15] py-10 px-6 md:px-8 flex flex-col xl:flex-row items-start xl:items-center gap-12 z-10 overflow-hidden shadow-inner shadow-[#00D2FF]/5"
          >
            <Image src="/fondosseccion.png" alt="" fill sizes="(max-width: 768px) 100vw, 100vw" className="object-cover object-center absolute inset-0 z-0 opacity-[0.15] mix-blend-screen pointer-events-none" />
            
            <div className="xl:w-1/4 text-left relative z-10">
              <h2 className="text-[24px] md:text-[28px] font-bold text-white leading-tight tracking-wide">
                NUESTRO PROCESO <br /> DE DESARROLLO
              </h2>
            </div>

            <div className="xl:w-3/4 w-full relative">
              {/* The horizontal connecting line */}
              <div className="hidden lg:block absolute top-[35px] left-[8%] right-[8%] h-[2px] bg-gradient-to-r from-[#FABB18]/0 via-[#FABB18]/80 to-[#FABB18]/0 shadow-[0_0_15px_rgba(250,187,24,0.6)] z-0 rounded-full" />

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-4 relative z-10">
                {steps.map((step, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center relative group/item">
                    
                    {/* Neon Octagon Icon Container */}
                    <div className="relative w-[72px] h-[72px] flex items-center justify-center mb-6 group-hover/item:scale-105 transition-transform duration-300 z-10">
                      
                      {/* Arrow to next step (Attached to the octagon so it's 100% vertically centered) */}
                      {idx < steps.length - 1 && (
                        <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 -right-[75%] w-[50%] justify-center items-center z-0 pointer-events-none">
                          <svg 
                            className="w-6 h-6 text-[#FABB18] drop-shadow-[0_0_12px_rgba(250,187,24,1)] animate-pulse"
                            style={{ animationDelay: `${idx * 0.3}s`, animationDuration: '1.5s' }}
                            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      )}

                      {/* SVG Octagon Background with Glow */}
                      <svg className="absolute inset-0 w-full h-full drop-shadow-[0_0_12px_rgba(0,210,255,0.6)] group-hover/item:drop-shadow-[0_0_20px_rgba(0,210,255,1)] transition-all duration-300" viewBox="0 0 100 100">
                        <polygon points="30,5 70,5 95,30 95,70 70,95 30,95 5,70 5,30" fill="#050A15" stroke="#00D2FF" strokeWidth="2" />
                        <polygon points="30,12 70,12 88,30 88,70 70,88 30,88 12,70 12,30" fill="none" stroke="#00D2FF" strokeWidth="0.5" strokeDasharray="4 2" opacity="0.4" />
                      </svg>
                      
                      {/* Icon */}
                      <div className="relative z-10 drop-shadow-[0_0_8px_rgba(0,210,255,0.8)] scale-110">
                        {step.icon}
                      </div>

                      {/* Number Badge */}
                      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-b from-[#FABB18] to-[#D49500] text-black font-extrabold text-[12px] flex items-center justify-center shadow-[0_0_15px_rgba(250,187,24,0.8)] z-20 border border-[#FFF9E6]/50">
                        {step.num}
                      </div>
                    </div>

                    <h3 className="text-[12px] font-bold text-white mb-2 tracking-wide">
                      {step.title}
                    </h3>
                    
                    <p className="text-[#8995A9] text-[10px] leading-relaxed whitespace-pre-line">
                      {step.desc}
                    </p>
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
