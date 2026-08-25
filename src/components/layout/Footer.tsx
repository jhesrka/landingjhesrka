"use client";

import { useState, useEffect } from "react";
import { MessageSquare, ArrowRight, Clock, ShieldCheck, Cog, Award, MapPin, Phone, Mail, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
const PopupModal = dynamic(() => import("react-calendly").then(mod => mod.PopupModal), { ssr: false });
import { useContactForm } from "@/hooks/useContactForm";
import { usePathname } from "next/navigation";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { getSettings } from "@/app/dashboard/configuracion/actions";

export const Footer = () => {
  const pathname = usePathname();
  const {
    formData,
    isLoading,
    isSubmitted,
    isPopupOpen,
    cooldownTimeLeft,
    isMounted,
    handleChange,
    handleSubmit,
    closeCalendly
  } = useContactForm();

  const [footerPhone, setFooterPhone] = useState("+593 97 939 8949");

  useEffect(() => {
    const fetchNumber = async () => {
      try {
        const settings = await getSettings();
        if (settings?.whatsappNumber) {
          // Format as +XXX XX XXX XXXX if it's 12 digits, else just prepend +
          const num = settings.whatsappNumber;
          if (num.length >= 10) {
            setFooterPhone(`+${num.slice(0,3)} ${num.slice(3,5)} ${num.slice(5,8)} ${num.slice(8)}`);
          } else {
            setFooterPhone(`+${num}`);
          }
        }
      } catch (error) {
        console.error("Error fetching whatsapp number", error);
      }
    };
    fetchNumber();
  }, []);

  return (
    <footer className="bg-[#01040A] relative overflow-hidden" id="contacto">
      
      {/* Calendly Popup Modal */}
      {isMounted && (
        <PopupModal
          url="https://calendly.com/jhesrkadeveloper/30min"
          rootElement={document.body}
          open={isPopupOpen}
          onModalClose={closeCalendly}
          prefill={{
            name: formData.fullName,
            email: formData.email,
            customAnswers: {
              a1: formData.phone,
            }
          }}
        />
      )}

      {/* PRE-FOOTER GIANT CARD - Hidden on contact page */}
      {pathname !== '/contacto' && (
        <div className="container mx-auto px-4 lg:px-8 max-w-[1400px] py-6 relative z-10">
          
          {/* Abstract floating 3D elements */}
          <div className="absolute top-10 left-0 w-[200px] h-[300px] bg-[#FABB18] blur-[150px] opacity-20 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#00D2FF] blur-[150px] opacity-20 pointer-events-none" />

          {/* The Giant Glowing Card (Animated Border) */}
          <div className="relative rounded-[1.5rem] bg-[#060D1A]/80 border border-[#1A2333] p-6 lg:p-10 backdrop-blur-md overflow-hidden shadow-[0_0_30px_rgba(0,210,255,0.03)]">
            
            {/* 1) The main gradient border tracing effect */}
            <div className="absolute inset-0 z-0 block rounded-[1.5rem] overflow-hidden p-[1px]">
              <div className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] opacity-50 
                bg-[conic-gradient(from_90deg_at_50%_50%,#01040A_0%,#00D2FF_25%,#01040A_50%,#FABB18_75%,#01040A_100%)]" 
              />
            </div>
            
            {/* Inner content wrapper with Background Image Overlay */}
            <div className="absolute inset-[1px] bg-[#01040A] rounded-[1.5rem] z-0 overflow-hidden">
              <div 
                className="absolute inset-0 opacity-[0.25] mix-blend-screen pointer-events-none"
                style={{
                  backgroundImage: 'url(/fondosseccion.png)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              />
            </div>

            {/* 2) Corner Glow Effects */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#00D2FF]/20 rounded-full blur-[50px] opacity-100 pointer-events-none z-10" />
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#FABB18]/20 rounded-full blur-[50px] opacity-100 pointer-events-none z-10" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#FABB18]/20 rounded-full blur-[50px] opacity-100 pointer-events-none z-10" />
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#00D2FF]/20 rounded-full blur-[50px] opacity-100 pointer-events-none z-10" />

            {/* Content Area */}
            <div className="relative z-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              
              {/* Left Column: CTA */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                <h2 className="text-[24px] md:text-[30px] font-bold text-white leading-[1.2] mb-4 tracking-wide">
                  ¿LISTO PARA LLEVAR TU <br />
                  NEGOCIO AL SIGUIENTE NIVEL?
                </h2>
                <p className="text-[#8995A9] text-[13px] md:text-[15px] mb-6">
                  Cuéntanos tu proyecto y creemos algo increíble juntos.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <WhatsAppLink 
                    message="Hola Jhesrka Developer, estoy listo para llevar mi negocio al siguiente nivel."
                    className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#FFD700] to-[#FABB18] text-black font-bold text-[12px] md:text-[13px] hover:brightness-110 transition-all shadow-[0_0_25px_rgba(250,187,24,0.3)] w-fit whitespace-nowrap"
                  >
                    <MessageSquare size={16} className="fill-black" />
                    CHAT WHATSAPP
                  </WhatsAppLink>
                  <button className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-transparent border border-[#00D2FF]/50 text-white font-bold text-[12px] md:text-[13px] hover:bg-[#00D2FF]/10 transition-all shadow-[0_0_15px_rgba(0,210,255,0.1)] w-fit whitespace-nowrap">
                    COTIZAR AHORA
                  </button>
                </div>
              </div>

              {/* Middle Column: Form or Thank You Message */}
              <div className="lg:col-span-4 flex flex-col justify-center">
                {!isSubmitted ? (
                  <>
                    <h3 className="text-white text-[15px] font-bold mb-4">
                      Solicita tu cotización gratuita
                    </h3>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                      <div className="grid grid-cols-2 gap-3">
                        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="Nombre completo" className="bg-transparent border border-[#00D2FF]/30 rounded-lg px-4 py-3 text-[12px] text-white focus:outline-none focus:border-[#00D2FF] transition-colors w-full placeholder:text-[#4A5568]" />
                        <input type="text" name="phone" value={formData.phone} onChange={handleChange} required placeholder="WhatsApp / Teléfono" className="bg-transparent border border-[#00D2FF]/30 rounded-lg px-4 py-3 text-[12px] text-white focus:outline-none focus:border-[#00D2FF] transition-colors w-full placeholder:text-[#4A5568]" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Correo electrónico" className="bg-transparent border border-[#00D2FF]/30 rounded-lg px-4 py-3 text-[12px] text-white focus:outline-none focus:border-[#00D2FF] transition-colors w-full placeholder:text-[#4A5568]" />
                        <div className="relative">
                          <select name="projectType" value={formData.projectType} onChange={handleChange} className="bg-transparent border border-[#00D2FF]/30 rounded-lg px-4 py-3 text-[12px] text-[#4A5568] focus:outline-none focus:border-[#00D2FF] transition-colors w-full appearance-none outline-none">
                            <option className="bg-[#01040A]" value="">Tipo de proyecto</option>
                            <option className="bg-[#01040A]" value="Web">Página Web</option>
                            <option className="bg-[#01040A]" value="Tienda">Tienda Online</option>
                            <option className="bg-[#01040A]" value="App">Aplicación Web</option>
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1 1L5 5L9 1" stroke="#4A5568" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                        </div>
                      </div>
                      <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Cuéntanos sobre tu proyecto..." rows={2} className="bg-transparent border border-[#00D2FF]/30 rounded-lg px-4 py-3 text-[12px] text-white focus:outline-none focus:border-[#00D2FF] transition-colors w-full resize-none placeholder:text-[#4A5568]" />
                      
                      <button type="submit" disabled={isLoading} className="mt-2 flex items-center justify-center gap-2 w-full py-3.5 rounded-lg bg-gradient-to-r from-[#FFD700] to-[#FABB18] text-black font-extrabold text-[12px] hover:brightness-110 transition-all uppercase tracking-widest shadow-[0_0_20px_rgba(250,187,24,0.2)] disabled:opacity-70 disabled:cursor-not-allowed">
                        {isLoading ? "ENVIANDO..." : "ENVIAR SOLICITUD"} <ArrowRight size={16} strokeWidth={2.5} />
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-center p-8 bg-[#00D2FF]/5 border border-[#00D2FF]/20 rounded-xl">
                    <div className="w-16 h-16 bg-[#00D2FF]/10 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 size={32} className="text-[#00D2FF]" />
                    </div>
                    <h3 className="text-white text-[20px] font-bold mb-4">
                      ¡Gracias por tu mensaje!
                    </h3>
                    <p className="text-[#8995A9] text-[14px] leading-relaxed mb-6">
                      Hemos recibido tu solicitud y nos pondremos en contacto contigo lo antes posible.
                    </p>
                    {cooldownTimeLeft > 0 && (
                      <p className="text-[#4A5568] text-[11px] mt-6">
                        Podrás enviar otra solicitud en {cooldownTimeLeft} minutos.
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Right Column: Features */}
              <div className="lg:col-span-3 flex flex-col justify-center gap-6 lg:ml-4">
                {[
                  { icon: <Clock size={18} strokeWidth={2.5} />, title: "Respuesta rápida", desc: "Menos de 1 hora" },
                  { icon: <Award size={18} strokeWidth={2.5} />, title: "Asesoría gratuita", desc: "Sin compromiso" },
                  { icon: <Cog size={18} strokeWidth={2.5} />, title: "Soluciones a medida", desc: "Para tu negocio" },
                  { icon: <ShieldCheck size={18} strokeWidth={2.5} />, title: "Seguridad garantizada", desc: "Tus datos protegidos" },
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-4 group cursor-pointer">
                    {/* Glowing gold shield/hexagon shape */}
                    <div className="w-11 h-11 rounded-[10px] border border-[#FABB18]/40 shadow-[inset_0_0_10px_rgba(250,187,24,0.2)] flex items-center justify-center text-[#FABB18] flex-shrink-0 bg-[#FABB18]/5 relative transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(250,187,24,0.4),inset_0_0_15px_rgba(250,187,24,0.3)] group-hover:bg-[#FABB18]/10">
                      <div className="absolute inset-0 border border-[#FABB18]/20 rotate-45 rounded-[8px] scale-75 transition-transform duration-500 group-hover:rotate-180 group-hover:border-[#FABB18]/50" />
                      <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">{feat.icon}</div>
                    </div>
                    <div className="flex flex-col">
                      <h4 className="text-white text-[13px] font-bold mb-0.5 transition-colors duration-300 group-hover:text-[#FABB18]">{feat.title}</h4>
                      <p className="text-[#8995A9] text-[11px] transition-colors duration-300 group-hover:text-white/70">{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER BOTTOM */}
      <div className="container mx-auto px-4 lg:px-8 max-w-[1400px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 py-16 border-t border-white/5">
          
          {/* Logo Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center mb-6">
              <div className="relative w-[220px] h-[60px]">
                <Image src="/logojhesrka.webp" alt="JHESRKA Developer" fill className="object-contain object-left" />
              </div>
            </Link>
            <p className="text-[12px] text-[#8995A9] leading-relaxed pr-4">
              Desarrollamos soluciones digitales que impulsan negocios y generan resultados reales.
            </p>
          </div>

          {/* NAVEGACIÓN */}
          <div className="lg:col-span-1">
            <h4 className="text-white text-[13px] font-bold mb-6 uppercase tracking-wider">Navegación</h4>
            <ul className="space-y-4">
              {[
                { name: "Inicio", href: "/" },
                { name: "Servicios", href: "/servicios" },
                { name: "Portafolio", href: "/portafolio" },
                { name: "Tienda", href: "/tienda" },
                { name: "Contacto", href: "/#contacto" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-[#8995A9] text-[12px] hover:text-[#FABB18] transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SERVICIOS */}
          <div className="lg:col-span-1">
            <h4 className="text-white text-[13px] font-bold mb-6 uppercase tracking-wider">Servicios</h4>
            <ul className="space-y-4">
              {["Páginas Web", "Tiendas Online", "Aplicaciones Web", "Sistemas Empresariales", "Landing Pages", "Mantenimiento Web"].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-[#8995A9] text-[12px] hover:text-[#FABB18] transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACTO */}
          <div className="lg:col-span-1">
            <h4 className="text-white text-[13px] font-bold mb-6 uppercase tracking-wider">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-[#8995A9] text-[12px]">
                <MapPin size={16} className="text-white" /> Quito, Ecuador
              </li>
              <li className="flex items-center gap-3 text-[#8995A9] text-[12px]">
                <Phone size={16} className="text-white" /> {footerPhone}
              </li>
              <li className="flex items-center gap-3 text-[#8995A9] text-[12px]">
                <Mail size={16} className="text-white" /> hola@jhesrka.dev
              </li>
            </ul>
            <div className="flex items-center gap-4 mt-8">
              <Link href="#" className="text-[#8995A9] hover:text-[#00D2FF] transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </Link>
              <Link href="#" className="text-[#8995A9] hover:text-[#00D2FF] transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </Link>
              <Link href="#" className="text-[#8995A9] hover:text-[#00D2FF] transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </Link>
              <Link href="#" className="text-[#8995A9] hover:text-[#00D2FF] transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              </Link>
            </div>
          </div>

          {/* MÉTODOS DE PAGO */}
          <div className="lg:col-span-1 flex flex-col lg:items-start text-left">
            <h4 className="text-white text-[13px] font-bold mb-6 uppercase tracking-wider w-full">Aceptamos</h4>
            <div className="w-[180px] h-[50px] bg-white rounded-md relative opacity-90 hover:opacity-100 transition-opacity">
              <Image 
                src="/marcas.webp" 
                alt="Tarjetas Aceptadas" 
                fill 
                className="object-contain p-0.5" 
                unoptimized 
              />
            </div>
            <p className="text-[#8995A9] text-[11px] mt-4 w-full">Pagos seguros con crédito y débito.</p>
          </div>

        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/5 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-[#8995A9] text-[11px]">
            © 2026 JHESRKA Developer. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
