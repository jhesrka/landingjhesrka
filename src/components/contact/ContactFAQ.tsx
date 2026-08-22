"use client";

import { useState } from "react";
import Image from "next/image";
import { HelpCircle, Plus, Minus } from "lucide-react";

export const ContactFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "¿Cuánto tarda un proyecto?",
      a: "El tiempo depende de la complejidad. Una Landing Page puede tomar de 3 a 5 días, mientras que una tienda online o sistema puede tomar de 2 a 4 semanas."
    },
    {
      q: "¿Trabajan en todo Ecuador?",
      a: "Sí, trabajamos de forma 100% remota con empresas de todo el país y también a nivel internacional."
    },
    {
      q: "¿Puedo pagar por etapas?",
      a: "Por supuesto. Usualmente solicitamos un anticipo del 50% para iniciar y el 50% restante contra entrega y satisfacción del proyecto."
    },
    {
      q: "¿Incluyen dominio y hosting?",
      a: "Te asesoramos en la compra y realizamos toda la configuración de tu dominio y hosting. El costo de estos servicios lo asume el cliente y se paga directamente al proveedor (no está incluido en el precio de la web)."
    }
  ];

  return (
    <section className="container mx-auto px-4 lg:px-8 max-w-[1400px] mt-12 mb-8 group">
      
      {/* Outer Container with the Exact Border Structure */}
      <div className="relative rounded-[40px] p-[1px] overflow-hidden shadow-[0_0_30px_rgba(0,210,255,0.05)] transition-shadow group-hover:shadow-[0_0_40px_rgba(0,210,255,0.15)]">
        
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
          className="absolute inset-[1px] rounded-[39px] bg-[#02050D] bg-cover bg-center shadow-inner shadow-[#00D2FF]/5 z-10" 
          style={{ backgroundImage: "url('/preguntas2.webp')" }}
        />

        {/* Content Container */}
        <div className="relative z-20 px-6 py-6 lg:px-12 lg:py-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">
          
          {/* Left: FAQ Accordion */}
          <div>
            <h3 className="text-white font-bold text-[18px] tracking-widest uppercase mb-5">
              PREGUNTAS RÁPIDAS
            </h3>
            
            <div className="space-y-2">
              {faqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div 
                    key={idx}
                    className="bg-[#060D1A] border border-white/5 rounded-2xl overflow-hidden transition-all duration-300"
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between py-3.5 px-5 text-left"
                    >
                      <div className="flex items-center gap-3">
                        <HelpCircle size={18} className="text-[#00D2FF]" />
                        <span className="text-white font-semibold text-[14px]">{faq.q}</span>
                      </div>
                      <div className="text-[#8995A9]">
                        {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                      </div>
                    </button>
                    
                    {isOpen && (
                      <div className="px-5 pb-4 pt-0">
                        <p className="text-[#8995A9] text-[13px] leading-relaxed pl-8 border-t border-white/5 pt-3">
                          {faq.a}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Empty space for the background graphic */}
          <div className="hidden lg:block"></div>

        </div>
      </div>
      </div>
    </section>
  );
};
