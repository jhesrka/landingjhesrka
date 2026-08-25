import Image from "next/image";
import { Code2, Cpu, FileSignature, MonitorSmartphone, ShieldCheck, Zap } from "lucide-react";

const features = [
  {
    icon: <FileSignature size={24} className="text-[#00D2FF]" />,
    title: "Diseño personalizado\n100% único",
  },
  {
    icon: <Code2 size={24} className="text-[#00D2FF]" />,
    title: "Tecnología\nmoderna",
  },
  {
    icon: <Zap size={24} className="text-[#00D2FF]" />,
    title: "Alto rendimiento\ny velocidad",
  },
  {
    icon: <Cpu size={24} className="text-[#00D2FF]" />,
    title: "Optimización\nSEO",
  },
  {
    icon: <MonitorSmartphone size={24} className="text-[#00D2FF]" />,
    title: "Adaptado para\ntodos los dispositivos",
  },
  {
    icon: <ShieldCheck size={24} className="text-[#00D2FF]" />,
    title: "Seguridad\navanzada",
  },
];

export const ServicesWhyChooseUs = () => {
  return (
    <section className="py-8 bg-[#01040A] relative z-10">
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
            className="relative w-full h-full rounded-[19px] bg-[#050A15] py-8 px-6 md:px-8 flex flex-col xl:flex-row items-center gap-12 xl:gap-8 z-10 overflow-hidden shadow-inner shadow-[#00D2FF]/5"
          >
            <Image src="/fondosseccion.png" alt="" fill sizes="(max-width: 768px) 100vw, 100vw" className="object-cover object-center absolute inset-0 z-0 opacity-[0.15] mix-blend-screen pointer-events-none" />
            
            {/* Title Area */}
            <div className="xl:w-1/4 text-center xl:text-left relative z-10">
              <h2 className="text-white text-[20px] md:text-[24px] font-bold leading-tight tracking-wide">
                ¿POR QUÉ ELEGIR <br className="hidden xl:block" />
                JHESRKA DEVELOPER?
              </h2>
            </div>

            {/* Features Horizontal List */}
            <div className="xl:w-3/4 w-full relative z-10">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-4">
                {features.map((feat, idx) => (
                  <div key={idx} className="flex flex-col items-center justify-start text-center group/item">
                    <div className="w-16 h-16 rounded-full bg-[#00D2FF]/5 border border-[#00D2FF]/30 flex items-center justify-center mb-4 relative shadow-[0_0_20px_rgba(0,210,255,0.05)] group-hover/item:shadow-[0_0_20px_rgba(0,210,255,0.2)] group-hover/item:border-[#00D2FF] transition-all duration-300">
                      {/* Inner glowing circle */}
                      <div className="absolute inset-1 rounded-full border border-[#00D2FF]/20" />
                      {feat.icon}
                    </div>
                    <h4 className="text-white text-[11px] font-medium leading-relaxed whitespace-pre-line px-2 text-[#DCE6FF]">
                      {feat.title}
                    </h4>
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
