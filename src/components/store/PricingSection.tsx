"use client";

import Image from "next/image";
import { CheckCircle2, XCircle, ShoppingCart, Eye, Heart, X, ChevronLeft, ChevronRight } from "lucide-react";
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
            /* Carrusel de Imágenes */
            <div className="flex-1 overflow-y-auto lg:overflow-hidden relative rounded-b-[20px] bg-[#02050A] group mt-2 flex lg:items-center lg:justify-center">
              {/* Instrucción solo en PC */}
              <div className="hidden lg:flex absolute inset-0 items-center justify-center opacity-50 group-hover:opacity-0 transition-opacity z-10 pointer-events-none">
                <p className="text-[#8995A9] text-sm animate-pulse border border-[#8995A9]/30 rounded-full px-4 py-2 bg-black/50 backdrop-blur-md shadow-lg">
                  Pasa el mouse para hacer scroll ↓
                </p>
              </div>

               {/* Imagen para PC (Animación automática) */}
               <div className="hidden lg:block absolute inset-0">
                 <Image 
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
                   src={previewPkg.gallery![currentGalleryIdx]} 
                   alt={`Gallery image ${currentGalleryIdx + 1}`} 
                   width={1200}
                   height={4000}
                   className="w-full h-auto"
                   unoptimized
                 />
               </div>
               
               {/* Controles del Carrusel */}
               <button onClick={prevGalleryImage} className="absolute left-4 top-1/2 -translate-y-1/2 lg:top-auto lg:translate-y-0 w-10 h-10 bg-black/50 border border-white/10 text-white rounded-full flex items-center justify-center hover:bg-[#00D2FF] hover:text-black hover:border-[#00D2FF] transition-all z-20">
                 <ChevronLeft size={24} />
               </button>
               <button onClick={nextGalleryImage} className="absolute right-4 top-1/2 -translate-y-1/2 lg:top-auto lg:translate-y-0 w-10 h-10 bg-black/50 border border-white/10 text-white rounded-full flex items-center justify-center hover:bg-[#00D2FF] hover:text-black hover:border-[#00D2FF] transition-all z-20">
                 <ChevronRight size={24} />
               </button>
               <div className="fixed lg:absolute bottom-8 lg:bottom-4 left-0 right-0 flex justify-center gap-2 z-20 bg-gradient-to-t from-black/80 to-transparent py-4 lg:bg-none lg:py-0 pointer-events-none">
                 <div className="flex gap-2 pointer-events-auto">
                   {previewPkg.gallery!.map((_, i) => (
                     <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i === currentGalleryIdx ? 'bg-[#00D2FF]' : 'bg-white/20'}`} />
                   ))}
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
            className="relative rounded-[20px] bg-[#040A15]/80 border border-[#1A2333] p-[1px] group flex flex-col overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.5)]"
          >
            {/* The main gradient border tracing effect */}
            <div className="absolute inset-0 z-0 block rounded-[20px] overflow-hidden">
              <div className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] opacity-50 
                bg-[conic-gradient(from_90deg_at_50%_50%,#01040A_0%,#00D2FF_25%,#01040A_50%,#FABB18_75%,#01040A_100%)]" 
              />
            </div>

            {/* Inner Content Wrapper */}
            <div className="bg-[#060D1A] rounded-[19px] p-6 h-full flex flex-col relative z-10 overflow-hidden">
              
              {/* Top abstract glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#00D2FF]/5 blur-[40px] pointer-events-none" />

              {/* Header: Title and Price */}
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="flex flex-col gap-1 w-full lg:w-1/2">
                  <h3 className="text-[#8995A9] text-[11px] font-bold uppercase tracking-wider">{pkg.title}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[#FABB18] text-4xl font-black">${pkg.price}</span>
                  </div>
                  <span className="text-[#8995A9] text-[11px]">{pkg.paymentType}</span>
                </div>
                
                {/* Mockup Image in the top right corner of the card */}
                <div className="w-[160px] h-[140px] relative hidden lg:block opacity-90 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105 mr-4 mt-2">
                  <Image src={pkg.image} alt={pkg.title} fill className="object-contain object-top drop-shadow-[0_10px_20px_rgba(0,210,255,0.2)]" />
                </div>
                <button className="absolute top-0 right-0 text-[#8995A9] hover:text-[#FABB18] transition-colors z-20">
                  <Heart size={20} />
                </button>
              </div>
              
              {/* Mobile image version */}
              <div className="w-full h-[180px] relative lg:hidden mb-6 opacity-90 group-hover:opacity-100 transition-opacity rounded-lg overflow-hidden">
                 <Image src={pkg.image} alt={pkg.title} fill className="object-contain object-top" />
              </div>

              {/* Features List */}
              <div className="space-y-3 mb-8 flex-grow relative z-10">
                {pkg.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    {feature.included ? (
                      <CheckCircle2 size={16} className="text-[#00D2FF] mt-0.5 flex-shrink-0" />
                    ) : (
                      <XCircle size={16} className="text-red-500/60 mt-0.5 flex-shrink-0" />
                    )}
                    <span className={`text-[12px] leading-tight ${feature.included ? 'text-[#DCE6FF]' : 'text-[#8995A9]'}`}>
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Footer: Delivery Time & Buttons */}
              <div className="pt-5 border-t border-white/5 relative z-10 mt-auto">
                <p className="text-[#8995A9] text-[11px] mb-4">
                  {pkg.deliveryTime}
                </p>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => openPreview(pkg)}
                    className="flex-1 bg-transparent border border-white/10 hover:border-[#00D2FF]/50 text-white hover:text-[#00D2FF] py-3 rounded-lg text-[12px] font-bold transition-all flex justify-center items-center gap-2"
                  >
                    <Eye size={16} /> VER EJEMPLO
                  </button>
                  <button 
                    onClick={() => {
                      useCartStore.getState().addItem({
                        id: pkg.id,
                        name: pkg.title,
                        price: pkg.price,
                      });
                    }}
                    className="flex-1 bg-gradient-to-r from-[#FFD700] to-[#FABB18] text-[#01040A] py-3 rounded-lg text-[12px] font-extrabold hover:brightness-110 transition-all flex justify-center items-center gap-2"
                  >
                    <ShoppingCart size={16} /> COMPRAR
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
