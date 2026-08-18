import { Code2, Rocket, ShieldCheck, Diamond } from "lucide-react";

export const ContactWhyUs = () => {
  const reasons = [
    { 
      icon: Code2, 
      title: "Desarrollo a medida", 
      desc: "Soluciones personalizadas adaptadas a las necesidades de tu negocio." 
    },
    { 
      icon: Rocket, 
      title: "Entrega rápida", 
      desc: "Cumplimos los plazos acordados sin comprometer la calidad." 
    },
    { 
      icon: ShieldCheck, 
      title: "Soporte continuo", 
      desc: "Estamos contigo incluso después de entregar tu proyecto." 
    },
    { 
      icon: Diamond, 
      title: "Calidad garantizada", 
      desc: "Utilizamos tecnologías modernas para resultados de alto rendimiento." 
    },
  ];

  return (
    <section className="container mx-auto px-4 lg:px-8 max-w-[1400px] mt-20">
      <div className="text-center mb-10">
        <h3 className="text-white font-bold text-[18px] tracking-widest uppercase">
          ¿POR QUÉ TRABAJAR CON NOSOTROS?
        </h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {reasons.map((reason, idx) => {
          const Icon = reason.icon;
          return (
            <div key={idx} className="relative group h-full">
              {/* Outer Container with the Exact Border Structure */}
              <div className="absolute inset-0 rounded-[20px] p-[1px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-shadow group-hover:shadow-[0_4px_25px_rgba(0,210,255,0.15)]">
                
                {/* Base dark blue edge color */}
                <div className="absolute inset-0 bg-[#0F2540]" />
                
                {/* Sequential Running Neon Line */}
                <div className="absolute top-1/2 left-1/2 w-[250%] h-[250%] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0%,transparent_85%,#00D2FF_100%)] animate-border-trace" />
                
                {/* Radial gradient glowing corners */}
                <div className="absolute top-0 left-0 w-24 h-24 bg-[radial-gradient(circle_at_top_left,#00D2FF_0%,transparent_60%)] opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-0 right-0 w-24 h-24 bg-[radial-gradient(circle_at_top_right,#00D2FF_0%,transparent_60%)] opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-[radial-gradient(circle_at_bottom_left,#00D2FF_0%,transparent_60%)] opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-[radial-gradient(circle_at_bottom_right,#00D2FF_0%,transparent_60%)] opacity-80 group-hover:opacity-100 transition-opacity" />
                
                {/* Inner Content Background */}
                <div className="absolute inset-[1px] rounded-[19px] bg-[#050A15] shadow-inner shadow-[#00D2FF]/5 z-10 transition-colors group-hover:bg-[#081220]" />
              </div>

              {/* Inner Content Data */}
              <div className="relative z-20 h-full p-6 flex flex-row items-center xl:items-start gap-5">
                {/* Glowing Icon on the left */}
                <div className="flex-shrink-0 text-[#00D2FF] drop-shadow-[0_0_15px_rgba(0,210,255,0.8)] xl:mt-1 transition-transform group-hover:scale-105">
                  <Icon size={64} strokeWidth={1.2} />
                </div>
                
                {/* Text on the right */}
                <div className="flex flex-col">
                  <h4 className="text-white text-[15px] font-bold mb-2">
                    {reason.title}
                  </h4>
                  <p className="text-[#8995A9] text-[12px] leading-relaxed">
                    {reason.desc}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
