"use client";

import { Briefcase, Users, Star, Rocket } from "lucide-react";
import { useEffect, useRef } from "react";
import { useInView, animate } from "framer-motion";

const stats = [
  { icon: Briefcase, from: 0, to: 150, prefix: "+", suffix: "", title: "Proyectos completados\ncon éxito" },
  { icon: Users, from: 0, to: 80, prefix: "+", suffix: "", title: "Clientes satisfechos\nen todo el país" },
  { icon: Star, from: 0, to: 5, prefix: "", suffix: "", title: "Años de experiencia\ndesarrollando soluciones" },
  { icon: Rocket, from: 0, to: 100, prefix: "", suffix: "%", title: "Comprometidos con la\ncalidad y resultados" },
];

function Counter({ from, to, prefix, suffix }: { from: number; to: number; prefix: string; suffix: string }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    const node = nodeRef.current;
    if (inView && node) {
      const controls = animate(from, to, {
        duration: 2,
        ease: "easeOut",
        onUpdate(value) {
          node.textContent = prefix + Math.floor(value) + suffix;
        }
      });
      return () => controls.stop();
    }
  }, [from, to, inView, prefix, suffix]);

  return <span ref={nodeRef}>{prefix}{from}{suffix}</span>;
}

export const PortfolioStats = () => {
  return (
    <div className="relative rounded-[20px] p-[1px] overflow-hidden group mb-16">
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
        className="relative w-full h-full rounded-[19px] bg-[#060D1A] p-6 lg:p-8 z-10 shadow-inner shadow-[#00D2FF]/5 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/fondosseccion.png')` }}
      >
        {/* Dark overlay to ensure text remains readable over the image */}
        <div className="absolute inset-0 bg-[#060D1A]/30 rounded-[19px] z-0" />
        
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10">
          
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className={`flex items-center gap-4 group/stat cursor-default ${idx !== 0 ? 'md:pl-8 pt-6 md:pt-0' : ''}`}>
                <div className="w-24 h-24 rounded-2xl border border-white/10 bg-gradient-to-br from-[#0A101D] to-[#0D1627] flex items-center justify-center flex-shrink-0 shadow-lg transition-all duration-300 group-hover/stat:scale-105 group-hover/stat:border-[#00D2FF]/40 group-hover/stat:shadow-[0_0_25px_rgba(0,210,255,0.15)] relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,210,255,0.1)_0%,transparent_70%)] opacity-0 group-hover/stat:opacity-100 transition-opacity duration-300" />
                  <Icon size={64} className="text-[#00D2FF] transition-all duration-300 group-hover/stat:scale-110 group-hover/stat:drop-shadow-[0_0_10px_rgba(0,210,255,0.5)] relative z-10" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-3xl font-extrabold text-[#FABB18] mb-1">
                    <Counter from={stat.from} to={stat.to} prefix={stat.prefix} suffix={stat.suffix} />
                  </h4>
                  <p className="text-[12px] text-[#8995A9] whitespace-pre-line leading-snug">
                    {stat.title}
                  </p>
                </div>
              </div>
            );
          })}
          
        </div>
      </div>
    </div>
  );
};
