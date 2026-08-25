"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { useCartStore } from "@/store/cartStore";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  // Safe way to use zustand persist with hydration (optional, but good practice)
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setMounted(true);
  }, []);

  const itemsCount = useCartStore(state => state.items.length);
  const setCartOpen = useCartStore(state => state.setCartOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Inicio", href: "/" },
    { name: "Servicios", href: "/servicios" },
    { name: "Portafolio", href: "/portafolio" },
    { name: "Tienda", href: "/tienda" },
    { name: "Contacto", href: "/contacto" },
  ];

  return (
    <header
      className={`fixed top-0 w-full transition-all duration-300 ${
        isMobileMenuOpen ? "z-[999]" : "z-50"
      } ${
        isScrolled ? "bg-[#020610]/90 backdrop-blur-md border-b border-white/5 py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8 flex justify-between items-center max-w-[1400px]">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="relative w-[220px] h-[60px]">
            <Image src="/logojhesrka.webp" alt="JHESRKA Developer" fill sizes="(max-width: 768px) 220px, 220px" className="object-contain object-left" />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href === "/" && pathname === "/");
            return (
              <Link 
                key={link.name}
                href={link.href} 
                className={`text-sm font-semibold transition-colors ${
                  isActive 
                    ? "text-[#FABB18] relative after:content-[''] after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-1/2 after:h-[2px] after:bg-[#FABB18] after:shadow-[0_0_8px_#FABB18]" 
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* CTA Button & Cart */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/contacto" className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#FABB18] text-[#FABB18] text-sm font-bold hover:bg-[#FABB18]/10 transition-all">
            Solicitar Cotización <ArrowRight size={16} />
          </Link>
          <button 
            onClick={() => setCartOpen(true)}
            aria-label="Abrir carrito"
            className="relative text-[#8995A9] hover:text-[#00D2FF] transition-colors p-2 cursor-pointer"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            {mounted && itemsCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-[#FABB18] text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                {itemsCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Cart & Menu Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button 
            onClick={() => setCartOpen(true)}
            aria-label="Abrir carrito"
            className="relative text-[#8995A9] hover:text-[#00D2FF] transition-colors p-2 cursor-pointer"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            {mounted && itemsCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-[#FABB18] text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                {itemsCount}
              </span>
            )}
          </button>
          <button onClick={() => setIsMobileMenuOpen(true)} aria-label="Abrir menú" className="text-white p-2">
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed inset-0 bg-[#01040A] z-[999] flex flex-col pt-6 px-6 overflow-y-auto min-h-screen"
          >
            <div className="flex items-center justify-between mb-12 flex-shrink-0">
              <div className="relative w-[180px] h-[50px]">
                <Image src="/logojhesrka.webp" alt="JHESRKA Developer" fill sizes="180px" className="object-contain object-left" />
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} aria-label="Cerrar menú" className="text-white p-2 hover:text-[#00D2FF] transition-colors bg-white/5 rounded-full">
                <X size={28} />
              </button>
            </div>
            
            <nav className="flex flex-col gap-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href === "/" && pathname === "/");
                return (
                  <Link 
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-2xl font-bold transition-colors ${
                      isActive ? "text-[#FABB18]" : "text-white/80 hover:text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              
              <div className="w-full h-[1px] bg-white/10 my-4" />
              
              <Link 
                href="/contacto" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between w-full px-6 py-4 rounded-xl border border-[#FABB18]/50 bg-[#FABB18]/10 text-[#FABB18] text-lg font-bold"
              >
                Solicitar Cotización <ArrowRight size={20} />
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
