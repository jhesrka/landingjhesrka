import { MessageSquare, Calendar } from "lucide-react";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";

export const ContactFinalCTA = () => {
  return (
    <section className="container mx-auto px-4 lg:px-8 max-w-[1400px] pb-6 group">
      
      {/* Outer Container with the Exact Border Structure */}
      <div className="relative rounded-[24px] p-[1px] overflow-hidden shadow-[0_0_20px_rgba(0,210,255,0.05)] transition-shadow group-hover:shadow-[0_0_30px_rgba(0,210,255,0.15)]">
        
        {/* Base dark blue edge color */}
        <div className="absolute inset-0 bg-[#0F2540]" />
        
        {/* Sequential Running Neon Line */}
        <div className="absolute top-1/2 left-1/2 w-[250%] h-[250%] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0%,transparent_85%,#00D2FF_100%)] animate-border-trace" />
        
        {/* Radial gradient glowing corners */}
        <div className="absolute top-0 left-0 w-24 h-24 bg-[radial-gradient(circle_at_top_left,#00D2FF_0%,transparent_60%)] opacity-80 group-hover:opacity-100 transition-opacity" />
        <div className="absolute top-0 right-0 w-24 h-24 bg-[radial-gradient(circle_at_top_right,#00D2FF_0%,transparent_60%)] opacity-80 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-[radial-gradient(circle_at_bottom_left,#00D2FF_0%,transparent_60%)] opacity-80 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-[radial-gradient(circle_at_bottom_right,#00D2FF_0%,transparent_60%)] opacity-80 group-hover:opacity-100 transition-opacity" />
        
        {/* Inner Content Background */}
        <div className="absolute inset-[1px] rounded-[23px] bg-[#040A15] shadow-inner shadow-[#00D2FF]/5 z-10" />

        {/* Content Container */}
        <div className="relative z-20 px-6 py-4 lg:px-8 lg:py-5 flex flex-col lg:flex-row items-center justify-between gap-4">
        
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[radial-gradient(ellipse_at_center,#00D2FF_0%,transparent_60%)] opacity-10 blur-[60px] pointer-events-none" />
        
        {/* Text content */}
        <div className="relative z-10 lg:w-1/2 text-center lg:text-left">
          <h2 className="text-[18px] md:text-[22px] font-black text-white mb-1 leading-tight">
            Tu próximo proyecto <span className="text-[#FABB18]">comienza aquí.</span>
          </h2>
          <p className="text-[#8995A9] text-[13px] leading-tight m-0">
            Escríbenos hoy y construyamos una solución digital.
          </p>
        </div>

        {/* Buttons */}
        <div className="relative z-10 flex flex-col sm:flex-row gap-3 w-full lg:w-auto mt-2 lg:mt-0">
          <WhatsAppLink 
            message="Hola Jhesrka Developer, estoy listo para iniciar mi próximo proyecto."
            className="bg-gradient-to-r from-[#FFD700] to-[#FABB18] text-[#01040A] px-5 py-2.5 rounded-xl font-extrabold text-[12px] hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(250,187,24,0.3)]"
          >
            <MessageSquare size={16} strokeWidth={2.5} /> HABLAR POR WHATSAPP
          </WhatsAppLink>
          <button className="bg-transparent border border-white/20 text-white px-5 py-2.5 rounded-xl font-bold text-[12px] hover:border-[#00D2FF] hover:text-[#00D2FF] transition-all flex items-center justify-center">
            SOLICITAR COTIZACIÓN
          </button>
        </div>

      </div>
      </div>
    </section>
  );
};
