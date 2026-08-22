"use client";

import { useState } from "react";
import { MessageCircleQuestion, Plus } from "lucide-react";
import Image from "next/image";

const faqs = [
  {
    question: "¿Cuánto tarda un proyecto?",
    answer: "El tiempo depende de la complejidad. Una landing page toma alrededor de 1 semana, mientras que una web corporativa o tienda online puede tardar de 3 a 4 semanas.",
  },
  {
    question: "¿Cuánto cuesta una página web?",
    answer: "Los costos varían según los requerimientos y funciones específicas. Contáctanos para recibir una cotización a medida sin compromiso.",
  },
  {
    question: "¿Qué necesito para empezar?",
    answer: "Solo necesitamos que nos cuentes tu idea, qué servicios ofreces y si tienes logotipo y colores corporativos. Nosotros nos encargamos del resto.",
  },
  {
    question: "¿Incluyen dominio y hosting?",
    answer: "Te asesoramos en la compra y realizamos toda la configuración de tu dominio y hosting. El costo de estos servicios lo asume el cliente y se paga directamente al proveedor (no está incluido en el precio de la web).",
  },
  {
    question: "¿Dan soporte después de entregar el proyecto?",
    answer: "Claro que sí. Ofrecemos planes de mantenimiento o soporte por horas para ayudarte a mantener tu sitio siempre seguro y actualizado.",
  },
];

export const ServicesFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-6 relative border-t border-b border-white/5 overflow-hidden bg-[#01040A]">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.15] mix-blend-screen pointer-events-none"
        style={{
          backgroundImage: 'url(/fondosseccion.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      <div className="container mx-auto px-4 lg:px-8 max-w-[1400px] relative z-10">
        
        {/* Animated Border Container */}
        <div className="relative rounded-2xl bg-[#060D1A]/80 border border-[#1A2333] p-6 md:p-8 backdrop-blur-md group overflow-hidden shadow-[0_0_30px_rgba(0,210,255,0.03)]">
          
          {/* 1) The main gradient border tracing effect */}
          <div className="absolute inset-0 z-0 block rounded-2xl overflow-hidden p-[1px]">
            <div className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] opacity-50 
              bg-[conic-gradient(from_90deg_at_50%_50%,#01040A_0%,#00D2FF_25%,#01040A_50%,#FABB18_75%,#01040A_100%)]" 
            />
          </div>
          
          {/* Inner content wrapper */}
          <div className="absolute inset-[1px] bg-[#01040A] rounded-2xl z-0" />

          {/* 2) Corner Glow Effects */}
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#00D2FF]/20 rounded-full blur-[50px] opacity-100 pointer-events-none z-10" />
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#FABB18]/20 rounded-full blur-[50px] opacity-100 pointer-events-none z-10" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#FABB18]/20 rounded-full blur-[50px] opacity-100 pointer-events-none z-10" />
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#00D2FF]/20 rounded-full blur-[50px] opacity-100 pointer-events-none z-10" />

          {/* Content Area */}
          <div className="relative z-20">
            <h2 className="text-white text-[18px] md:text-[20px] font-bold tracking-wide mb-6 uppercase">
              PREGUNTAS FRECUENTES
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              
              {/* Left Column: Accordion */}
              <div className="flex flex-col gap-2">
                {faqs.map((faq, idx) => (
                  <div 
                    key={idx} 
                    className={`bg-[#040A15] border ${openIndex === idx ? 'border-[#00D2FF]/50 shadow-[0_0_15px_rgba(0,210,255,0.1)]' : 'border-white/5'} rounded-xl overflow-hidden transition-all duration-300`}
                  >
                    <button
                      onClick={() => toggleFAQ(idx)}
                      className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
                    >
                      <span className="text-white text-[13px] font-medium tracking-wide">
                        {faq.question}
                      </span>
                      <div className={`w-5 h-5 rounded-full bg-[#00D2FF]/10 flex items-center justify-center text-[#00D2FF] transition-transform duration-300 ${openIndex === idx ? 'rotate-45 bg-[#00D2FF] text-[#01040A]' : ''}`}>
                        <Plus size={12} strokeWidth={3} />
                      </div>
                    </button>
                    <div 
                      className={`overflow-hidden transition-all duration-300 ${openIndex === idx ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                      <p className="px-4 pb-4 text-[#8995A9] text-[12px] leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Column: Image */}
              <div className="hidden lg:flex items-center justify-center relative w-full h-[350px]">
                 {/* Animated Border Container for Image */}
                 <div className="relative w-full h-full rounded-2xl bg-[#060D1A]/80 border border-[#1A2333] p-1.5 backdrop-blur-md overflow-hidden shadow-[0_0_30px_rgba(0,210,255,0.05)]">
                    
                    {/* The main gradient border tracing effect */}
                    <div className="absolute inset-0 z-0 block rounded-2xl overflow-hidden p-[1px]">
                      <div className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] opacity-100 
                        bg-[conic-gradient(from_90deg_at_50%_50%,#01040A_0%,#00D2FF_50%,#01040A_50%,#FABB18_100%,#01040A_100%)]" 
                      />
                    </div>
                    
                    {/* Inner background to hide the solid gradient */}
                    <div className="absolute inset-[1px] bg-[#01040A] rounded-2xl z-0" />

                    {/* Image Area */}
                    <div className="relative z-10 w-full h-full rounded-xl overflow-hidden bg-black">
                      <Image 
                        src="/preguntas.webp" 
                        alt="Preguntas Frecuentes" 
                        fill 
                        className="object-cover hover:scale-105 transition-all duration-700"
                      />
                    </div>
                 </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
