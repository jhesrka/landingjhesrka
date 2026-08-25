import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StoreHero } from "@/components/store/StoreHero";
import { PricingSection, PricingPackage } from "@/components/store/PricingSection";
import { MonitorPlay, ShoppingCart } from "lucide-react";

const webPackages: PricingPackage[] = [
  {
    id: "web-landing",
    title: "LANDING PAGE",
    price: 120,
    paymentType: "Pago único",
    image: "/landing.webp",
    previewImage: "/landing1.webp",
    deliveryTime: "Entrega: 3 - 5 días hábiles",
    features: [
      { text: "1 página", included: true },
      { text: "Diseño responsive", included: true },
      { text: "Optimización SEO básica", included: true },
      { text: "Formulario de contacto", included: true },
      { text: "Botón de WhatsApp", included: true },
      { text: "Integración con redes sociales", included: true },
      { text: "No incluye dominio", included: false },
      { text: "No incluye hosting", included: false },
    ]
  },
  {
    id: "web-empresarial",
    title: "SITIO EMPRESARIAL",
    price: 300,
    paymentType: "Pago único",
    image: "/sitio/home.webp",
    previewImage: "/sitio/home.webp",
    deliveryTime: "Entrega: 7 - 10 días hábiles",
    features: [
      { text: "Hasta 5 páginas", included: true },
      { text: "Diseño personalizado", included: true },
      { text: "Optimización SEO", included: true },
      { text: "Galería de imágenes", included: true },
      { text: "Mapa de ubicación", included: true },
      { text: "Panel administrativo", included: true },
      { text: "No incluye dominio", included: false },
      { text: "No incluye hosting", included: false },
    ],
    gallery: [
      "/sitio/home.webp",
      "/sitio/servicios.webp",
      "/sitio/especialidades.webp",
      "/sitio/medicos.webp",
      "/sitio/contactos.webp"
    ]
  },
  {
    id: "web-premium",
    title: "SITIO WEB PREMIUM",
    price: 500,
    paymentType: "Pago único",
    image: "/destacado1.webp",
    previewImage: "/landing1.webp",
    deliveryTime: "Entrega: 10 - 15 días hábiles",
    features: [
      { text: "Hasta 10 páginas", included: true },
      { text: "Diseño premium y animaciones", included: true },
      { text: "Optimización SEO avanzada", included: true },
      { text: "Formularios avanzados", included: true },
      { text: "Integración con redes sociales", included: true },
      { text: "Optimización de velocidad", included: true },
      { text: "No incluye dominio", included: false },
      { text: "No incluye hosting", included: false },
    ],
    gallery: [
      "/empresarial/inicio.webp",
      "/empresarial/nosotros.webp",
      "/empresarial/servicios.webp",
      "/empresarial/proyectos.webp",
      "/empresarial/contacto.webp"
    ]
  }
];

const storePackages: PricingPackage[] = [
  {
    id: "store-basica",
    title: "TIENDA BÁSICA",
    price: 150,
    paymentType: "Pago único",
    image: "/tienda/tienda (1).webp",
    previewImage: "/tienda/tienda (1).webp",
    deliveryTime: "Entrega: 5 - 7 días hábiles",
    features: [
      { text: "Plataforma WooCommerce", included: true },
      { text: "Gestión de inventario y pedidos", included: true },
      { text: "Configuración de pagos y envíos", included: true },
      { text: "Carrito y Checkout seguro", included: true },
      { text: "Cupones de descuento", included: true },
      { text: "Panel autoadministrable", included: true },
      { text: "No incluye dominio", included: false },
      { text: "No incluye hosting", included: false },
    ],
    galleryLabels: ["Tienda"],
    gallery: [
      "/tienda/tienda (1).webp"
    ]
  },
  {
    id: "store-profesional",
    title: "TIENDA PROFESIONAL",
    price: 250,
    paymentType: "Pago único",
    image: "/destacado1.webp",
    deliveryTime: "Entrega: 7 - 10 días hábiles",
    features: [
      { text: "Tienda a medida (Código puro)", included: true },
      { text: "Diseño personalizado", included: true },
      { text: "Pasarela de pago a elección", included: true },
      { text: "Panel administrativo básico", included: true },
      { text: "Diseño responsivo", included: true },
      { text: "3 Páginas (Inicio, Tienda, Contacto)", included: true },
      { text: "No incluye dominio", included: false },
      { text: "No incluye hosting", included: false },
    ],
    galleryLabels: ["Inicio", "Tienda", "Contacto"],
    gallery: [
      "/tiendabasica/home.webp",
      "/tiendabasica/tienda.webp",
      "/tiendabasica/contactos.webp"
    ]
  },
  {
    id: "store-premium",
    title: "TIENDA PREMIUM",
    price: 500,
    paymentType: "Pago único",
    image: "/portafolio.webp",
    deliveryTime: "Entrega: 10 - 15 días hábiles",
    features: [
      { text: "Tienda a medida (Código puro)", included: true },
      { text: "Diseño premium con animaciones", included: true },
      { text: "Múltiples pasarelas de pago", included: true },
      { text: "Panel administrativo avanzado", included: true },
      { text: "Hasta 8 Páginas", included: true },
      { text: "Optimización SEO y Velocidad", included: true },
      { text: "No incluye dominio", included: false },
      { text: "No incluye hosting", included: false },
    ],
    galleryLabels: ["Inicio", "Nosotros", "Tienda", "Colecciones", "Contacto"],
    gallery: [
      "/tiendapremium/inicio.webp",
      "/tiendapremium/nosotros.webp",
      "/tiendapremium/tienda.webp",
      "/tiendapremium/colecciones.webp",
      "/tiendapremium/contactos.webp"
    ]
  }
];

export const metadata = {
  title: "Tienda | JHESRKA DEVELOPER",
  description: "Compra tu solución digital. Planes de páginas web, tiendas online y sistemas.",
};

export default function TiendaPage() {
  return (
    <div className="min-h-screen bg-[#01040A] flex flex-col selection:bg-[#00D2FF]/30 selection:text-white">
      <Navbar />
      
      <main className="flex-grow pt-[80px] pb-24">
        {/* Componentes de la Tienda */}
        <StoreHero />
        
        <PricingSection 
          title="Páginas Web" 
          icon={<MonitorPlay size={20} />} 
          packages={webPackages} 
        />
        
        <PricingSection 
          title="Tiendas Online" 
          icon={<ShoppingCart size={20} />} 
          packages={storePackages} 
        />
        
      </main>

      <Footer />
    </div>
  );
}
