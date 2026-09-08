"use client";

import { useState, useEffect, useRef } from "react";
import { Code2, ShoppingCart, Box, LayoutDashboard, ShieldCheck, Settings, ArrowRight, X, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Link from "next/link";

const services = [
  {
    icon: <Code2 size={24} className="text-white relative z-10" />,
    title: "PÁGINAS WEB\nCORPORATIVAS",
    description: "Sitios modernos, rápidos\ny optimizados para\ndestacar tu marca.",
    details: {
      description: "Creamos la carta de presentación digital perfecta para tu empresa, enfocada en transmitir profesionalismo y captar la atención de tus clientes ideales.",
      benefits: [
        "Transmite confianza y autoridad",
        "Mejora tu posicionamiento en Google (SEO)",
        "Diseño responsivo (perfecto en móviles)",
        "Estructura orientada a conseguir clientes"
      ],
      includes: [
        "Diseño UI/UX exclusivo",
        "Formularios de contacto dinámicos",
        "Integración con redes sociales",
        "Asesoría y configuración de dominio/hosting (no incluye el costo)"
      ]
    }
  },
  {
    icon: <ShoppingCart size={24} className="text-white relative z-10" />,
    title: "TIENDAS ONLINE\n(E-COMMERCE)",
    description: "Tiendas seguras,\natractivas y pensadas\npara vender más.",
    details: {
      description: "Vende tus productos 24/7 con una tienda virtual segura, rápida y fácil de administrar, diseñada para maximizar tus conversiones de venta.",
      benefits: [
        "Aumenta tus ventas sin límites geográficos",
        "Experiencia de compra rápida e intuitiva",
        "Automatización de procesos de venta",
        "Control total de tu negocio online"
      ],
      includes: [
        "Carrito de compras avanzado",
        "Pasarelas de pago (Stripe, PayPal, etc.)",
        "Panel de administración amigable",
        "Gestión de inventario y pedidos"
      ]
    }
  },
  {
    icon: <Box size={24} className="text-white relative z-10" />,
    title: "APLICACIONES WEB\nA MEDIDA",
    description: "Aplicaciones escalables\nque automatizan y\nmejoran tus procesos.",
    details: {
      description: "Desarrollamos soluciones tecnológicas 100% personalizadas para resolver problemas específicos, automatizar tareas diarias y escalar tu negocio.",
      benefits: [
        "Se adapta exactamente a lo que necesitas",
        "Optimiza y agiliza procesos internos",
        "Reduce costos operativos a largo plazo",
        "Alta escalabilidad y seguridad de datos"
      ],
      includes: [
        "Arquitectura de software moderna",
        "Bases de datos estructuradas a medida",
        "Sistemas de roles y permisos",
        "Desarrollo de APIs e integraciones"
      ]
    }
  },
  {
    icon: <LayoutDashboard size={24} className="text-white relative z-10" />,
    title: "SISTEMAS\nEMPRESARIALES",
    description: "Soluciones completas\npara controlar tu negocio\ndesde un solo lugar.",
    details: {
      description: "Centraliza y potencia la gestión de tu empresa con herramientas robustas como CRMs o ERPs, diseñados específicamente para tu flujo de trabajo.",
      benefits: [
        "Toma de decisiones basada en datos reales",
        "Mejora radicalmente la productividad",
        "Control total sobre cada área de la empresa",
        "Información centralizada y respaldada"
      ],
      includes: [
        "Paneles estadísticos interactivos (Dashboards)",
        "Reportes en tiempo real exportables",
        "Módulos personalizados (RRHH, Ventas, etc.)",
        "Seguridad de nivel corporativo"
      ]
    }
  },
  {
    icon: <ShieldCheck size={24} className="text-white relative z-10" />,
    title: "LANDING PAGES\nDE ALTA CONVERSIÓN",
    description: "Diseños estratégicos\nenfocados en atraer y\nconvertir clientes.",
    details: {
      description: "Páginas de aterrizaje diseñadas estratégicamente con un solo objetivo: convertir a tus visitantes en clientes potenciales o ventas directas.",
      benefits: [
        "Alto porcentaje de conversión",
        "Maximiza el retorno (ROI) en anuncios (Ads)",
        "Mensaje claro, directo y persuasivo",
        "Carga ultrarrápida para evitar rebotes"
      ],
      includes: [
        "Estructura persuasiva y Copywriting",
        "Llamados a la acción (CTA) irresistibles",
        "Integración con WhatsApp y Email",
        "Configuración de píxeles de seguimiento"
      ]
    }
  },
  {
    icon: <Settings size={24} className="text-white relative z-10" />,
    title: "MANTENIMIENTO\nY SOPORTE WEB",
    description: "Actualizaciones, seguridad\ny soporte técnico cuando\nlo necesites.",
    details: {
      description: "Mantén tu sitio web seguro, siempre actualizado y funcionando al máximo rendimiento sin que tengas que preocuparte por problemas técnicos.",
      benefits: [
        "Tranquilidad total para enfocarte en tu negocio",
        "Prevención activa contra hackeos y malware",
        "Garantiza tiempos de carga óptimos",
        "Resolución prioritaria de incidencias"
      ],
      includes: [
        "Copias de seguridad (Backups) regulares",
        "Actualizaciones de sistema, temas y plugins",
        "Monitoreo de seguridad 24/7",
        "Soporte técnico directo"
      ]
    }
  },
];

type ServiceType = typeof services[0];

export const Services = () => {
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isInView && !selectedService) {
      interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % services.length);
      }, 1500); // Change color every 1.5 seconds
    }
    return () => clearInterval(interval);
  }, [isInView, selectedService]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [selectedService]);

  return (
    <section ref={sectionRef} className="py-16 bg-[#01040A] relative" id="servicios">
      <div className="container mx-auto px-4 lg:px-8 max-w-[1400px]">
        <h2 className="text-[28px] md:text-[36px] font-bold text-white mb-10 tracking-wide">
          ¿QUÉ HACEMOS?
        </h2>

        {/* 6 columns layout on large screens, scrollable on mobile */}
        <div className="flex overflow-x-auto lg:grid lg:grid-cols-6 gap-4 pb-8 lg:pb-0 snap-x snap-mandatory no-scrollbar">
          {services.map((service, index) => {
            const isGold = index === activeIndex;
            const currentColor = isGold ? "#FABB18" : "#00D2FF";

            return (
            <div
              key={index}
              className="relative group bg-[#0A101D]/50 border border-white/10 rounded-xl overflow-hidden flex flex-col items-center text-center p-6 min-w-[220px] lg:min-w-0 snap-center hover:bg-[#0A101D] transition-colors"
            >
              {/* Top vibrant glowing border */}
              <div 
                className="absolute top-0 left-0 w-full h-[3px] transition-all duration-700"
                style={{ 
                  backgroundColor: currentColor,
                  boxShadow: `0 0 20px 2px ${currentColor}`
                }} 
              />
              
              {/* Inner top gradient based on the color */}
              <div 
                className="absolute top-0 left-0 w-full h-32 opacity-20 pointer-events-none transition-all duration-700"
                style={{
                  background: `linear-gradient(to bottom, ${currentColor}, transparent)`
                }}
              />

              {/* Icon inside a tilted rounded square */}
              <div className="relative w-14 h-14 flex items-center justify-center mt-4 mb-6">
                <div 
                  className="absolute inset-0 border rotate-45 rounded-[10px] opacity-40 group-hover:opacity-100 transition-all duration-700"
                  style={{ borderColor: currentColor }}
                />
                {service.icon}
              </div>
              
              <h3 className="text-[13px] font-extrabold text-[#DCE6FF] mb-3 leading-snug whitespace-pre-line tracking-wide h-10 flex items-center justify-center transition-colors duration-700" style={{ color: isGold ? "#FABB18" : "#DCE6FF" }}>
                {service.title}
              </h3>
              
              <p className="text-[#8995A9] text-[11px] leading-relaxed mb-6 whitespace-pre-line flex-grow">
                {service.description}
              </p>
              
              <button 
                onClick={() => setSelectedService(service)}
                className="text-[11px] font-bold flex items-center gap-1 hover:gap-2 transition-all mt-auto tracking-widest uppercase focus:outline-none"
                style={{ color: isGold ? "#FABB18" : "#00D2FF" }}
              >
                Ver más <ArrowRight size={12} strokeWidth={3} />
              </button>
            </div>
            );
          })}
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-[#01040A]/80 backdrop-blur-md"
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl max-h-[90vh] bg-[#050A15] border border-white/10 rounded-2xl p-1 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col"
            >
              {/* Glowing Top Border */}
              <div 
                className="absolute top-0 left-0 w-full h-[2px] z-20"
                style={{ 
                  backgroundColor: "#FABB18",
                  boxShadow: `0 0 20px 2px #FABB18`
                }} 
              />

              <div className="relative bg-[#0A101D] rounded-[15px] p-6 pb-28 md:p-8 md:pb-8 h-full flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                {/* Close Button */}
                <button
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 right-4 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-colors z-20 focus:outline-none"
                >
                  <X size={20} />
                </button>

                {/* Header */}
                <div className="flex items-center gap-4 mb-6 pr-10">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center relative overflow-hidden flex-shrink-0 bg-white/5">
                    <div 
                      className="absolute inset-0 opacity-20"
                      style={{ backgroundColor: "#FABB18" }}
                    />
                    {selectedService.icon}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                    {selectedService.title.replace('\n', ' ')}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-[#8995A9] text-[14px] md:text-[15px] leading-relaxed mb-8">
                  {selectedService.details.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  {/* Benefits */}
                  <div>
                    <h4 className="text-white text-[15px] font-bold mb-4 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00D2FF]" />
                      Beneficios Principales
                    </h4>
                    <ul className="space-y-3">
                      {selectedService.details.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 size={16} className="text-[#00D2FF] mt-0.5 flex-shrink-0" />
                          <span className="text-[#8995A9] text-[13px] leading-relaxed">
                            {benefit}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Includes */}
                  <div>
                    <h4 className="text-white text-[15px] font-bold mb-4 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FABB18]" />
                      ¿Qué incluye?
                    </h4>
                    <ul className="space-y-3">
                      {selectedService.details.includes.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="w-1 h-1 rounded-full bg-white/30 mt-2 flex-shrink-0" />
                          <span className="text-[#8995A9] text-[13px] leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-auto pt-6 border-t border-white/5 flex justify-end">
                  <Link
                    href="/#contacto"
                    onClick={() => setSelectedService(null)}
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#FFD700] to-[#FABB18] text-black font-extrabold text-[12px] hover:brightness-110 transition-all uppercase tracking-widest shadow-[0_0_20px_rgba(250,187,24,0.2)]"
                  >
                    Cotizar este servicio <ArrowRight size={16} strokeWidth={2.5} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
