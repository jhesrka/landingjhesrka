import { db } from "@/db";
import { projects as projectsSchema } from "@/db/schema";
import { desc } from "drizzle-orm";
import { PortfolioClient } from "./PortfolioClient";

// Fallback data if the DB is empty
const fallbackProjects = [
  {
    title: "ATUCUCHO SHOP",
    subtitle: "Súper App / Marketplace",
    categoryId: "aplicaciones-web",
    description: "Plataforma que conecta negocios locales con clientes de la comunidad. Marketplace, pedidos, entregas y red social integrada.",
    image: "/destacado1.webp",
    link: "#",
    technologies: ["Code2", "Database", "Smartphone"],
  },
  {
    title: "WISHWAY",
    subtitle: "Plataforma de Rifas Online",
    categoryId: "sistemas",
    description: "Sistema completo para crear, gestionar y participar en rifas online de manera segura y transparente.",
    image: "/mockups/wishway.jpg",
    gallery: ["/mockups/wishway.jpg", "/destacado1.webp"],
    link: "#",
    technologies: ["Code2", "Database", "LayoutTemplate"],
  },
  {
    title: "OLA PREMIUM",
    subtitle: "Transporte Ejecutivo",
    categoryId: "aplicaciones-web",
    description: "Plataforma de transporte privado con reservas online, seguimiento en tiempo real y gestión de conductores.",
    image: "/mockups/ola.jpg",
    link: "#",
    technologies: ["Smartphone", "Database", "Code2"],
  },
  {
    title: "CV3 TALLER",
    subtitle: "Sitio Web Automotriz",
    categoryId: "paginas-web",
    description: "Sitio web institucional para taller automotriz con servicios, galería, blog y formulario de cotización.",
    image: "/mockups/cv3.jpg",
    previewImage: "/landing1.webp",
    link: "#",
    technologies: ["LayoutTemplate", "Code2"],
  },
];

export const PortfolioSection = async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let dbProjects: any[] = [];
  
  try {
    dbProjects = await db.select().from(projectsSchema).orderBy(desc(projectsSchema.createdAt));
  } catch (error) {
    console.error("Database connection failed, using fallback data:", error);
  }

  const validTechs = ['React', 'Next.js', 'Node.js', 'MySQL', 'MongoDB', 'PostgreSQL', 'HTML', 'CSS', 'JavaScript', 'Tailwind', 'PHP', 'WordPress', 'WooCommerce', 'Astra'];

  const projectsData = dbProjects.length > 0 ? dbProjects.map(p => {
    const rawTechs = Array.isArray(p.technologies) ? p.technologies : [];
    const filteredTechs = rawTechs.filter((t: string) => validTechs.includes(t));

    return {
      title: p.title,
      subtitle: p.subtitle || "",
      categoryId: p.categoryId || "todos",
      description: p.description || "",
      image: p.imageUrl || "",
      previewImage: p.previewImageUrl || "",
      gallery: Array.isArray(p.gallery) ? p.gallery : [],
      link: p.link || "#",
      technologies: filteredTechs,
    };
  }) : fallbackProjects;

  return (
    <PortfolioClient initialProjects={projectsData} />
  );
};
