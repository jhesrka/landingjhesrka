"use client";

import { useState } from "react";
import { PortfolioFilters } from "./PortfolioFilters";
import { PortfolioGrid } from "./PortfolioGrid";

interface Project {
  title: string;
  subtitle: string;
  categoryId: string;
  description: string;
  image: string;
  previewImage?: string;
  gallery?: string[];
  link: string;
  technologies: string[];
}

export const PortfolioClient = ({ initialProjects }: { initialProjects: Project[] }) => {
  const [activeCategory, setActiveCategory] = useState("todos");

  // Filtrar los proyectos según la categoría activa
  const filteredProjects = activeCategory === "todos" 
    ? initialProjects 
    : initialProjects.filter(p => p.categoryId === activeCategory);

  return (
    <>
      <PortfolioFilters activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      <PortfolioGrid projects={filteredProjects} />
    </>
  );
};
