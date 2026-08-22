import { ArrowRight, MessageSquare, Monitor, Smartphone } from "lucide-react";
import Link from "next/link";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";

export const ServicesHero = () => {
  return (
    <section 
      className="relative pt-32 pb-20 overflow-hidden bg-[#01040A] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/fondoservicios.webp')" }}
    >
      {/* Background glowing effects */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00D2FF]/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#FABB18]/5 blur-[120px] rounded-full pointer-events-none" />
      
      {/* Horizontal glowing line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#0052FF]/50 to-transparent" />

      <div className="container mx-auto px-4 lg:px-8 max-w-[1400px] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Text & CTA */}
          <div className="flex flex-col">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight">
              Nuestros <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#FABB18] drop-shadow-[0_0_15px_rgba(250,187,24,0.3)]">
                Servicios
              </span>
            </h1>
            <p className="text-[#8995A9] text-[16px] md:text-[18px] max-w-xl leading-relaxed mb-10">
              Desarrollamos soluciones digitales modernas para empresas que buscan crecer, vender más y destacar en Internet.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <Link href="#contacto" className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#FFD700] to-[#FABB18] text-black font-extrabold text-[13px] hover:brightness-110 transition-all shadow-[0_0_30px_rgba(250,187,24,0.4)] w-fit">
                Solicitar Cotización <ArrowRight size={18} strokeWidth={2.5} />
              </Link>
              <WhatsAppLink 
                message="Hola, estoy interesado en los servicios de Jhesrka Developer y me gustaría solicitar una cotización."
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-transparent border border-[#00D2FF]/50 text-white font-bold text-[13px] hover:bg-[#00D2FF]/10 transition-all shadow-[0_0_15px_rgba(0,210,255,0.1)] w-fit"
              >
                <MessageSquare size={18} className="text-[#00D2FF]" /> Hablar por WhatsApp
              </WhatsAppLink>
            </div>
          </div>

          {/* Right Column: Animated Image */}
          <div className="relative flex justify-center items-center h-[300px] md:h-[400px] lg:h-[500px] pointer-events-none mt-8 lg:mt-0">
            <div className="absolute opacity-0 animate-slide-in-right w-[95%] sm:w-[85%] md:w-[75%] lg:w-[110%] xl:w-[105%] lg:right-[-10%] xl:right-[-8%] mx-auto lg:mx-0">
              <div className="animate-float-smooth">
                <img 
                  src="/compuservicios.webp" 
                  alt="Servicios Digitales" 
                  className="w-full h-auto object-contain drop-shadow-[0_0_30px_rgba(0,210,255,0.2)]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
