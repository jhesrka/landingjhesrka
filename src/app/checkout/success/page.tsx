"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { CheckCircle2, XCircle, ArrowRight, Home, ShoppingCart, Loader2 } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const clearCart = useCartStore((state) => state.clearCart);
  
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const confirmPayment = async () => {
      const id = searchParams.get("id");
      const clientTxId = searchParams.get("clientTransactionId");

      if (!id || !clientTxId) {
        setStatus("error");
        setErrorMessage("Faltan parámetros de transacción. Si realizaste un pago, por favor contáctanos.");
        return;
      }

      try {
        const response = await fetch("/api/checkout/confirm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, clientTxId })
        });

        if (!response.ok) {
          throw new Error("No se pudo confirmar el pago con PayPhone.");
        }

        const data = await response.json();
        
        if (data.transactionStatus === "Approved") {
          setStatus("success");
          clearCart(); // Vaciar carrito solo si se aprueba
        } else {
          setStatus("error");
          setErrorMessage(`El pago fue rechazado o cancelado. Estado: ${data.transactionStatus || 'Desconocido'}`);
        }
      } catch (err: any) {
        setStatus("error");
        setErrorMessage(err.message || "Error de conexión al verificar el pago.");
      }
    };

    confirmPayment();
  }, [searchParams, clearCart]);

  return (
    <main className="flex-grow pt-[120px] pb-24 flex items-center justify-center relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00D2FF]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#FABB18]/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto bg-[#060D1A]/80 border border-[#1A2333] rounded-[24px] p-8 md:p-12 backdrop-blur-md shadow-[0_0_50px_rgba(0,210,255,0.05)] text-center">
          
          {status === "loading" && (
            <div className="py-10">
              <Loader2 size={48} className="text-[#00D2FF] animate-spin mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-white mb-2">Verificando pago...</h2>
              <p className="text-[#8995A9]">Estamos confirmando la transacción con PayPhone. No cierres esta ventana.</p>
            </div>
          )}

          {status === "success" && (
            <>
              {/* Ícono de éxito animado */}
              <div className="w-24 h-24 bg-[#00D2FF]/10 rounded-full flex items-center justify-center mx-auto mb-8 animate-[pulse_3s_ease-in-out_infinite] border border-[#00D2FF]/30 relative">
                <div className="absolute inset-0 bg-[#00D2FF]/20 rounded-full animate-ping opacity-20" />
                <CheckCircle2 size={48} className="text-[#00D2FF]" />
              </div>

              <h1 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase tracking-wide">
                ¡Pago <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D2FF] to-[#0088FF]">Exitoso!</span>
              </h1>
              
              <p className="text-[#8995A9] text-[15px] md:text-[16px] leading-relaxed mb-8 max-w-lg mx-auto">
                Hemos recibido y confirmado tu pago a través de PayPhone exitosamente. 
                En breve, un especialista de JHESRKA Developer se pondrá en contacto contigo para coordinar el inicio de tu proyecto.
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
                <Link href="/tienda" className="w-full sm:w-auto px-8 py-3.5 bg-transparent border border-[#00D2FF]/50 hover:bg-[#00D2FF]/10 hover:border-[#00D2FF] text-white rounded-xl text-[13px] font-bold transition-all flex items-center justify-center gap-2">
                  <ShoppingCart size={18} /> Volver a la Tienda
                </Link>
                <Link href="/" className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#00D2FF] to-[#0088FF] text-black rounded-xl text-[13px] font-bold hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,210,255,0.3)]">
                  <Home size={18} /> Ir al Inicio <ArrowRight size={16} />
                </Link>
              </div>
            </>
          )}

          {status === "error" && (
            <>
              <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-red-500/30">
                <XCircle size={48} className="text-red-500" />
              </div>
              <h1 className="text-3xl font-black text-white mb-4 uppercase tracking-wide">
                Pago <span className="text-red-500">No Confirmado</span>
              </h1>
              <p className="text-red-400/80 text-[15px] leading-relaxed mb-8 max-w-lg mx-auto bg-red-500/10 p-4 rounded-xl border border-red-500/20">
                {errorMessage}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/tienda" className="w-full sm:w-auto px-8 py-3.5 bg-red-500/10 border border-red-500/50 hover:bg-red-500/20 text-white rounded-xl text-[13px] font-bold transition-all flex items-center justify-center gap-2">
                  <ShoppingCart size={18} /> Reintentar Compra
                </Link>
              </div>
            </>
          )}

        </div>
      </div>
    </main>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-[#01040A] flex flex-col selection:bg-[#00D2FF]/30 selection:text-white">
      <Navbar />
      <Suspense fallback={<div className="min-h-screen bg-[#01040A] flex items-center justify-center"><Loader2 size={48} className="text-[#00D2FF] animate-spin" /></div>}>
        <CheckoutSuccessContent />
      </Suspense>
      <Footer />
    </div>
  );
}
