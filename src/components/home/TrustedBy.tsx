"use client";

import Image from "next/image";

const companies = [
  { name: "Atucucho SHOP", logo: "/logoatucucho.png", width: 140 },
  { name: "Motrumo", logo: "/logomotrumo.jpg", width: 140 },
  { name: "Palacios MKT", logo: "/logo-palacios-mkt.png", width: 160 },
  { name: "Wish Way", logo: "/wishwayec.png", width: 120 },
  { name: "La Hueca", logo: "/logolahueca.jpg", width: 120 },
  { name: "Vermen", logo: "/logovermen.png", width: 140 },
];

export const TrustedBy = () => {
  return (
    <section className="py-6 bg-[#01040A]">
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
                EMPRESAS QUE <br />
                CONFÍAN EN NOSOTROS
              </h2>
            </div>
            
            <div className="flex-1 w-full overflow-hidden relative">
              {/* Desktop View */}
              <div className="hidden md:flex items-center justify-between gap-12 overflow-x-auto no-scrollbar py-2 px-4">
                {companies.map((company, idx) => (
                  <div key={idx} className="flex items-center justify-center flex-shrink-0 transition-all duration-300 hover:scale-105">
                    <Image 
                      src={company.logo} 
                      alt={`Logo de ${company.name}`} 
                      width={company.width} 
                      height={60} 
                      className="object-contain max-h-[50px] w-auto"
                    />
                  </div>
                ))}
              </div>
              
              {/* Mobile View - Infinite Scroll */}
              <div className="flex md:hidden w-max animate-infinite-scroll hover:[animation-play-state:paused] py-2">
                {[...companies, ...companies].map((company, idx) => (
                  <div key={idx} className="flex items-center justify-center flex-shrink-0 mx-6">
                    <Image 
                      src={company.logo} 
                      alt={`Logo de ${company.name}`} 
                      width={company.width} 
                      height={60} 
                      className="object-contain max-h-[40px] w-auto"
                    />
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
