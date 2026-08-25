import { MapPin, Mail, Phone, Globe } from "lucide-react";
import Image from "next/image";

export const ContactMethods = () => {
  const methods = [
    { icon: MapPin, title: "UBICACIÓN", desc: "Quito – Ecuador" },
    { icon: Mail, title: "CORREO", desc: "hola@jhesrka.dev" },
    { icon: Phone, title: "TELÉFONO / WHATSAPP", desc: "+593 99 123 4567" },
    { icon: Globe, title: "SITIO WEB", desc: "www.jhesrka.dev" },
  ];

  return (
    <section className="container mx-auto px-4 lg:px-8 max-w-[1400px] mt-16">
      
      <div className="relative mt-8 group">
        
        {/* The Exact Border Structure from ServicesWhyChooseUs */}
        <div className="absolute inset-0 rounded-[20px] p-[1px] overflow-hidden">
          
          {/* Base dark blue edge color */}
          <div className="absolute inset-0 bg-[#0F2540]" />
          
          {/* Sequential Running Neon Line */}
          <div className="absolute top-1/2 left-1/2 w-[250%] h-[250%] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0%,transparent_85%,#00D2FF_100%)] animate-border-trace" />
          
          {/* Radial gradient glowing corners */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-[radial-gradient(circle_at_top_left,#00D2FF_0%,transparent_60%)] opacity-80 group-hover:opacity-100 transition-opacity" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,#00D2FF_0%,transparent_60%)] opacity-80 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[radial-gradient(circle_at_bottom_left,#00D2FF_0%,transparent_60%)] opacity-80 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_bottom_right,#00D2FF_0%,transparent_60%)] opacity-80 group-hover:opacity-100 transition-opacity" />
          
          {/* Inner Content Background */}
          <div 
            className="absolute inset-[1px] rounded-[19px] bg-[#050A15] shadow-inner shadow-[#00D2FF]/5 z-10 overflow-hidden" 
          >
            <Image src="/fondosseccion.png" alt="" fill sizes="(max-width: 768px) 100vw, 100vw" className="object-cover object-bottom absolute inset-0 z-0 opacity-100 pointer-events-none" />
          </div>
        </div>

        {/* Title interrupting the top border */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#050A15] border border-[#0F2540] px-6 py-1 rounded-full z-20 shadow-[0_0_15px_rgba(0,210,255,0.1)]">
          <h3 className="text-white font-bold text-[15px] tracking-widest uppercase whitespace-nowrap">
            OTRAS FORMAS DE CONTACTO
          </h3>
        </div>
        
        {/* Inner Content (Grid of 4 cards) */}
        <div className="relative z-20 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 w-full p-8 lg:p-10 pt-12">
          {methods.map((method, idx) => {
            const Icon = method.icon;
            return (
              <div 
                key={idx}
                className="bg-[#050A15]/80 border border-[#00D2FF]/10 border-t-[#00D2FF]/40 rounded-2xl p-5 lg:p-6 flex flex-row items-center gap-5 shadow-[inset_0_1px_15px_rgba(0,210,255,0.05)] hover:bg-[#081020] transition-colors"
              >
                {/* Glowing Icon on the left */}
                <div className="flex-shrink-0 text-[#00D2FF] drop-shadow-[0_0_12px_rgba(0,210,255,0.8)]">
                  <Icon size={36} strokeWidth={1.5} />
                </div>
                
                {/* Text on the right */}
                <div className="flex flex-col">
                  <span className="text-white text-[12px] font-bold leading-tight mb-1 tracking-widest uppercase">
                    {method.title}
                  </span>
                  <span className="text-white/80 text-[13px] leading-tight font-light">
                    {method.desc}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
};
