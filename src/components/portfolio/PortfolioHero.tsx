import Image from "next/image";
import { LayoutGrid, MessageSquare } from "lucide-react";

export const PortfolioHero = () => {
  return (
    <section 
      className="relative overflow-hidden pt-8 pb-10 lg:pt-12 lg:pb-16 bg-[#01040A] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/fondoservicios.webp')" }}
    >
      {/* Background radial gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#0052FF]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 max-w-[1400px] relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          {/* Left Content */}
          <div className="lg:w-1/2 text-left space-y-6">
            <h1 className="text-[40px] md:text-[56px] lg:text-[72px] font-black text-white leading-tight tracking-tight">
              Portafolio
            </h1>
            
            <h2 className="text-[18px] md:text-[22px] font-medium text-[#DCE6FF] max-w-[90%]">
              Soluciones digitales que <span className="text-[#FABB18] font-bold">impulsan negocios reales</span>
            </h2>
            
            <p className="text-[14px] md:text-[15px] text-[#8995A9] leading-relaxed max-w-xl">
              Cada proyecto es una alianza estratégica. Conectamos tecnología, diseño y rendimiento para crear experiencias que generan resultados.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a href="#proyectos" className="bg-[#FABB18] text-[#01040A] px-6 py-3 rounded-full font-bold text-[13px] hover:bg-white transition-all flex items-center gap-2">
                <LayoutGrid size={16} /> Ver todos los proyectos
              </a>
              <a href="#contacto" className="bg-transparent border border-white/20 text-white px-6 py-3 rounded-full font-bold text-[13px] hover:border-[#00D2FF] hover:text-[#00D2FF] transition-all flex items-center gap-2">
                <MessageSquare size={16} /> Hablemos de tu proyecto
              </a>
            </div>
          </div>

          {/* Right Image (Mockup) */}
          <div className="lg:w-1/2 w-full relative mt-10 lg:mt-0">
            <div className="relative w-full aspect-video md:aspect-[16/10] rounded-2xl overflow-visible flex items-center justify-center">
              {/* Decorative base glow under the laptop */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[60%] h-10 bg-[radial-gradient(ellipse_at_center,#00D2FF_0%,transparent_70%)] blur-[20px] opacity-60" />
              
              <div className="absolute opacity-0 animate-slide-in-right w-full h-full flex items-center justify-center">
                <div className="animate-float-smooth w-full h-full relative">
                  <Image 
                    src="/portafolio.webp" 
                    alt="Proyectos Destacados en Múltiples Dispositivos" 
                    fill
                    className="object-contain drop-shadow-[0_20px_50px_rgba(0,210,255,0.2)]"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
