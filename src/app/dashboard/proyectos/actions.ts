"use server";

import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function addProject(formData: FormData) {
  const title = formData.get("title") as string;
  const subtitle = formData.get("subtitle") as string;
  const link = formData.get("link") as string;
  const categoryId = formData.get("categoryId") as string || "todos";
  const description = formData.get("description") as string || "";
  const technologiesRaw = formData.get("technologies") as string;
  
  const imageBase64 = formData.get("imageBase64") as string | null;
  const previewImageBase64 = formData.get("previewImageBase64") as string | null;

  if (!title) return { error: "El título es requerido" };

  let technologies: string[] = [];
  try {
    if (technologiesRaw) technologies = JSON.parse(technologiesRaw);
  } catch (e) {
    console.error("Error parsing technologies JSON:", e);
  }

  try {
    let imageUrl = formData.get("imageUrl") as string | null;
    let previewImageUrl = formData.get("previewImageUrl") as string | null;

    if (imageBase64) {
      imageUrl = imageBase64;
      previewImageUrl = previewImageBase64 || imageBase64; 
    }

    await db.insert(projects).values({
      title,
      subtitle,
      categoryId,
      description,
      technologies,
      imageUrl,
      previewImageUrl,
      link,
    });
    
    revalidatePath("/");
    revalidatePath("/dashboard/proyectos");
    revalidatePath("/portafolio");
    return { success: true };
  } catch (error) {
    console.error("Error adding project:", error);
    return { error: "Error al crear el proyecto" };
  }
}

export async function updateProject(id: number, formData: FormData) {
  const title = formData.get("title") as string;
  const subtitle = formData.get("subtitle") as string;
  const link = formData.get("link") as string;
  const categoryId = formData.get("categoryId") as string || "todos";
  const description = formData.get("description") as string || "";
  const technologiesRaw = formData.get("technologies") as string;
  
  const imageBase64 = formData.get("imageBase64") as string | null;
  const previewImageBase64 = formData.get("previewImageBase64") as string | null;

  let imageUrl = formData.get("imageUrl") as string | null;
  let previewImageUrl = formData.get("previewImageUrl") as string | null;

  if (!title) return { error: "El título es requerido" };

  let technologies: string[] = [];
  try {
    if (technologiesRaw) technologies = JSON.parse(technologiesRaw);
  } catch (e) {
    console.error("Error parsing technologies JSON:", e);
  }

  try {
    if (imageBase64) {
      imageUrl = imageBase64;
      previewImageUrl = previewImageBase64 || imageBase64;
    }

    await db.update(projects)
      .set({ title, subtitle, categoryId, description, technologies, imageUrl, previewImageUrl, link })
      .where(eq(projects.id, id));
      
    revalidatePath("/");
    revalidatePath("/dashboard/proyectos");
    revalidatePath("/portafolio");
    return { success: true };
  } catch (error) {
    console.error("Error updating project:", error);
    return { error: "Error al actualizar el proyecto" };
  }
}

export async function deleteProject(id: number) {
  try {
    await db.delete(projects).where(eq(projects.id, id));
    
    revalidatePath("/");
    revalidatePath("/dashboard/proyectos");
    return { success: true };
  } catch (error) {
    console.error("Error deleting project:", error);
    return { error: "Error al eliminar el proyecto" };
  }
}
