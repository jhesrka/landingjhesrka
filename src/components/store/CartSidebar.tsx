"use client";

import { useCartStore } from "@/store/cartStore";
import { X, ShoppingCart, Trash2, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import Script from "next/script";

declare global {
  interface Window {
    PPaymentButtonBox: any;
    ppb: any;
  }
}

export function CartSidebar() {
  const { items, total, removeItem, isCartOpen, setCartOpen } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPayphone, setShowPayphone] = useState(false);

  // Resetear estado al cerrar el carrito
  useEffect(() => {
    if (!isCartOpen) {
      setShowPayphone(false);
      setIsProcessing(false);
    }
  }, [isCartOpen]);

  // Si el usuario cambia los items mientras la cajita está abierta, la ocultamos
  useEffect(() => {
    setShowPayphone(false);
    setIsProcessing(false);
  }, [total]);

  if (!isCartOpen) return null;

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setIsProcessing(true);
    
    try {
      // 1. Obtener la configuración segura desde nuestro servidor
      const res = await fetch('/api/checkout/config');
      const config = await res.json();
      
      if (!res.ok) {
        alert(config.error || 'Error al obtener configuración de pago.');
        setIsProcessing(false);
        return;
      }

      // 2. Preparar los datos
      const amountInCents = Math.round(total * 100);
      const transactionId = Math.random().toString(36).substring(2, 15) + Date.now().toString(36);

      // 3. Mostrar el contenedor de la cajita
      setShowPayphone(true);

      // Esperar un frame para que el div #pp-button exista en el DOM
      setTimeout(() => {
        const container = document.getElementById('pp-button');
        if (container) container.innerHTML = ''; // Limpiar cajitas anteriores

        if (window.PPaymentButtonBox) {
          window.ppb = new window.PPaymentButtonBox({
            token: config.token,
            clientTransactionId: transactionId,
            amount: amountInCents,
            amountWithoutTax: amountInCents,
            amountWithTax: 0,
            tax: 0,
            currency: "USD",
            storeId: config.storeId,
            reference: `Compra en JHESRKA - ${items.length} items`,
            responseUrl: `${config.baseUrl}/checkout/success`,
            cancellationUrl: `${config.baseUrl}/tienda`
          }).render('pp-button');
        } else {
          alert('El SDK de PayPhone aún no ha cargado. Por favor intenta de nuevo.');
          setShowPayphone(false);
          setIsProcessing(false);
        }
      }, 100);

    } catch (error) {
      console.error(error);
      alert('Error al inicializar la pasarela de pago.');
      setIsProcessing(false);
      setShowPayphone(false);
    }
  };

  return (
    <>
      <link rel="stylesheet" href="https://cdn.payphonetodoesposible.com/box/v2.0/payphone-payment-box.css" />
      <Script src="https://cdn.payphonetodoesposible.com/box/v2.0/payphone-payment-box.js" type="module" strategy="lazyOnload" />
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99]"
        onClick={() => setCartOpen(false)}
      />
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-[#01040A] border-l border-[#1A2333] z-[100] shadow-2xl flex flex-col transform transition-transform duration-300">
        <div className="flex items-center justify-between p-6 border-b border-[#1A2333]">
          <div className="flex items-center gap-3 text-white font-bold text-xl">
            <ShoppingCart className="text-[#00D2FF]" />
            Tu Carrito
          </div>
          <button 
            onClick={() => setCartOpen(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 custom-scrollbar">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 gap-4">
              <ShoppingCart size={48} className="opacity-20" />
              <p>Tu carrito está vacío</p>
            </div>
          ) : (
            items.map((item) => (
               <div key={item.id} className="bg-[#060D1A] border border-[#1A2333] rounded-xl p-4 flex justify-between items-center group">
                <div>
                  <h3 className="text-white font-bold">{item.name}</h3>
                  <p className="text-[#00D2FF] font-semibold">${item.price}</p>
                </div>
                <button 
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 md:opacity-0 md:group-hover:opacity-100 transition-opacity p-2 hover:bg-red-500/10 rounded-lg"
                  title="Eliminar"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="p-6 border-t border-[#1A2333] bg-[#060D1A]">
          <div className="flex justify-between items-center mb-6 text-white text-lg">
            <span className="font-medium text-[#8995A9]">Total a Pagar</span>
            <span className="font-bold text-2xl">${total}</span>
          </div>
          
          <button 
            onClick={handleCheckout}
            disabled={items.length === 0 || isProcessing}
            className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-[#FABB18] to-[#ff9900] text-black hover:shadow-[0_0_20px_rgba(250,187,24,0.4)]"
          >
            {isProcessing ? "Cargando..." : "Pagar con PayPhone"}
            {!isProcessing && <ArrowRight size={20} />}
          </button>
        </div>
      </div>

      {/* MODAL EMERGENTE DE PAYPHONE */}
      {showPayphone && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          {/* Fondo oscuro con blur */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => {
              setShowPayphone(false);
              setIsProcessing(false);
            }}
          />
          
          {/* Contenedor del Modal */}
          <div className="relative bg-white rounded-[24px] w-full max-w-md max-h-[90vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">
            {/* Cabecera del modal */}
            <div className="flex justify-between items-center p-4 border-b border-gray-100 shrink-0 bg-gray-50">
              <h3 className="font-bold text-gray-800 text-lg">Completar Pago</h3>
              <button 
                onClick={() => {
                  setShowPayphone(false);
                  setIsProcessing(false);
                }}
                className="text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors p-2 rounded-full"
              >
                <X size={24} />
              </button>
            </div>
            
            {/* Contenedor scrolleable donde va la Cajita */}
            <div className="p-4 overflow-y-auto custom-scrollbar flex-grow bg-white">
              <div id="pp-button" className="w-full min-h-[400px]"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
