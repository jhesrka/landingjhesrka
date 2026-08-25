"use client";

import Image from "next/image";
import { CheckCircle2, XCircle, ShoppingCart, Eye, Heart, X, ChevronLeft, ChevronRight, Crown, Truck } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
type PricingFeature = {
  text: string;
  included: boolean;
};

export type PricingPackage = {
  id: string;
  title: string;
  price: number;
  paymentType: string;
  image: string;
  previewImage?: string;
  gallery?: string[];
  galleryLabels?: string[];
  deliveryTime: string;
  features: PricingFeature[];
};

interface PricingSectionProps {
  title: string;
  icon: React.ReactNode;
  packages: PricingPackage[];
}

export const PricingSection = ({ title, icon, packages }: PricingSectionProps) => {
  const [previewPkg, setPreviewPkg] = useState<PricingPackage | null>(null);
  const [currentGalleryIdx, setCurrentGalleryIdx] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const openPreview = (pkg: PricingPackage) => {
    setPreviewPkg(pkg);
    setCurrentGalleryIdx(0);
  };

  const nextGalleryImage = () => {
    if (previewPkg?.gallery) {
      setCurrentGalleryIdx((prev) => (prev + 1) % previewPkg.gallery!.length);
    }
  };

  const prevGalleryImage = () => {
    if (previewPkg?.gallery) {
      setCurrentGalleryIdx((prev) => (prev - 1 + previewPkg.gallery!.length) % previewPkg.gallery!.length);
    }
  };

  const renderModal = () => {
    if (!previewPkg) return null;

    const isGallery = previewPkg.gallery && previewPkg.gallery.length > 1;

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setPreviewPkg(null)} />
        
        <div className="relative bg-[#060D1A] border border-[#1A2333] rounded-[24px] p-2 w-full max-w-5xl h-[85vh] flex flex-col shadow-[0_0_50px_rgba(0,210,255,0.15)]">
          {/* Header del Modal */}
          <div className="flex justify-between items-start p-4 border-b border-white/10 shrink-0">
            <div>
              <h3 className="text-white font-bold text-lg md:text-xl uppercase tracking-wider flex items-center gap-2">
                {previewPkg.title} - {isGallery ? "Galería de Ejemplo" : "Vista Previa"}
              </h3>
              <p className="text-[#00D2FF] text-[12px] font-semibold mt-1 opacity-80">
                * Esta es solo una página de ejemplo ilustrativa.
              </p>
            </div>
            <button onClick={() => setPreviewPkg(null)} className="text-[#8995A9] hover:text-[#00D2FF] transition-colors p-1 bg-white/5 rounded-full hover:bg-white/10 mt-1">
              <X size={24} />
            </button>
          </div>
          
          {isGallery ? (
            /* Menú Superior y Visualizador de Galería */
            <div className="flex-1 flex flex-col min-h-0">
              {/* Nuevo Menú Superior */}
              <div className="flex justify-center gap-2 md:gap-4 py-3 bg-[#060D1A] border-b border-white/10 overflow-x-auto px-4 scrollbar-hide">
                {(previewPkg.galleryLabels || ["Inicio", "Nosotros", "Servicios", "Proyectos", "Contacto"]).map((label, idx) => {
                  if (idx >= previewPkg.gallery!.length) return null;
                  return (
                    <button
                      key={idx}
                      onClick={() => setCurrentGalleryIdx(idx)}
                      className={`text-[10px] md:text-[12px] font-bold uppercase tracking-wider px-3 md:px-5 py-2 rounded-full transition-all whitespace-nowrap border flex-shrink-0 ${
                        idx === currentGalleryIdx 
                          ? 'bg-[#00D2FF]/10 text-[#00D2FF] border-[#00D2FF]/50' 
                          : 'text-[#8995A9] border-transparent hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>

              {/* Carrusel de Imágenes */}
              <div className="flex-1 overflow-y-auto lg:overflow-hidden relative rounded-b-[20px] bg-[#02050A] group flex lg:items-center lg:justify-center">
                {/* Instrucción solo en PC */}
                <div className="hidden lg:flex absolute inset-0 items-center justify-center opacity-50 group-hover:opacity-0 transition-opacity z-10 pointer-events-none">
                  <p className="text-[#8995A9] text-sm animate-pulse border border-[#8995A9]/30 rounded-full px-4 py-2 bg-black/50 backdrop-blur-md shadow-lg">
                    Pasa el mouse para hacer scroll ↓
                  </p>
                </div>

                {/* Imagen para PC (Animación automática) */}
                <div className="hidden lg:block absolute inset-0">
                  <Image 
                    key={`pc-${currentGalleryIdx}`}
                    src={previewPkg.gallery![currentGalleryIdx]} 
                    alt={`Gallery image ${currentGalleryIdx + 1}`} 
                    fill
                    className="object-cover object-top transition-all duration-[6000ms] ease-in-out group-hover:object-bottom"
                    unoptimized
                  />
                </div>

                {/* Imagen para Móviles (Scroll nativo) */}
                <div className="block lg:hidden w-full">
                  <Image 
                    key={`mobile-${currentGalleryIdx}`}
                    src={previewPkg.gallery![currentGalleryIdx]} 
                    alt={`Gallery image ${currentGalleryIdx + 1}`} 
                    width={1200}
                    height={4000}
                    className="w-full h-auto"
                    unoptimized
                  />
                </div>
              </div>
            </div>
          ) : (
            /* Contenedor de la Imagen con Scroll Nativo en Móvil y Hover en PC */
            <div className="flex-1 overflow-y-auto lg:overflow-hidden relative rounded-b-[20px] bg-[#02050A] group mt-2">
              <div className="hidden lg:flex absolute inset-0 items-center justify-center opacity-50 group-hover:opacity-0 transition-opacity z-10 pointer-events-none">
                <p className="text-[#8995A9] text-sm animate-pulse border border-[#8995A9]/30 rounded-full px-4 py-2 bg-black/50 backdrop-blur-md shadow-lg">
                  Pasa el mouse para hacer scroll ↓
                </p>
              </div>
              
              {/* Imagen para PC (Animación automática) */}
              <div className="hidden lg:block absolute inset-0">
                <Image 
                  src={previewPkg.previewImage || previewPkg.image || "/landing1.webp"} 
                  alt={`Preview ${previewPkg.title}`} 
                  fill
                  className="object-cover object-top transition-all duration-[6000ms] ease-in-out group-hover:object-bottom"
                  unoptimized
                />
              </div>

              {/* Imagen para Móviles (Scroll nativo) */}
              <div className="block lg:hidden w-full">
                <Image 
                  src={previewPkg.previewImage || previewPkg.image || "/landing1.webp"} 
                  alt={`Preview ${previewPkg.title}`} 
                  width={1200}
                  height={4000}
                  className="w-full h-auto"
                  unoptimized
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <section className="container mx-auto px-4 lg:px-8 max-w-[1400px] mt-16">
      
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/10">
        <div className="text-[#00D2FF]">
          {icon}
        </div>
        <h2 className="text-white font-bold text-[18px] tracking-wide uppercase">
          {title}
        </h2>
      </div>

      {/* Grid of Packages */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div 
            key={pkg.id} 
            className="relative rounded-[20px] bg-[#040A15]/80 border border-[#1A2333] p-[1px] group flex flex-col overflow-hidden shadow-[0_0_30px_rgba(250,187,24,0.05)] h-full"
          >
            {/* The main gradient border tracing effect */}
            <div className="absolute inset-0 z-0 block rounded-[20px] overflow-hidden">
              <div className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] opacity-60 
                bg-[conic-gradient(from_90deg_at_50%_50%,#060D1A_0%,#FABB18_25%,#060D1A_50%,#FFD700_75%,#060D1A_100%)]" 
              />
            </div>

            {/* Inner Content Wrapper */}
            <div className="bg-[#060D1A] rounded-[19px] p-6 flex flex-col relative z-10 h-full overflow-hidden">
              
              {/* Header: Title and Price */}
              <div className="flex justify-between items-start mb-6 relative z-20">
                <div className="flex flex-col gap-1 w-[60%]">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Crown className="text-[#FABB18]" size={16} />
                    <h3 className="text-[#8995A9] text-[10px] font-bold uppercase tracking-widest">{pkg.title}</h3>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[#FFD700] drop-shadow-[0_0_15px_rgba(255,215,0,0.3)] text-4xl font-black">${pkg.price}</span>
                  </div>
                  <div className="mt-1 border border-[#FFD700]/30 rounded-full px-3 py-1 inline-block bg-[#FABB18]/5 self-start">
                    <span className="text-[#FFD700] text-[9px] uppercase tracking-wider font-bold">{pkg.paymentType}</span>
                  </div>
                </div>
              </div>

              {/* Mockup Image spanning right side (Desktop) */}
              <div className="absolute top-10 -right-8 bottom-[110px] w-[210px] hidden lg:block z-10 pointer-events-none" style={{ perspective: '1000px' }}>
                <div className="w-full h-full relative group-hover:scale-105 transition-transform duration-500 ease-out" style={{ transform: 'rotateY(-12deg) rotateX(6deg)' }}>
                   <div className="absolute inset-0 bg-[#FABB18]/10 blur-[40px] rounded-full z-0" />
                   <Image src={(pkg.gallery && pkg.gallery.length > 0) ? pkg.gallery[0] : (pkg.previewImage || pkg.image)} alt={pkg.title} fill className="object-contain object-right drop-shadow-[0_30px_30px_rgba(0,0,0,0.9)] z-10" unoptimized />
                </div>
              </div>
              
              {/* Mobile image version */}
              <div className="w-full h-[180px] relative lg:hidden mb-6 opacity-90 group-hover:opacity-100 transition-opacity rounded-lg overflow-hidden z-10">
                 <Image src={(pkg.gallery && pkg.gallery.length > 0) ? pkg.gallery[0] : (pkg.previewImage || pkg.image)} alt={pkg.title} fill className="object-contain object-top" />
              </div>

              {/* Features List */}
              <div className="space-y-3 mb-8 flex-grow relative z-20 lg:pr-[130px]">
                {pkg.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    {feature.included ? (
                      <div className="w-4 h-4 rounded-full bg-[#FABB18]/10 flex items-center justify-center border border-[#FABB18]/30 flex-shrink-0 mt-0.5">
                         <CheckCircle2 size={10} className="text-[#FABB18]" />
                      </div>
                    ) : (
                      <div className="w-4 h-4 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/30 flex-shrink-0 mt-0.5">
                        <XCircle size={10} className="text-red-500/60" />
                      </div>
                    )}
                    <span className={`text-[12px] leading-tight ${feature.included ? 'text-[#DCE6FF]' : 'text-[#8995A9]'}`}>
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Footer: Delivery Time & Buttons */}
              <div className="mt-auto pt-4 border-t border-[#FFD700]/10 bg-[#01040A] p-4 -mx-6 -mb-6 rounded-b-[18px] relative z-20">
                <div className="flex items-center gap-3 mb-4 px-2">
                  <Truck className="text-[#FABB18]" size={20} />
                  <div className="flex flex-col text-left">
                    <span className="text-white/60 text-[9px] uppercase tracking-widest">Entrega:</span>
                    <span className="text-white text-[12px] font-semibold">{pkg.deliveryTime}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-2">
                  <button 
                    onClick={() => openPreview(pkg)}
                    className="flex-1 bg-transparent border border-white/10 hover:border-[#FABB18]/50 text-white hover:text-[#FABB18] py-2.5 rounded-lg text-[11px] font-bold transition-all flex justify-center items-center gap-1 group/btn"
                  >
                    <Eye size={14} className="group-hover/btn:scale-110 transition-transform" /> VER EJEMPLO
                  </button>
                  <button 
                    onClick={() => {
                      useCartStore.getState().addItem({
                        id: pkg.id,
                        name: pkg.title,
                        price: pkg.price,
                      });
                    }}
                    className="flex-[1.5] bg-gradient-to-r from-[#FFD700] to-[#FABB18] text-[#01040A] py-2.5 rounded-lg text-[11px] font-extrabold hover:brightness-110 transition-all flex justify-center items-center gap-1 shadow-[0_0_15px_rgba(250,187,24,0.2)] group/buy"
                  >
                    <ShoppingCart size={14} className="group-hover/buy:-translate-x-1 transition-transform" /> COMPRAR
                  </button>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Modal de Vista Previa Renderizado con Portal */}
      {isMounted && previewPkg && createPortal(renderModal(), document.body)}
    </section>
  );
};
