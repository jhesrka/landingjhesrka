import { NextResponse } from "next/server";
import { db } from "@/db";
import { settings } from "@/db/schema";

export async function GET() {
  try {
    const allSettings = await db.select().from(settings).limit(1);
    const storeSettings = allSettings[0];

    if (!storeSettings || !storeSettings.payphoneToken || !storeSettings.payphoneStoreId) {
      return NextResponse.json({ error: "Credenciales de PayPhone no configuradas." }, { status: 500 });
    }

    return NextResponse.json({
      token: storeSettings.payphoneToken.trim(),
      storeId: storeSettings.payphoneStoreId.trim(),
      baseUrl: (process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000').replace(/\/$/, '')
    });
  } catch (error) {
    console.error("Checkout config route error:", error);
    return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
  }
}
