"use client";

import { useCartStore } from "@/store/cartStore";
import { X, ShoppingCart, Trash2, ArrowRight } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export function CartSidebar() {
  const { items, total, removeItem, isCartOpen, setCartOpen } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isCartOpen) return null;

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setIsProcessing(true);
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, total }),
      });
      
      const data = await response.json();
      
      if (data.url) {
        // Redirigir a la pasarela de PayPhone
        window.location.href = data.url;
      } else {
        alert(data.error || 'Error al iniciar el pago.');
        setIsProcessing(false);
      }
    } catch (error) {
      console.error(error);
      alert('Error de conexión.');
      setIsProcessing(false);
    }
  };

  return (
    <>
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
                  className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-500/10 rounded-lg"
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
            {isProcessing ? "Procesando..." : "Pagar con PayPhone"}
            {!isProcessing && <ArrowRight size={20} />}
          </button>
        </div>
      </div>
    </>
  );
}
