import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartSidebar } from "@/components/store/CartSidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JHESRKA DEVELOPER | Soluciones Digitales Premium",
  description: "Desarrollo de Software, Aplicaciones Web, y Soluciones Tecnológicas Empresariales.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.className} bg-[#01040A] text-white antialiased`}>
        {children}
        <CartSidebar />
      </body>
    </html>
  );
}
