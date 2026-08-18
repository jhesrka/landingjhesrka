import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export const PortfolioCTA = () => {
  return (
    <section className="container mx-auto px-4 lg:px-8 max-w-[1400px] pb-20">
      <div className="relative rounded-[24px] overflow-hidden border border-[#00D2FF]/20 bg-[#040A15]">
        
        {/* Background Image */}
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/fondoservicios.webp')] bg-cover bg-center" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between py-6 px-10 lg:py-8 lg:px-16 gap-6 lg:gap-10">
          
          {/* Text Content */}
          <div className="md:w-3/5 space-y-4 lg:space-y-6">
            <h2 className="text-[32px] md:text-[36px] font-bold text-white leading-tight">
              ¿Tienes un <span className="text-[#FABB18]">proyecto</span> en mente?
            </h2>
            <p className="text-[#8995A9] text-[14px] md:text-[15px] max-w-xl">
              Cuéntanos tu idea y la convertiremos en una solución digital increíble.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <a 
                href="https://wa.me/593991234567" 
                target="_blank" 
                rel="noreferrer"
                className="w-full sm:w-auto bg-[#FABB18] text-[#01040A] px-6 py-3 rounded-xl font-bold text-[14px] hover:bg-white transition-all flex items-center justify-center gap-2"
              >
                <FaWhatsapp size={20} /> Escríbenos por WhatsApp
              </a>
              <a 
                href="#contacto" 
                className="w-full sm:w-auto bg-transparent border border-white/20 text-white px-6 py-3 rounded-xl font-bold text-[14px] hover:border-[#00D2FF] hover:text-[#00D2FF] transition-all flex items-center justify-center gap-2"
              >
                Solicitar una cotización <ArrowRight size={16} />
              </a>
            </div>
          </div>

          {/* 3D Logo / Graphic */}
          <div className="md:w-2/5 flex justify-center md:justify-center lg:-translate-x-12">
            <div className="relative w-[180px] h-[180px] md:w-[220px] md:h-[220px]">
              {/* Base glow */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-4/5 h-4 bg-[#00D2FF] blur-[20px] opacity-40 rounded-full" />
              
              <Image 
                src="/FAVICON.png" 
                alt="Jhesrka Logo 3D" 
                fill
                className="object-contain animate-float-smooth hover:scale-105 transition-transform duration-500 drop-shadow-[0_0_30px_rgba(0,210,255,0.2)]"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
