"use client";

import { MessageSquare, ArrowRight, Monitor, ShoppingCart, Smartphone, LayoutDashboard, Rocket, Wrench } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";

const features = [
  { icon: <Monitor size={20} className="text-white" />, title: "Páginas Web", desc: "Modernas y rápidas" },
  { icon: <ShoppingCart size={20} className="text-white" />, title: "Tiendas Online", desc: "Vende 24/7" },
  { icon: <Smartphone size={20} className="text-white" />, title: "Aplicaciones Web", desc: "A la medida" },
  { icon: <LayoutDashboard size={20} className="text-white" />, title: "Sistemas Empresariales", desc: "Control total" },
  { icon: <Rocket size={20} className="text-white" />, title: "Landing Pages", desc: "Alta conversión" },
  { icon: <Wrench size={20} className="text-white" />, title: "Mantenimiento Web", desc: "Soporte y seguridad" },
];

export const Hero = () => {
  return (
    <section 
      className="relative min-h-[70vh] pt-32 pb-10 flex items-center bg-[#01040A] overflow-hidden" 
      id="inicio"
    >
      <Image 
        src="/fondohero.webp" 
        alt="Fondo Principal" 
        fill 
        priority 
        fetchPriority="high"
        sizes="100vw"
        className="object-cover object-center absolute inset-0 z-0 pointer-events-none" 
      />
      {/* Background glow lines and blur */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#0052FF]/20 rounded-full blur-[150px] -translate-y-1/2" />
      
      <div className="container mx-auto px-4 lg:px-8 max-w-[1400px] relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-12">
          
          {/* Left Text Content */}
          <div className="flex-1 text-left lg:text-left w-full max-w-2xl mt-8 lg:mt-0">
            <h1 className="text-[28px] sm:text-[32px] md:text-[42px] lg:text-[50px] font-extrabold text-white leading-[1.2] lg:leading-[1.1] mb-4 lg:mb-6 tracking-tight">
              DESARROLLAMOS <br />
              SOLUCIONES DIGITALES <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#FABB18] drop-shadow-[0_0_15px_rgba(250,187,24,0.3)]">QUE IMPULSAN <br /> TU NEGOCIO</span>
            </h1>

            <p className="text-[#8995A9] text-lg md:text-xl mb-10 max-w-xl leading-relaxed">
              Creamos páginas web, tiendas online, aplicaciones y sistemas a medida con diseño moderno, tecnología de vanguardia y enfoque en resultados.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
              <WhatsAppLink 
                message="Hola equipo de Jhesrka Developer, estoy interesado en crear un proyecto digital y me gustaría recibir asesoría."
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#FFD700] to-[#FABB18] text-black font-extrabold text-[13px] hover:brightness-110 transition-all shadow-[0_0_30px_rgba(250,187,24,0.4)] w-full sm:w-auto"
              >
                <MessageSquare size={18} />
                ESCRÍBENOS POR WHATSAPP
              </WhatsAppLink>
              <Link href="#portafolio" className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-transparent border border-[#00D2FF]/50 text-white font-bold text-[13px] hover:bg-[#00D2FF]/10 transition-all shadow-[0_0_15px_rgba(0,210,255,0.1)] w-full sm:w-auto">
                VER PORTAFOLIO
                <ArrowRight size={18} strokeWidth={2.5} />
              </Link>
            </div>

            <p className="text-[13px] text-white/50 font-medium">
              Respuestas rápidas • Asesoría gratuita • Sin compromiso
            </p>
          </div>

          {/* Right Content - 3D Ring placeholder & Feature Cards */}
          <div className="flex-1 w-full relative flex justify-center lg:justify-end items-center">
            {/* The Image (favicon.png) - Hidden on mobile to avoid overflow */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.5, y: 50, rotate: -15 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="hidden lg:flex absolute right-[38%] lg:right-[42%] top-[45%] -translate-y-1/2 w-[500px] h-[500px] items-center justify-center pointer-events-none"
            >
              <Image src="/FAVICON.png" alt="Decoración" width={400} height={400} className="object-contain opacity-90 animate-pulse" priority />
            </motion.div>

            {/* The vertical feature list on the far right */}
            <div className="flex flex-col gap-3 relative z-10 w-full max-w-[320px] sm:max-w-[400px] lg:w-[280px] lg:translate-x-6">
              {features.map((item, idx) => (
                <div 
                  key={idx} 
                  className="relative rounded-[20px] p-[1px] overflow-hidden group hover:-translate-y-1 transition-transform duration-300 cursor-pointer shadow-lg shadow-[#00D2FF]/5"
                >
                  {/* Base dark blue edge color */}
                  <div className="absolute inset-0 bg-[#0F2540]" />
                  
                  {/* Sequential Running Neon Line */}
                  <div 
                    className="absolute top-1/2 left-1/2 w-[250%] h-[250%] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0%,transparent_85%,#00D2FF_100%)] animate-border-trace" 
                    style={{ transform: 'translate(-50%, -50%)' }} 
                  />

                  {/* The Inner Content */}
                  <div className="relative w-full h-full rounded-[19px] bg-[#0A101D]/90 backdrop-blur-md p-3 flex items-center gap-4 z-10 overflow-hidden">
                    <div className="relative z-10 w-12 h-12 bg-transparent border border-white/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:border-[#00D2FF]/50 group-hover:bg-[#00D2FF]/10 transition-colors duration-300">
                      <div className="group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(0,210,255,0.8)] transition-all duration-300">
                        {item.icon}
                      </div>
                    </div>
                    <div className="relative z-10 flex flex-col">
                      <span className="text-white text-sm font-bold group-hover:text-[#00D2FF] transition-colors duration-300">{item.title}</span>
                      <span className="text-[#9CA3AF] text-xs group-hover:text-white/80 transition-colors duration-300">{item.desc}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
