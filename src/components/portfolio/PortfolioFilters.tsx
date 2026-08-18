"use client";

import { LayoutGrid, Globe, ShoppingCart, Smartphone, Server, MonitorPlay } from "lucide-react";

const categories = [
  { id: "todos", label: "Todos", icon: LayoutGrid },
  { id: "paginas-web", label: "Páginas Web", icon: Globe },
  { id: "tiendas-online", label: "Tiendas Online", icon: ShoppingCart },
  { id: "aplicaciones-web", label: "Aplicaciones Web", icon: Smartphone },
  { id: "sistemas", label: "Sistemas Empresariales", icon: Server },
  { id: "landing", label: "Landing Pages", icon: MonitorPlay },
];

interface PortfolioFiltersProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export const PortfolioFilters = ({ activeCategory, onCategoryChange }: PortfolioFiltersProps) => {
  return (
    <div className="w-full flex justify-center mb-10 scroll-mt-[120px]" id="proyectos">
      {/* Outer wrapper with the dark blue styling */}
      <div className="relative rounded-2xl bg-[#060D1A]/80 border border-[#1A2333] p-2 backdrop-blur-md overflow-x-auto no-scrollbar max-w-full shadow-[0_0_20px_rgba(0,210,255,0.02)]">
        
        <div className="flex items-center gap-2 px-2 min-w-max">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`
                  flex items-center gap-2 px-4 py-2.5 rounded-xl text-[12px] md:text-[13px] font-semibold transition-all
                  ${isActive 
                    ? "bg-[#0A101D] border border-[#FABB18] text-[#FABB18] shadow-[0_0_15px_rgba(250,187,24,0.1)]" 
                    : "bg-transparent border border-transparent text-[#8995A9] hover:text-white hover:bg-white/5"
                  }
                `}
              >
                <Icon size={16} className={isActive ? "text-[#FABB18]" : "opacity-70"} />
                {category.label}
              </button>
            );
          })}
        </div>
        
      </div>
    </div>
  );
};
