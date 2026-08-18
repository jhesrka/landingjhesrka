"use client";

import Image from "next/image";
import { MessageSquare, Calendar, Zap, HeadphonesIcon, ShieldCheck } from "lucide-react";
import { ContactFormAdvanced } from "./ContactFormAdvanced";

export const ContactHero = () => {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-32">
      
      {/* Top Background (City) - Goes from top until roughly where the text ends */}
      <div 
        className="absolute top-0 left-0 w-full h-[65%] lg:h-[70%] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/fondoservicios.webp)' }}
      />

      {/* Bottom Background (Setup/Mockup) - Spans full width at the bottom */}
      <div 
        className="absolute bottom-0 left-0 w-full h-[35%] lg:h-[40%] bg-cover bg-center bg-no-repeat border-t border-[#00D2FF]/20"
        style={{ backgroundImage: 'url(/fondocontactos.webp)' }}
      />

      {/* Radial glows */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,#00D2FF_0%,transparent_60%)] opacity-10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,#FABB18_0%,transparent_60%)] opacity-5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 max-w-[1400px] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Left Column (Text) */}
          <div className="lg:col-span-7 flex flex-col space-y-8 lg:pr-8">
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-[#00D2FF] text-[12px] font-bold tracking-widest uppercase">
                <div className="w-8 h-[1px] bg-[#00D2FF]" />
                Contáctanos
                <div className="w-8 h-[1px] bg-[#00D2FF]" />
              </div>
              
              <h1 className="text-[40px] md:text-[56px] lg:text-[64px] font-black text-white leading-[1.1] tracking-tight">
                Hablemos de tu <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#FABB18] drop-shadow-[0_0_15px_rgba(250,187,24,0.3)]">
                  próximo proyecto
                </span>
              </h1>
              
              <p className="text-[15px] md:text-[18px] text-[#8995A9] leading-relaxed max-w-xl">
                Cuéntanos tu idea y te ayudaremos a convertirla en una solución digital profesional para tu empresa.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a href="https://wa.me/593991234567" target="_blank" rel="noreferrer" className="bg-gradient-to-r from-[#FFD700] to-[#FABB18] text-[#01040A] px-8 py-3.5 rounded-xl font-extrabold text-[13px] hover:brightness-110 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(250,187,24,0.3)]">
                  <MessageSquare size={18} strokeWidth={2.5} /> ESCRIBIRME POR WHATSAPP
                </a>
                <button className="bg-transparent border border-white/20 text-white px-8 py-3.5 rounded-xl font-bold text-[13px] hover:border-[#00D2FF] hover:text-[#00D2FF] transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(0,210,255,0.05)]">
                  <Calendar size={18} /> SOLICITAR COTIZACIÓN
                </button>
              </div>

              {/* Features inline */}
              <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-white/5 w-fit">
                <div className="flex items-center gap-2 text-[12px] text-[#8995A9]">
                  <Zap size={16} className="text-[#00D2FF]" /> Respuesta rápida
                </div>
                <div className="flex items-center gap-2 text-[12px] text-[#8995A9]">
                  <HeadphonesIcon size={16} className="text-[#00D2FF]" /> Asesoría gratuita
                </div>
                <div className="flex items-center gap-2 text-[12px] text-[#8995A9]">
                  <ShieldCheck size={16} className="text-[#00D2FF]" /> Sin compromiso
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Advanced Form) */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            <ContactFormAdvanced />
          </div>

        </div>
      </div>
    </section>
  );
};
