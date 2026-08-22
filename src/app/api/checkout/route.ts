import { NextResponse } from "next/server";
import { db } from "@/db";
import { settings } from "@/db/schema";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { items, total } = await req.json();

    if (!items || items.length === 0 || !total) {
      return NextResponse.json({ error: "Carrito vacío o total inválido." }, { status: 400 });
    }

    // 1. Obtener credenciales de la base de datos
    const allSettings = await db.select().from(settings).limit(1);
    const storeSettings = allSettings[0];

    if (!storeSettings || !storeSettings.payphoneToken || !storeSettings.payphoneStoreId) {
      return NextResponse.json({ error: "Credenciales de PayPhone no configuradas en el sistema." }, { status: 500 });
    }

    // 2. Preparar el payload para PayPhone
    const amountInCents = Math.round(total * 100);
    const transactionId = crypto.randomUUID().replace(/-/g, '').substring(0, 20);
    
    // Asegurar que la URL base no tenga un slash al final
    const baseUrl = (process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000').replace(/\/$/, '');

    const payphonePayload = {
      responseUrl: `${baseUrl}/checkout/success`,
      cancellationUrl: `${baseUrl}/tienda`,
      amount: amountInCents,
      amountWithoutTax: amountInCents,
      amountWithTax: 0,
      tax: 0,
      clientTransactionId: transactionId,
      currency: "USD",
      reference: `Compra en JHESRKA - ${items.length} items`
    };

    // 3. Llamar a la API de PayPhone para preparar el pago
    const response = await fetch("https://pay.payphonetodoesposible.com/api/button/Prepare", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${storeSettings.payphoneToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payphonePayload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("PayPhone Error:", errorText);
      return NextResponse.json({ error: "Error de comunicación con PayPhone." }, { status: 500 });
    }

    const data = await response.json();

    // 4. Devolver la URL de redirección al cliente
    if (data.paymentId) {
      const paymentUrl = `https://pay.payphonetodoesposible.com/pay?id=${data.paymentId}`;
      return NextResponse.json({ url: paymentUrl });
    } else {
      return NextResponse.json({ error: "No se generó el Payment ID." }, { status: 500 });
    }
  } catch (error) {
    console.error("Checkout route error:", error);
    return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
  }
}
