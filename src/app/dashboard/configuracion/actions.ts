"use server";

import { db } from "@/db";
import { settings } from "@/db/schema";
import { revalidatePath } from "next/cache";

import { eq } from "drizzle-orm";

export async function getSettings() {
  const allSettings = await db.select().from(settings).limit(1);
  return allSettings[0] || null;
}

export async function updateSettings(formData: FormData) {
  const payphoneToken = formData.get("payphoneToken") as string;
  const payphoneStoreId = formData.get("payphoneStoreId") as string;
  const whatsappNumber = formData.get("whatsappNumber") as string;

  try {
    const existing = await db.select().from(settings).limit(1);
    
    if (existing.length > 0) {
      await db.update(settings).set({
        payphoneToken,
        payphoneStoreId,
        whatsappNumber,
        updatedAt: new Date()
      }).where(eq(settings.id, existing[0].id));
    } else {
      await db.insert(settings).values({
        payphoneToken,
        payphoneStoreId,
        whatsappNumber,
      });
    }

    revalidatePath("/dashboard/configuracion");
    return { success: true };
  } catch (error) {
    console.error("Error updating settings:", error);
    return { error: "Error al guardar la configuración" };
  }
}
