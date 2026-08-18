import { ArrowRight, Code2, Globe, Laptop, LayoutTemplate, ShieldCheck, ShoppingCart, Briefcase, Rocket } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const servicesList = [
  {
    title: "Páginas Web\nCorporativas",
    icon: <Globe size={28} className="text-[#00D2FF]" strokeWidth={1.5} />,
    bullets: [
      "Diseños modernos y\n100% personalizados",
      "Sitios rápidos y optimizados\npara Google (SEO)",
      "Adaptables para todos\nlos dispositivos",
    ],
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
    imageMockup: "/laptop_ecommerce_1786739295410.jpg",
    bgImage: "/mantenimiento.webp",
    link: "#",
  },
];

export const ServicesGrid = () => {
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
                  <Link href={service.link} className="flex items-center gap-2 text-[#FABB18] text-[13px] font-bold tracking-wide hover:text-[#FFD700] transition-colors w-fit drop-shadow-[0_0_8px_rgba(250,187,24,0.4)] mt-auto">
                    Ver más <ArrowRight size={16} />
                  </Link>
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
    </section>
  );
};
