"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { CheckCircle2, ArrowRight, Home, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function CheckoutSuccessPage() {
  const clearCart = useCartStore((state) => state.clearCart);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Vaciar el carrito porque la compra fue exitosa
    clearCart();
    setMounted(true);
  }, [clearCart]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#01040A] flex flex-col selection:bg-[#00D2FF]/30 selection:text-white">
      <Navbar />
      
      <main className="flex-grow pt-[120px] pb-24 flex items-center justify-center relative overflow-hidden">
        {/* Elementos decorativos de fondo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00D2FF]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#FABB18]/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto bg-[#060D1A]/80 border border-[#1A2333] rounded-[24px] p-8 md:p-12 backdrop-blur-md shadow-[0_0_50px_rgba(0,210,255,0.05)] text-center">
            
            {/* Ícono de éxito animado */}
            <div className="w-24 h-24 bg-[#00D2FF]/10 rounded-full flex items-center justify-center mx-auto mb-8 animate-[pulse_3s_ease-in-out_infinite] border border-[#00D2FF]/30 relative">
              <div className="absolute inset-0 bg-[#00D2FF]/20 rounded-full animate-ping opacity-20" />
              <CheckCircle2 size={48} className="text-[#00D2FF]" />
            </div>

            <h1 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase tracking-wide">
              ¡Pago <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D2FF] to-[#0088FF]">Exitoso!</span>
            </h1>
            
            <p className="text-[#8995A9] text-[15px] md:text-[16px] leading-relaxed mb-8 max-w-lg mx-auto">
              Hemos recibido la confirmación de tu pago a través de PayPhone. 
              En breve, un especialista de JHESRKA Developer se pondrá en contacto contigo vía WhatsApp o correo electrónico para coordinar el inicio de tu proyecto.
            </p>

            <div className="p-4 bg-[#FABB18]/10 border border-[#FABB18]/20 rounded-xl mb-10 max-w-md mx-auto">
              <p className="text-[#FABB18] text-[13px] font-semibold">
                ¿Tienes alguna consulta urgente?
              </p>
              <p className="text-[#8995A9] text-[12px] mt-1">
                No dudes en escribirnos directamente a nuestro WhatsApp oficial o formulario de contacto.
              </p>
            </div>

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/tienda"
                className="w-full sm:w-auto px-8 py-3.5 bg-transparent border border-[#00D2FF]/50 hover:bg-[#00D2FF]/10 hover:border-[#00D2FF] text-white rounded-xl text-[13px] font-bold transition-all flex items-center justify-center gap-2"
              >
                <ShoppingCart size={18} /> Volver a la Tienda
              </Link>
              
              <Link 
                href="/"
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#00D2FF] to-[#0088FF] text-black rounded-xl text-[13px] font-bold hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,210,255,0.3)]"
              >
                <Home size={18} /> Ir al Inicio <ArrowRight size={16} />
              </Link>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
