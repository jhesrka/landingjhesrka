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
    image: "/destacado1.webp",
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
    image: "/portafolio.webp",
    previewImage: "/landing1.webp",
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
      "/landing1.webp",
      "/mockups/wishway.jpg",
      "/portafolio.webp"
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
      { text: "Blog integrado", included: true },
      { text: "Diseño premium y animaciones", included: true },
      { text: "Optimización SEO avanzada", included: true },
      { text: "Formularios avanzados", included: true },
      { text: "Integración con redes sociales", included: true },
      { text: "Optimización de velocidad", included: true },
      { text: "Soporte técnico básico", included: true },
    ],
    gallery: [
      "/destacado1.webp",
      "/landing1.webp",
      "/portafolio.webp",
      "/mockups/wishway.jpg"
    ]
  }
];

const storePackages: PricingPackage[] = [
  {
    id: "store-basica",
    title: "TIENDA BÁSICA",
    price: 150,
    paymentType: "Pago único",
    image: "/portafolio.webp",
    deliveryTime: "Entrega: 5 - 7 días hábiles",
    features: [
      { text: "WooCommerce", included: true },
      { text: "Diseño de productos", included: true },
      { text: "Carrito de compras", included: true },
      { text: "Checkout seguro", included: true },
      { text: "Gestión de productos", included: true },
      { text: "Panel administrativo", included: true },
      { text: "No incluye dominio", included: false },
      { text: "No incluye hosting", included: false },
    ]
  },
  {
    id: "store-profesional",
    title: "TIENDA PROFESIONAL",
    price: 200,
    paymentType: "Pago único",
    image: "/destacado1.webp",
    deliveryTime: "Entrega: 7 - 10 días hábiles",
    features: [
      { text: "Tienda WooCommerce", included: true },
      { text: "Diseño personalizado", included: true },
      { text: "Pasarela de pagos", included: true },
      { text: "Panel administrativo", included: true },
      { text: "Diseño responsive", included: true },
      { text: "Integración con WhatsApp", included: true },
      { text: "No incluye dominio", included: false },
      { text: "No incluye hosting", included: false },
    ],
    gallery: [
      "/destacado1.webp",
      "/mockups/cv3.jpg",
      "/portafolio.webp"
    ]
  },
  {
    id: "store-premium",
    title: "TIENDA PREMIUM",
    price: 350,
    paymentType: "Pago único",
    image: "/portafolio.webp",
    deliveryTime: "Entrega: 10 - 15 días hábiles",
    features: [
      { text: "Hasta 10 páginas", included: true },
      { text: "WooCommerce completo", included: true },
      { text: "Blog integrado", included: true },
      { text: "Categorías limitadas", included: true },
      { text: "Cupones de descuento", included: true },
      { text: "Productos ilimitados", included: true },
      { text: "Optimización SEO", included: true },
      { text: "Soporte técnico básico", included: true },
    ],
    gallery: [
      "/portafolio.webp",
      "/destacado1.webp",
      "/landing1.webp",
      "/mockups/wishway.jpg"
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
