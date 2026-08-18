"use client";

import { Code2, ShoppingCart, Box, LayoutDashboard, ShieldCheck, Settings, ArrowRight } from "lucide-react";

const services = [
  {
    icon: <Code2 size={24} className="text-white relative z-10" />,
    title: "PÁGINAS WEB\nCORPORATIVAS",
    description: "Sitios modernos, rápidos\ny optimizados para\ndestacar tu marca.",
    link: "#",
    color: "#00D2FF",
  },
  {
    icon: <ShoppingCart size={24} className="text-white relative z-10" />,
    title: "TIENDAS ONLINE\n(E-COMMERCE)",
    description: "Tiendas seguras,\natractivas y pensadas\npara vender más.",
    link: "#",
    color: "#FABB18", // Yellow top glow for the store
  },
  {
    icon: <Box size={24} className="text-white relative z-10" />,
    title: "APLICACIONES WEB\nA MEDIDA",
    description: "Aplicaciones escalables\nque automatizan y\nmejoran tus procesos.",
    link: "#",
    color: "#00D2FF",
  },
  {
    icon: <LayoutDashboard size={24} className="text-white relative z-10" />,
    title: "SISTEMAS\nEMPRESARIALES",
    description: "Soluciones completas\npara controlar tu negocio\ndesde un solo lugar.",
    link: "#",
    color: "#00D2FF",
  },
  {
    icon: <ShieldCheck size={24} className="text-white relative z-10" />,
    title: "LANDING PAGES\nDE ALTA CONVERSIÓN",
    description: "Diseños estratégicos\nenfocados en atraer y\nconvertir clientes.",
    link: "#",
    color: "#00D2FF",
  },
  {
    icon: <Settings size={24} className="text-white relative z-10" />,
    title: "MANTENIMIENTO\nY SOPORTE WEB",
    description: "Actualizaciones, seguridad\ny soporte técnico cuando\nlo necesites.",
    link: "#",
    color: "#00D2FF",
  },
];

export const Services = () => {
  return (
    <section className="py-16 bg-[#01040A] relative" id="servicios">
      <div className="container mx-auto px-4 lg:px-8 max-w-[1400px]">
        <h2 className="text-[28px] md:text-[36px] font-bold text-white mb-10 tracking-wide">
          ¿QUÉ HACEMOS?
        </h2>

        {/* 6 columns layout on large screens, scrollable on mobile */}
        <div className="flex overflow-x-auto lg:grid lg:grid-cols-6 gap-4 pb-8 lg:pb-0 snap-x snap-mandatory no-scrollbar">
          {services.map((service, index) => (
            <div
              key={index}
              className="relative group bg-[#0A101D]/50 border border-white/10 rounded-xl overflow-hidden flex flex-col items-center text-center p-6 min-w-[220px] lg:min-w-0 snap-center hover:bg-[#0A101D] transition-colors"
            >
              {/* Top vibrant glowing border */}
              <div 
                className="absolute top-0 left-0 w-full h-[3px]"
                style={{ 
                  backgroundColor: service.color,
                  boxShadow: `0 0 20px 2px ${service.color}`
                }} 
              />
              
              {/* Inner top gradient based on the color */}
              <div 
                className="absolute top-0 left-0 w-full h-32 opacity-20 pointer-events-none"
                style={{
                  background: `linear-gradient(to bottom, ${service.color}, transparent)`
                }}
              />

              {/* Icon inside a tilted rounded square */}
              <div className="relative w-14 h-14 flex items-center justify-center mt-4 mb-6">
                <div 
                  className="absolute inset-0 border rotate-45 rounded-[10px] opacity-40 group-hover:opacity-100 transition-opacity"
                  style={{ borderColor: service.color }}
                />
                {service.icon}
              </div>
              
              <h3 className="text-[13px] font-extrabold text-[#DCE6FF] mb-3 leading-snug whitespace-pre-line tracking-wide h-10 flex items-center justify-center">
                {service.title}
              </h3>
              
              <p className="text-[#8995A9] text-[11px] leading-relaxed mb-6 whitespace-pre-line flex-grow">
                {service.description}
              </p>
              
              <a href={service.link} className="text-[#FABB18] text-[11px] font-bold flex items-center gap-1 hover:gap-2 transition-all mt-auto tracking-widest uppercase">
                Ver más <ArrowRight size={12} strokeWidth={3} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
