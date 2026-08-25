import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartSidebar } from "@/components/store/CartSidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://jhesrkadeveloper.vercel.app'),
  title: {
    default: "JHESRKA DEVELOPER | Desarrollo Web y Tiendas Online en Quito",
    template: "%s | JHESRKA DEVELOPER",
  },
  description: "Agencia de Desarrollo de Software, Diseño de Páginas Web y Tiendas Online. Soluciones digitales premium desde Quito, Ecuador para toda Latinoamérica.",
  keywords: ["Desarrollo Web Quito", "Páginas Web Ecuador", "Tiendas Online", "Ecommerce a medida", "Desarrollo de Software", "Jhesrka Developer", "Aplicaciones Web", "Soluciones Tecnológicas Empresariales"],
  authors: [{ name: "Jhesrka Developer" }],
  creator: "Jhesrka Developer",
  icons: {
    icon: '/FAVICON.png',
  },
  openGraph: {
    type: "website",
    locale: "es_EC",
    url: "https://jhesrkadeveloper.vercel.app",
    title: "JHESRKA DEVELOPER | Soluciones Digitales Premium",
    description: "Desarrollo de Software, Páginas Web y Tiendas Online. Impulsa tu negocio con tecnología de vanguardia desde Quito, Ecuador.",
    siteName: "Jhesrka Developer",
    images: [
      {
        url: "/FAVICON.png",
        width: 800,
        height: 600,
        alt: "Jhesrka Developer - Desarrollo Web en Quito",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JHESRKA DEVELOPER | Soluciones Digitales Premium",
    description: "Desarrollo de Software, Páginas Web y Tiendas Online en Quito, Ecuador.",
    images: ["/FAVICON.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "JHESRKA DEVELOPER",
    "image": "https://jhesrkadeveloper.vercel.app/FAVICON.png",
    "description": "Agencia de Desarrollo de Software, Diseño de Páginas Web y Tiendas Online.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Quito",
      "addressRegion": "Pichincha",
      "addressCountry": "EC"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -0.1806532,
      "longitude": -78.4678382
    },
    "url": "https://jhesrkadeveloper.vercel.app",
    "telephone": "+5930979398949",
    "priceRange": "$$"
  };

  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} bg-[#01040A] text-white antialiased`}>
        {children}
        <CartSidebar />
      </body>
    </html>
  );
}
