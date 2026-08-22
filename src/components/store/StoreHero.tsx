import Image from "next/image";
import { MessageSquare, ShieldCheck, Truck, ThumbsUp, HeadphonesIcon, ShoppingCart } from "lucide-react";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";

export const StoreHero = () => {
  return (
    <section className="relative overflow-hidden pt-10 pb-12 lg:pt-12 lg:pb-16 border-b border-[#1A2333]">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/fondoservicios.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      />
      
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,#00D2FF_0%,transparent_60%)] opacity-10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,#FABB18_0%,transparent_60%)] opacity-5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 max-w-[1400px] relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          {/* Left Content */}
          <div className="lg:w-1/2 text-left space-y-6">
            <h1 className="text-[40px] md:text-[56px] lg:text-[72px] font-black text-white leading-[1.1] tracking-tight uppercase">
              Compra tu <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#FABB18] drop-shadow-[0_0_15px_rgba(250,187,24,0.3)]">
                Solución Digital
              </span>
            </h1>
            
            <p className="text-[15px] md:text-[16px] text-[#8995A9] leading-relaxed max-w-xl">
              Elige el plan que mejor se adapte a tu negocio o solicita una solución totalmente personalizada.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button className="bg-gradient-to-r from-[#FFD700] to-[#FABB18] text-[#01040A] px-8 py-3.5 rounded-xl font-extrabold text-[13px] hover:brightness-110 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(250,187,24,0.3)]">
                <ShoppingCart size={18} strokeWidth={2.5} /> COMPRAR AHORA
              </button>
              <WhatsAppLink 
                message="Hola, estoy en la tienda y me interesan los planes y servicios digitales."
                className="bg-transparent border border-[#00D2FF]/50 text-white px-8 py-3.5 rounded-xl font-bold text-[13px] hover:bg-[#00D2FF]/10 transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(0,210,255,0.1)]"
              >
                <MessageSquare size={18} className="text-[#00D2FF]" /> HABLAR POR WHATSAPP
              </WhatsAppLink>
            </div>

            {/* Features Bar */}
            <div className="flex flex-wrap items-center gap-4 md:gap-8 pt-8 mt-4 border-t border-white/5">
              <div className="flex items-center gap-2 text-[12px] text-[#8995A9]">
                <ShieldCheck size={16} className="text-[#FABB18]" /> Pago seguro
              </div>
              <div className="flex items-center gap-2 text-[12px] text-[#8995A9]">
                <Truck size={16} className="text-[#FABB18]" /> Entrega rápida
              </div>
              <div className="flex items-center gap-2 text-[12px] text-[#8995A9]">
                <ThumbsUp size={16} className="text-[#FABB18]" /> Satisfacción garantizada
              </div>
              <div className="flex items-center gap-2 text-[12px] text-[#8995A9]">
                <HeadphonesIcon size={16} className="text-[#FABB18]" /> Soporte 24/7
              </div>
            </div>
          </div>

          {/* Right Image (3D Cart) */}
          <div className="lg:w-1/2 w-full relative flex justify-center mt-4 lg:mt-0">
            <div className="relative w-full max-w-[600px] aspect-[4/3] rounded-2xl flex items-center justify-center animate-float-smooth">
              {/* Decorative base glow under the cart */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] h-12 bg-[radial-gradient(ellipse_at_center,#00D2FF_0%,transparent_70%)] blur-[25px] opacity-60" />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[50%] h-8 bg-[radial-gradient(ellipse_at_center,#FABB18_0%,transparent_70%)] blur-[20px] opacity-40" />
              
              <div className="relative w-full h-full z-10 scale-110">
                <Image 
                  src="/carrito.webp" 
                  alt="Carrito de Compras 3D" 
                  fill
                  className="object-contain drop-shadow-[0_20px_50px_rgba(0,210,255,0.3)]"
                  priority
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
