"use client";

import { User, Building, Mail, Phone, Globe, ShoppingCart, Briefcase, Rocket, Code, DollarSign, Pen, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useContactForm } from "@/hooks/useContactForm";
import { PopupModal } from "react-calendly";

export const ContactFormAdvanced = () => {
  const {
    formData,
    isLoading,
    isSubmitted,
    isPopupOpen,
    cooldownTimeLeft,
    isMounted,
    handleChange,
    setFieldValue,
    handleSubmit,
    closeCalendly
  } = useContactForm();

  // Definition for project types to map over them
  const projectTypes = [
    { id: "Página Web", label: "Página Web", icon: Globe },
    { id: "Tienda Online", label: "Tienda Online", icon: ShoppingCart },
    { id: "Sistema Empresarial", label: "Sistema Empresarial", icon: Briefcase },
    { id: "Landing Page", label: "Landing Page", icon: Rocket },
    { id: "Aplicación Web", label: "Aplicación Web Personalizada", icon: Code },
  ];

  return (
    <div className="relative p-[1px] rounded-[24px] overflow-hidden group shadow-[0_0_40px_rgba(0,210,255,0.1)]">
      {/* Animated Border */}
      <div className="absolute top-1/2 left-1/2 w-[250%] h-[250%] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0%,transparent_85%,#00D2FF_100%)] animate-border-trace" />
      
      {/* Inner Content */}
      <div className="relative z-10 h-full w-full rounded-[23px] bg-[#060D1A]/90 p-8 backdrop-blur-xl">
      
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

      {/* Decorative Corner Glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#00D2FF]/20 rounded-full blur-[50px] opacity-100 pointer-events-none z-0" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#FABB18]/10 rounded-full blur-[50px] opacity-100 pointer-events-none z-0" />

      {!isSubmitted ? (
        <div className="relative z-10">
          <h2 className="text-[22px] font-bold text-white mb-6">
            Solicita tu cotización <span className="text-[#FABB18]">gratuita</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* User Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8995A9]">
                  <User size={16} />
                </div>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="Nombre completo" className="w-full bg-[#0A101D] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-[13px] text-white focus:outline-none focus:border-[#00D2FF] transition-colors placeholder:text-[#4A5568]" />
              </div>
              
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8995A9]">
                  <Building size={16} />
                </div>
                <input type="text" name="company" value={formData.company || ""} onChange={handleChange} placeholder="Empresa (Opcional)" className="w-full bg-[#0A101D] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-[13px] text-white focus:outline-none focus:border-[#00D2FF] transition-colors placeholder:text-[#4A5568]" />
              </div>

              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8995A9]">
                  <Mail size={16} />
                </div>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Correo electrónico" className="w-full bg-[#0A101D] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-[13px] text-white focus:outline-none focus:border-[#00D2FF] transition-colors placeholder:text-[#4A5568]" />
              </div>
              
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8995A9]">
                  <Phone size={16} />
                </div>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} required placeholder="WhatsApp" className="w-full bg-[#0A101D] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-[13px] text-white focus:outline-none focus:border-[#00D2FF] transition-colors placeholder:text-[#4A5568]" />
              </div>
            </div>

            {/* Project Type */}
            <div>
              <p className="text-[12px] text-white/80 mb-3 ml-1 font-medium">Tipo de proyecto</p>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                {projectTypes.slice(0, 3).map((type) => {
                  const Icon = type.icon;
                  const isSelected = formData.projectType === type.id;
                  return (
                    <button
                      type="button"
                      key={type.id}
                      onClick={() => setFieldValue("projectType", type.id)}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-[11px] font-semibold transition-all border ${
                        isSelected 
                          ? "bg-[#0A101D] border-[#00D2FF] text-[#00D2FF]" 
                          : "bg-[#0A101D] border-white/5 text-[#8995A9] hover:border-white/20 hover:text-white"
                      }`}
                    >
                      <Icon size={14} className={isSelected ? "text-[#00D2FF]" : "opacity-70"} />
                      <span className="truncate">{type.label}</span>
                    </button>
                  );
                })}
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {projectTypes.slice(3, 5).map((type) => {
                  const Icon = type.icon;
                  const isSelected = formData.projectType === type.id;
                  return (
                    <button
                      type="button"
                      key={type.id}
                      onClick={() => setFieldValue("projectType", type.id)}
                      className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-[11px] font-semibold transition-all border ${
                        isSelected 
                          ? "bg-[#0A101D] border-[#00D2FF] text-[#00D2FF]" 
                          : "bg-[#0A101D] border-white/5 text-[#8995A9] hover:border-white/20 hover:text-white"
                      }`}
                    >
                      <Icon size={14} className={isSelected ? "text-[#00D2FF]" : "opacity-70"} />
                      <span className="truncate">{type.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Budget */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8995A9]">
                <DollarSign size={16} />
              </div>
              <select name="budget" value={formData.budget || ""} onChange={handleChange} className="w-full bg-[#0A101D] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-[13px] text-white focus:outline-none focus:border-[#00D2FF] transition-colors appearance-none outline-none">
                <option value="" className="bg-[#01040A]">Presupuesto aproximado (Opcional)</option>
                <option value="-500" className="bg-[#01040A]">Menos de $500</option>
                <option value="500-1000" className="bg-[#01040A]">$500 - $1,000</option>
                <option value="1000-3000" className="bg-[#01040A]">$1,000 - $3,000</option>
                <option value="+3000" className="bg-[#01040A]">Más de $3,000</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#8995A9]">
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            {/* Message */}
            <div className="relative">
              <div className="absolute left-4 top-4 text-[#8995A9]">
                <Pen size={16} />
              </div>
              <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Cuéntanos sobre tu proyecto..." rows={3} className="w-full bg-[#0A101D] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-[13px] text-white focus:outline-none focus:border-[#00D2FF] transition-colors resize-none placeholder:text-[#4A5568]" />
            </div>

            {/* Submit Button */}
            <button type="submit" disabled={isLoading} className="w-full py-4 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#FABB18] text-black font-extrabold text-[13px] hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(250,187,24,0.3)] disabled:opacity-70 disabled:cursor-not-allowed uppercase tracking-widest mt-2">
              {isLoading ? "ENVIANDO..." : "ENVIAR SOLICITUD"} <ArrowRight size={18} strokeWidth={2.5} />
            </button>
            
            <div className="flex items-center justify-center gap-2 text-[11px] text-[#8995A9] pt-2">
              <ShieldCheck size={14} className="text-[#FABB18]" /> Te responderemos en menos de 24 horas.
            </div>

          </form>
        </div>
      ) : (
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center p-8 min-h-[400px]">
          <div className="w-20 h-20 bg-[#00D2FF]/10 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 size={40} className="text-[#00D2FF]" />
          </div>
          <h3 className="text-white text-[24px] font-bold mb-4">
            ¡Gracias por contactarnos!
          </h3>
          <p className="text-[#8995A9] text-[15px] leading-relaxed mb-6 max-w-[300px]">
            Hemos recibido tu solicitud y nuestro equipo se pondrá en contacto contigo muy pronto.
          </p>
          {cooldownTimeLeft > 0 && (
            <p className="text-[#4A5568] text-[12px] mt-6">
              Podrás enviar otra solicitud en {cooldownTimeLeft} minutos.
            </p>
          )}
        </div>
      )}
      </div>
    </div>
  );
};
