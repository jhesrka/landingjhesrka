"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Code2, Globe, Laptop, LayoutTemplate, ShieldCheck, ShoppingCart, Briefcase, Rocket, X, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const servicesList = [
  {
    title: "Páginas Web\nCorporativas",
    icon: <Globe size={28} className="text-[#00D2FF]" strokeWidth={1.5} />,
    bullets: [
      "Diseños modernos y\n100% personalizados",
      "Sitios rápidos y optimizados\npara Google (SEO)",
      "Adaptables para todos\nlos dispositivos",
    ],
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
    },
    imageMockup: "/laptop_web_corp_1786739284850.jpg",
    bgImage: "/corporativa.webp",
    link: "#",
  },
  {
    title: "Tiendas Online\n(E-commerce)",
    icon: <ShoppingCart size={28} className="text-[#00D2FF]" strokeWidth={1.5} />,
    bullets: [
      "Tiendas completas y\nprofesionales",
      "Carrito de compras y\npasarelas de pago",
      "Gestión de productos\ne inventario",
    ],
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
    },
    imageMockup: "/laptop_ecommerce_1786739295410.jpg",
    bgImage: "/ecommerce.webp",
    link: "#",
  },
  {
    title: "Aplicaciones Web\na Medida",
    icon: <Code2 size={28} className="text-[#00D2FF]" strokeWidth={1.5} />,
    bullets: [
      "Sistemas personalizados\nsegún tu negocio",
      "Dashboards y paneles\nadministrativos",
      "Plataformas internas\neficientes",
    ],
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
    },
    imageMockup: "/laptop_web_corp_1786739284850.jpg",
    bgImage: "/aplicaciones.webp",
    link: "#",
  },
  {
    title: "Sistemas\nEmpresariales",
    icon: <Briefcase size={28} className="text-[#00D2FF]" strokeWidth={1.5} />,
    bullets: [
      "Sistemas administrativos",
      "CRM, ERP e inventarios",
      "Soluciones completas\npara empresas",
    ],
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
    },
    imageMockup: "/laptop_ecommerce_1786739295410.jpg",
    bgImage: "/sistemas.webp",
    link: "#",
  },
  {
    title: "Landing Pages de\nAlta Conversión",
    icon: <Rocket size={28} className="text-[#00D2FF]" strokeWidth={1.5} />,
    bullets: [
      "Páginas enfocadas en\ncaptar clientes",
      "Diseños atractivos y\npersuasivos",
      "Ideales para campañas\nde publicidad",
    ],
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
    },
    imageMockup: "/laptop_web_corp_1786739284850.jpg",
    bgImage: "/landing.webp",
    link: "#",
  },
  {
    title: "Mantenimiento y\nSoporte Web",
    icon: <ShieldCheck size={28} className="text-[#00D2FF]" strokeWidth={1.5} />,
    bullets: [
      "Actualizaciones y copias\nde seguridad",
      "Seguridad y protección\navanzada",
      "Soporte técnico rápido\ny confiable",
    ],
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
    },
    imageMockup: "/laptop_ecommerce_1786739295410.jpg",
    bgImage: "/mantenimiento.webp",
    link: "#",
  },
];

type ServiceType = typeof servicesList[0];

