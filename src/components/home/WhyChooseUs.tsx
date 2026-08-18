"use client";

import { CheckCircle2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { useInView, animate } from "framer-motion";

const stats = [
  { from: 0, to: 150, prefix: "+", suffix: "", label: "PROYECTOS\nCOMPLETADOS" },
  { from: 0, to: 60, prefix: "+", suffix: "", label: "APLICACIONES\nDESARROLLADAS" },
  { from: 0, to: 98, prefix: "", suffix: "%", label: "CLIENTES\nSATISFECHOS" },
  { from: 0, to: 24, prefix: "", suffix: "/7", label: "SOPORTE Y\nACOMPAÑAMIENTO" },
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

const reasons = [
  "Diseños 100% personalizados",
  "Tecnología moderna y escalable",
  "Enfoque en resultados y ventas",
  "Atención cercana y soporte real",
  "Cumplimos tiempos y objetivos",
];

export const WhyChooseUs = () => {
  return (
    <section className="py-8 lg:py-10 bg-[#01040A] relative border-b border-white/5" id="nosotros">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#0052FF]/10 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 max-w-[1200px] relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16">
          
          {/* Left Side: Title & Checks */}
          <div className="lg:w-[40%] text-left">
            <h2 className="text-[28px] md:text-[36px] font-bold text-white mb-8 tracking-wide">
              ¿POR QUÉ <br /> ELEGIRNOS?
            </h2>
            <ul className="space-y-4">
              {reasons.map((reason, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#0052FF]/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 size={16} className="text-[#00D2FF]" />
                  </div>
                  <span className="text-[#DCE6FF] text-[13px] tracking-wide">{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side: Stats Container */}
          <div className="lg:w-[62%] w-full">
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
                className="relative w-full h-full rounded-[19px] bg-[#050A15] bg-cover bg-center p-3 lg:p-5 z-10 overflow-hidden shadow-inner shadow-[#00D2FF]/5"
                style={{ backgroundImage: "url('/fondosseccion.png')" }}
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-5">
                  {stats.map((stat, idx) => (
                    <div 
                      key={idx} 
                      className="bg-[#0A101D]/80 backdrop-blur-sm border border-white/5 rounded-xl flex flex-col items-center justify-center p-6 lg:p-8 text-center hover:bg-[#0D1526] transition-colors"
                    >
                      <h4 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#FABB18] mb-3 drop-shadow-[0_0_15px_rgba(250,187,24,0.3)] tracking-tight">
                        <Counter from={stat.from} to={stat.to} prefix={stat.prefix} suffix={stat.suffix} />
                      </h4>
                      <p className="text-[10px] lg:text-[11px] text-white font-semibold uppercase tracking-[0.15em] whitespace-pre-line leading-tight">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
