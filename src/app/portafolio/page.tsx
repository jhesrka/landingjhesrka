import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PortfolioHero } from "@/components/portfolio/PortfolioHero";
import { PortfolioSection } from "@/components/portfolio/PortfolioSection";
import { PortfolioStats } from "@/components/portfolio/PortfolioStats";
import { PortfolioCTA } from "@/components/portfolio/PortfolioCTA";

export const metadata = {
  title: "Portafolio | JHESRKA DEVELOPER",
  description: "Explora nuestros proyectos y soluciones digitales.",
};

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-[#01040A] flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-[80px]">
        {/* Espacio para el navbar fijo */}
        
        {/* Componentes del Portafolio */}
        <PortfolioHero />
        
        <div className="container mx-auto px-4 lg:px-8 max-w-[1400px] mt-10">
          <PortfolioSection />
          <PortfolioStats />
        </div>
        
        <PortfolioCTA />
      </main>

      <Footer />
    </div>
  );
}