export const ServicesGrid = () => {
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);

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
    <section className="py-8 bg-[#01040A] relative z-10 border-t border-white/5">
      <div className="container mx-auto px-4 lg:px-8 max-w-[1400px]">
        
        {/* Title */}
        <div className="flex items-center justify-center gap-4 md:gap-6 mb-16">
          <div className="h-[1px] w-8 md:w-24 bg-gradient-to-l from-[#FABB18] to-transparent relative">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 md:w-1.5 md:h-1.5 rotate-45 bg-[#FABB18]" />
          </div>
          <h2 className="text-white text-[16px] md:text-[22px] font-bold tracking-wider text-center">
            ¿QUÉ PODEMOS DESARROLLAR PARA TI?
          </h2>
          <div className="h-[1px] w-8 md:w-24 bg-gradient-to-r from-[#FABB18] to-transparent relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 md:w-1.5 md:h-1.5 rotate-45 bg-[#FABB18]" />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {servicesList.map((service, idx) => (
            
            /* The 1px Border Wrapper that perfectly replicates the glowing corners */
            <div key={idx} className="relative rounded-[20px] p-[1px] overflow-hidden group min-h-[360px]">
              
              {/* Base dark blue edge color */}
              <div className="absolute inset-0 bg-[#0F2540]" />
              
              {/* Sequential Running Neon Line */}
              <div 
                className="absolute top-1/2 left-1/2 w-[250%] h-[250%] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0%,transparent_85%,#00D2FF_100%)] animate-border-trace"
                style={{ animationDelay: `${idx * 2}s` }}
              />
              
              {/* Radial gradient glowing corners */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-[radial-gradient(circle_at_top_left,#00D2FF_0%,transparent_60%)] opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,#00D2FF_0%,transparent_60%)] opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-[radial-gradient(circle_at_bottom_left,#00D2FF_0%,transparent_60%)] opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_bottom_right,#00D2FF_0%,transparent_60%)] opacity-80 group-hover:opacity-100 transition-opacity" />

              {/* The Inner Card Content */}
              <div 
                className={`relative w-full h-full rounded-[19px] p-6 md:p-8 flex flex-col z-10 overflow-hidden shadow-inner shadow-[#00D2FF]/5 ${service.bgImage ? 'bg-cover bg-center' : 'bg-[#050A15]'}`}
                style={service.bgImage ? { backgroundImage: `url('${service.bgImage}')` } : undefined}
              >
                
                {/* Header (Icon + Title) */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex-shrink-0 drop-shadow-[0_0_12px_rgba(0,210,255,0.7)]">
                    {service.icon}
                  </div>
                  <h3 className="text-white text-[18px] md:text-[20px] font-bold leading-tight whitespace-pre-line drop-shadow-md z-20">
                    {service.title}
                  </h3>
                </div>

                {/* Body (Bullets + Link) */}
                <div className="flex flex-col justify-between h-full z-20">
                  <ul className="space-y-4 mb-8 w-full lg:w-[60%]">
                    {service.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#8995A9] mt-1.5 flex-shrink-0 shadow-[0_0_4px_rgba(255,255,255,0.5)]" />
                        <span className="text-[#8995A9] text-[12px] md:text-[13px] leading-[1.5] drop-shadow-md font-medium">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <button 
                    onClick={() => setSelectedService(service)}
                    className="flex items-center gap-2 text-[#FABB18] text-[13px] font-bold tracking-wide hover:text-[#FFD700] transition-colors w-fit drop-shadow-[0_0_8px_rgba(250,187,24,0.4)] mt-auto cursor-pointer"
                  >
                    Ver más <ArrowRight size={16} />
                  </button>
                </div>

                {/* Isolated Laptop Image with Screen Blend (Flawless Integration) - Hidden if card uses a background image */}
                {!service.bgImage && (
                  <div className="absolute -right-6 -bottom-6 w-[70%] h-[80%] z-10 pointer-events-none group-hover:scale-105 transition-transform duration-700 ease-out">
                    <Image 
                      src={service.imageMockup} 
                      alt={service.title.replace('\n', ' ')}
                      fill
                      className="object-contain object-right-bottom mix-blend-screen opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                    />
                  </div>
                )}

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal / Popup */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              className="relative w-full max-w-2xl bg-[#050A15] rounded-[24px] border border-[#00D2FF]/20 shadow-[0_0_40px_rgba(0,210,255,0.1)] overflow-hidden flex flex-col max-h-[90vh] z-10"
            >
              {/* Decorative top gradient */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00D2FF] to-transparent opacity-50" />
              
              {/* Close button */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 z-10 p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={24} />
              </button>

              <div className="overflow-y-auto p-6 sm:p-8 scrollbar-thin scrollbar-thumb-[#00D2FF]/30 scrollbar-track-transparent">
                {/* Header */}
                <div className="flex items-center gap-4 mb-6 pr-10">
                  <div className="p-3 bg-[#00D2FF]/10 rounded-xl border border-[#00D2FF]/20 drop-shadow-[0_0_12px_rgba(0,210,255,0.4)]">
                    {selectedService.icon}
                  </div>
                  <h3 className="text-white text-xl sm:text-2xl font-bold whitespace-pre-line leading-tight">
                    {selectedService.title.replace('\n', ' ')}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-[#8995A9] text-base leading-relaxed mb-8">
                  {selectedService.details.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                  {/* Benefits */}
                  <div>
                    <h4 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FABB18]" />
                      Beneficios clave
                    </h4>
                    <ul className="space-y-3">
                      {selectedService.details.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 size={18} className="text-[#00D2FF] shrink-0 mt-0.5" />
                          <span className="text-[#8995A9] text-sm leading-snug">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Includes */}
                  <div>
                    <h4 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FABB18]" />
                      ¿Qué incluye?
                    </h4>
                    <ul className="space-y-3">
                      {selectedService.details.includes.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 size={18} className="text-[#00D2FF] shrink-0 mt-0.5" />
                          <span className="text-[#8995A9] text-sm leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-6 border-t border-white/10 flex justify-end">
                  <Link 
                    href="/contacto"
                    className="inline-flex items-center justify-center gap-2 bg-[#FABB18] text-black font-bold py-3 px-6 rounded-full hover:bg-[#FFD700] hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(250,187,24,0.3)] w-full sm:w-auto text-sm sm:text-base"
                    onClick={() => setSelectedService(null)}
                  >
                    Solicitar Cotización <ArrowRight size={18} />
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
