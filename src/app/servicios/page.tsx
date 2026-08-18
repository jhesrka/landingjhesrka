import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ServicesHero } from "@/components/services/ServicesHero";
import { ServicesGrid } from "@/components/services/ServicesGrid";
import { ServicesWhyChooseUs } from "@/components/services/ServicesWhyChooseUs";
import { ServicesFAQ } from "@/components/services/ServicesFAQ";

import { Technologies } from "@/components/home/Technologies";
import { Process } from "@/components/home/Process";
import { Projects } from "@/components/home/Projects";

export const metadata = {
  title: "Servicios | JHESRKA Developer",
  description: "Descubre nuestros servicios de desarrollo web, tiendas online y aplicaciones a medida.",
};

export default function ServiciosPage() {
  return (
    <main className="min-h-screen bg-[#01040A] text-white selection:bg-[#00D2FF]/30 selection:text-white">
      <Navbar />
      
      {/* 1. Hero Section */}
      <ServicesHero />
      
      {/* 2. Services Grid (Qué podemos desarrollar) */}
      <ServicesGrid />

      {/* 3. Why Choose Us (Franja de iconos) */}
      <ServicesWhyChooseUs />

      {/* 4. Technologies (Reused from Home) */}
      <Technologies />

      {/* 5. Process (Reused from Home) */}
      <Process />

      {/* 6. Related Projects (Reused from Home) */}
      <Projects />

      {/* 7. FAQ */}
      <ServicesFAQ />

      {/* 8. Footer (Contains the giant CTA card) */}
      <Footer />
    </main>
  );
}
