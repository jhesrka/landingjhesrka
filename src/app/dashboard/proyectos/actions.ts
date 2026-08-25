"use server";

import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

async function processImage(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  
  const filename = `${Date.now()}-${file.name.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9]/g, "_")}.webp`;
  const publicDir = path.join(process.cwd(), 'public');
  const filepath = path.join(publicDir, 'uploads', filename);

  // Resize and convert to webp
  await sharp(buffer)
    .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(filepath);

  return `/uploads/${filename}`;
}


async function deleteOldImage(imageUrl: string | null) {
  if (!imageUrl || !imageUrl.startsWith('/uploads/')) return;
  const filepath = path.join(process.cwd(), 'public', imageUrl);
  try {
    await fs.unlink(filepath);
    console.log("Deleted old image:", filepath);
  } catch (error) {
    console.error("Could not delete old image:", filepath, error);
  }
}

export async function addProject(formData: FormData) {
  const title = formData.get("title") as string;
  const subtitle = formData.get("subtitle") as string;
  const link = formData.get("link") as string;
  const categoryId = formData.get("categoryId") as string || "todos";
  const description = formData.get("description") as string || "";
  const technologiesRaw = formData.get("technologies") as string;
  const imageFile = formData.get("imageFile") as File | null;
  const previewImageFile = formData.get("previewImageFile") as File | null;

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

    if (imageFile && imageFile.size > 0) {
      imageUrl = await processImage(imageFile);
      previewImageUrl = imageUrl; // Usar la misma URL para la vista previa
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
  const imageFile = formData.get("imageFile") as File | null;
  const previewImageFile = formData.get("previewImageFile") as File | null;
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
    const existing = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
    const oldImageUrl = existing[0]?.imageUrl;
    const oldPreviewImageUrl = existing[0]?.previewImageUrl;

    if (imageFile && imageFile.size > 0) {
      imageUrl = await processImage(imageFile);
      previewImageUrl = imageUrl; // Actualizar ambas a la misma imagen nueva
      
      // Eliminar ambas imágenes anteriores para no ocupar espacio
      if (oldImageUrl) await deleteOldImage(oldImageUrl);
      if (oldPreviewImageUrl && oldPreviewImageUrl !== oldImageUrl) {
        await deleteOldImage(oldPreviewImageUrl);
      }
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
    const existing = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
    const oldImageUrl = existing[0]?.imageUrl;
    const oldPreviewImageUrl = existing[0]?.previewImageUrl;

    await db.delete(projects).where(eq(projects.id, id));
    
    // Delete images after successful db deletion
    await deleteOldImage(oldImageUrl);
    await deleteOldImage(oldPreviewImageUrl);

    revalidatePath("/");
    revalidatePath("/dashboard/proyectos");
    return { success: true };
  } catch (error) {
    console.error("Error deleting project:", error);
    return { error: "Error al eliminar el proyecto" };
  }
}
